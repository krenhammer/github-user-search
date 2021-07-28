import React from 'react'
import ReactDOM from 'react-dom'
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import './index.css'
// import App from './App'
import { Users, UserDetail } from './pages';

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/search/:query?">
            <Users />
          </Route>
          <Route path="/user/:username?">
            <UserDetail />
          </Route>
        </Switch>
    </Router>
  
  </React.StrictMode>,
  document.getElementById('root')
)
