import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import style from './App.css'
import {Link} from 'react-router-dom'

const App = (props) => {
  const {viewer, loading, error} = props.data
  return (
    loading ? <strong>Loading...</strong> : (
    error ? <p style={{ color: '#F00' }}>API error</p> : (
    <div className={style.profile_lists}>
      <div className={style.lists}>
        <h2 className={style.profile_title}><span role='img'>👋</span> Hello {viewer.myAgent.name}</h2>
        <div className={style.section}>
          <div className={style.section_wrapper}>
            <h5>You can validate the following projects:</h5>
            <div className={style.wrapper_list}>
              {viewer.myAgent.agentRelationships.map((item, i) => (
                <div className={style.list_item} key={i}>
                  <Link to={`${props.match.url}/agent/${item.object.id}`}>
                    <h3>{item.object.name}</h3>
                    <h5>{item.object.note}</h5>
                    <h6>{item.relationship.label}</h6>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
    </div>
  ))
  )
}

const agentPlans = gql`
query ($token: String) {
    viewer(token: $token) {
      myAgent {
        id
        name
        image
        agentRelationships {
          relationship {
            label
            category
          }
          object {
            id
            name
            note
            image
          }
        }
      }
    }
  }  
`

export default graphql(agentPlans, {
  options: (props) => ({variables: {
    token: localStorage.getItem('oce_token')
}})
})(App)
