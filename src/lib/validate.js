import React from 'react'
import Agent from './validation_agent/wrapper'
import Plan from './validation_plan/wrapper'
import Process from './validation_process/wrapper'
import Committment from './validation_committment/wrapper'
import ValidateEvent from './validation_event/wrapper'
import App from './App'
import {Route} from 'react-router-dom'

const Validate = ({match}) => (
  <div>
    <Route exact path={match.url} component={App} />
    <Route path={`${match.url}/agent/:id`} component={Agent} />
    <Route path={`${match.url}/plan/:id`} component={Plan} />
    <Route path={`${match.url}/process/:id`} component={Process} />
    <Route path={`${match.url}/commitment/:id`} component={Committment} />
    <Route path={`${match.url}/event/:id`} component={ValidateEvent} />
  </div>
)

export default Validate
