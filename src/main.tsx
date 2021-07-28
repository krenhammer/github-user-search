import React from 'react'
import ReactDOM from 'react-dom'
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import './index.css'
import { Users, UserDetail } from './pages';
import { QueryProvider } from './hooks/useStoredQueryData';

ReactDOM.render(
  <React.StrictMode>
    <QueryProvider/>
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
