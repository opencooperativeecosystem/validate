import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import Component from './index'
import getClaims from '../queries/getClaims'
import createValidation from '../mutations/createValidation'
import {compose, withHandlers, withState} from 'recompose'
// import {withApollo} from 'react-apollo'
import gql from 'graphql-tag'


class AgentWrapper extends React.Component {
  render () {
    const {createValidation, loading, error, data} = this.props
    return (
      loading ? <strong>Loading...</strong> : (
        error ? <p style={{ color: '#F00' }}>API error</p> : (
          <Component data={data} createValidation={createValidation} />
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
  withHandlers({
    createValidation: props => (eventId) => {
      console.log(props)
      const todo = props.client.readQuery({
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
      console.log('todo')
      console.log(todo)
      // return createValidationMutation({
      //   variables: {
      //     token: localStorage.getItem('oce_token'),
      //     validatedById: agent,
      //     economicEventId: eventId
      //   },

      // })
    }
  })

)(AgentWrapper)

export default withApollo(wrapperComponent)

