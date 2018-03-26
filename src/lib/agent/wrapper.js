import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import Component from './index'
import getClaims from '../queries/getClaims'
import createValidation from '../mutations/createValidation'
import deleteValidation from '../mutations/deleteValidation'
import {compose, withHandlers} from 'recompose'
// import {withApollo} from 'react-apollo'
import gql from 'graphql-tag'


class AgentWrapper extends React.Component {
  constructor () {
    super()
    this.state = {
      myAgentId: null
    }
  }

  componentDidMount () {
    const myAgent = this.props.client.readQuery({
      query: gql`
      query ($token: String) {
        viewer(token: $token) {
          myAgent {
            id
          }
        }
      }
      `,
      variables: {
        token: localStorage.getItem('oce_token')
      }
    })
    this.setState({
      myAgentId: myAgent.viewer.myAgent.id
    })
  }
  render () {
    const {createValidation, deleteValidation, loading, error, data} = this.props
    return (
      loading ? <strong>Loading...</strong> : (
        error ? <p style={{ color: '#F00' }}>API error</p> : (
          <Component data={data} myAgentId={this.state.myAgentId} deleteValidation={deleteValidation} createValidation={createValidation} />
      ))
    )
  }
}

const wrapperComponent = compose(
  graphql(getClaims, {
    options: (props) => ({ variables: {
      token: localStorage.getItem('oce_token'),
      id: Number(props.match.params.id)
    }}),
    props: ({ ownProps, data: { viewer, loading, error, refetch } }) => ({
      loading: loading,
      error: error,
      refetchAgent: refetch,  // :NOTE: call this in the component to force reload the data
      data: viewer ? viewer.agent : null
    })
  }),
  graphql(createValidation, { name: 'createValidationMutation' }),
  graphql(deleteValidation, { name: 'deleteValidationMutation' }),
  withHandlers({
    createValidation: props => (eventId) => {
      const myAgent = props.client.readQuery({
        query: gql`
        query ($token: String) {
          viewer(token: $token) {
            myAgent {
              id
            }
          }
        }
        `,
        variables: {
          token: localStorage.getItem('oce_token')
        }
      })
      return props.createValidationMutation({
        variables: {
          token: localStorage.getItem('oce_token'),
          validatedById: myAgent.viewer.myAgent.id,
          economicEventId: eventId
        },
        update: (store, { data }) => {
          let claimCache = store.readQuery({ query: getClaims,
            variables: {
              token: localStorage.getItem('oce_token'),
              id: Number(props.match.params.id)
            }}
          )
          let PlanIndex = claimCache.viewer.agent.agentPlans.findIndex(plan => Number(plan.id) === Number(data.createValidation.validation.economicEvent.inputOf.processPlan.id))
          let ProcessIndex = claimCache.viewer.agent.agentPlans[PlanIndex].planProcesses.findIndex(process => Number(process.id) === Number(data.createValidation.validation.economicEvent.inputOf.id))
          let CommitmentIndex = claimCache.viewer.agent.agentPlans[PlanIndex].planProcesses[ProcessIndex].committedInputs.findIndex(commitment => commitment.fulfilledBy.some(item => Number(item.fulfilledBy.id) === Number(data.createValidation.validation.economicEvent.id)))
          let EventIndex = claimCache.viewer.agent.agentPlans[PlanIndex].planProcesses[ProcessIndex].committedInputs[CommitmentIndex].fulfilledBy.findIndex(item => Number(item.fulfilledBy.id) === Number(data.createValidation.validation.economicEvent.id))
          claimCache.viewer.agent.agentPlans[PlanIndex]
          .planProcesses[ProcessIndex]
          .committedInputs[CommitmentIndex]
          .fulfilledBy[EventIndex]
          .fulfilledBy
          .validations
          .push({
            id: data.createValidation.validation.id,
            validatedBy: {
              id: data.createValidation.validation.validatedBy.id,
              name: data.createValidation.validation.validatedBy.name,
              __typename:"Person"
            },
            __typename:"Validation"
          })
          store.writeQuery({ query: getClaims,
            variables: {
              token: localStorage.getItem('oce_token'),
              id: Number(props.match.params.id)
            },
            data: claimCache })
        }
      })
        .then((data) => console.log(data))
        .catch((e) => console.log(e))
    },
    deleteValidation: props => (eventId) => {
      return props.deleteValidationMutation({
        variables: {
          token: localStorage.getItem('oce_token'),
          id: eventId
        },
        update: (store, { data }) => {
          let claimCache = store.readQuery({ query: getClaims,
            variables: {
              token: localStorage.getItem('oce_token'),
              id: Number(props.match.params.id)
            }}
          )
          let PlanIndex = claimCache.viewer.agent.agentPlans.findIndex(plan => Number(plan.id) === Number(data.deleteValidation.validation.economicEvent.inputOf.processPlan.id))
          let ProcessIndex = claimCache.viewer.agent.agentPlans[PlanIndex].planProcesses.findIndex(process => Number(process.id) === Number(data.deleteValidation.validation.economicEvent.inputOf.id))
          let CommitmentIndex = claimCache.viewer.agent.agentPlans[PlanIndex].planProcesses[ProcessIndex].committedInputs.findIndex(commitment => commitment.fulfilledBy.some(item => Number(item.fulfilledBy.id) === Number(data.deleteValidation.validation.economicEvent.id)))
          let EventIndex = claimCache.viewer.agent.agentPlans[PlanIndex].planProcesses[ProcessIndex].committedInputs[CommitmentIndex].fulfilledBy.findIndex(item => Number(item.fulfilledBy.id) === Number(data.deleteValidation.validation.economicEvent.id))
          let ValIndex = claimCache.viewer.agent.agentPlans[PlanIndex].planProcesses[ProcessIndex].committedInputs[CommitmentIndex].fulfilledBy[EventIndex].fulfilledBy.validations.findIndex(item => Number(item.id) === Number(eventId))
          claimCache.viewer.agent.agentPlans[PlanIndex]
          .planProcesses[ProcessIndex]
          .committedInputs[CommitmentIndex]
          .fulfilledBy[EventIndex]
          .fulfilledBy
          .validations
          .splice(ValIndex, 1)
          store.writeQuery({ query: getClaims,
            variables: {
              token: localStorage.getItem('oce_token'),
              id: Number(props.match.params.id)
            },
            data: claimCache })
        }
      })
        .then((data) => console.log(data))
        .catch((e) => console.log(e))
    }
  })

)(AgentWrapper)

export default withApollo(wrapperComponent)

