import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Route, HashRouter as Router, Switch, useParams } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import ReactTooltip from 'react-tooltip';
import Tour from 'reactour'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useSnapshot, subscribe } from 'valtio';
import loadable from '@loadable/component'

import './index.css'
import { Users, UserDetail } from './pages';
import { QueryProvider } from './hooks/useStoredQueryData';
import {tourSteps} from './tour'
import store from './state';
import delay from './utils/delay';


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

  const params = useParams();

  useEffect(() => {
    refreshTour();
  }, [params]);

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
      <QueryProvider />
      <ReactQueryDevtools initialIsOpen={false} />
      <Router>
        <TourWrapper />
        <Switch>
          <Route 
            path="/" 
            component={loadable(() => import('./pages/Users'))} 
            exact />
          <Route 
            path="/search/:query/:page?" 
            component={loadable(() => import('./pages/Users'))} />
          <Route 
            path="/user/:username?" 
            component={loadable(() => import('./pages/UserDetail'))} />
        </Switch>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
