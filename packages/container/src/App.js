import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Header from './components/Header'
import { StylesProvider, createGenerateClassName } from '@material-ui/core';

import Progress from './components/Progress';

// Lazy load to improve initial load
const LazyMarketingApp = lazy(() => import('./components/mfe-bootstrap/marketing-app-bootstrap'));
const LazyAuthApp = lazy(() => import('./components/mfe-bootstrap/auth-app-bootstrap'));
const LazyDashboardApp = lazy(() => import('./components/mfe-bootstrap/dashboard-app-bootstrap'))

const generateClassName = createGenerateClassName({
  productionPrefix: 'container'
})

// Instantiate here so that we can access history here (to history push)
// If we use <BrowserRouter /> we cant access the history
// Only to reduce complexity
const history = createBrowserHistory();

export default function App() {
  console.log('Hello from container engineering team!')

  const [isSignedIn, setIsSignedIn] = useState(false);

  const onSignIn = () => {
    setIsSignedIn(true)
  };

  const onSignOut = () => {
    setIsSignedIn(false)
  };

  useEffect(() => {
    if (!isSignedIn) return;

    history.push('/dashboard');
  }, [isSignedIn])

  return (
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <Header isSignedIn={isSignedIn} onSignOut={onSignOut} />

        {/* Routing Logic in Container -> to decide which MFE to show */}
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth">
              <LazyAuthApp handleSignIn={onSignIn} />
            </Route>

            <Route path="/dashboard">
              <LazyDashboardApp />
            </Route>

            <Route path="/">
              <LazyMarketingApp />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </StylesProvider>
  )
}