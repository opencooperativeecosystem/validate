import React from 'react'
import ReactDOM from 'react-dom'
import Login from './login/'
import Settings from './settings/wrapper'
import registerServiceWorker from './registerServiceWorker'
import {HashRouter as Router, Route} from 'react-router-dom'
import {ApolloProvider} from 'react-apollo'
import {client, store} from './store'
import { Provider } from 'react-redux'
import PrivateRoute from './templates/AppTemplate'
import { Notifs } from 'redux-notifications'
import style from './base.css'
import Validate from '../lib/validate'
function CustomNotif (props) {
  let type
  if (props.kind === 'danger') { type = style.danger } else
  if (props.kind === 'info') { type = style.info } else
  if (props.kind === 'warning') { type = style.warning } else
  if (props.kind === 'success') { type = style.success }
  return (
    <div className={style.notification + ' ' + type}>
      <h5><span>{props.kind}</span>{props.message}</h5>
    </div>
  )
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router>
      <div>
        <Notifs
          CustomComponent={CustomNotif}
          onActionClick={id => this.dismiss(id)}
          actionLabel='close'
        />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/' component={() => (<h1>overview</h1>)} />
        <PrivateRoute path='/work' component={() => (<h1>overview</h1>)} />
        <PrivateRoute path='/validate' component={Validate} />
        <PrivateRoute path='/settings' component={Settings} />
        </div>
      </Router>
    </Provider>
  </ApolloProvider>,
document.getElementById('root')
)
registerServiceWorker()
