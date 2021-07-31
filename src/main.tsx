import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import ReactTooltip from 'react-tooltip';
import Tour from 'reactour'
import delay from './utils/delay';

import './index.css'
import { Users, UserDetail } from './pages';
import { QueryProvider } from './hooks/useStoredQueryData';
import {tourSteps} from './tour'
import store from './state';
import { useSnapshot, subscribe } from 'valtio';

const queryClient = new QueryClient()

const TourWrapper: React.FC = () => {
  const snap = useSnapshot(store);

  const [tourUpdate, setTourUpdate] = useState('');

  // Anytime the store changes, wait half a second for the DOM to refresh
  // and then trigger React Tour to rescan the DOM.
  const refreshTour = async () => {
    await delay(500);

    setTourUpdate(Math.random().toString());
  }

  useEffect(() => subscribe(store, refreshTour), []) 

  return (
    <Tour
          steps={tourSteps}
          isOpen={snap.isTouring}
          update={tourUpdate}
          lastStepNextButton={<div>Congrats! You're all Done!</div>}
          onRequestClose={() => store.isTouring = false}
        />
  );
}

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactTooltip />
      <TourWrapper />
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
