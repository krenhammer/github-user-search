import React from 'react'
import ReactDOM from 'react-dom'
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import './index.css'
import { Users, UserDetail } from './pages';
import { QueryProvider } from './hooks/useStoredQueryData';
import { QueryClient, QueryClientProvider } from 'react-query';
import ReactTooltip from 'react-tooltip';

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    
    <QueryClientProvider client={queryClient}>
      <QueryProvider />
      <Router>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/search/:query/:page?">
            <Users />
          </Route>
          <Route path="/user/:username?">
            <UserDetail />
          </Route>
        </Switch>
      </Router>
    </QueryClientProvider>

  </React.StrictMode>,
  document.getElementById('root')
)
