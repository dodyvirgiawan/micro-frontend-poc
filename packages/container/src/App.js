import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header'
import { StylesProvider, createGenerateClassName } from '@material-ui/core';

import Progress from './components/Progress';

// import MarketingApp from './components/marketing-app-bootstrap';
// import AuthApp from './components/auth-app-bootstrap';
const LazyMarketingApp = lazy(() => import('./components/marketing-app-bootstrap'));
const LazyAuthApp = lazy(() => import('./components/auth-app-bootstrap'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'container'
})

export default function App() {
  console.log('Hello from container engineering team!')

  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <Header />

        {/* Routing Logic in Container -> to decide which MFE to show */}
        {/* We lazily load the bootstrap of each MFE to reduce initial load size */}
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth" component={LazyAuthApp} />
            <Route path="/" component={LazyMarketingApp} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </StylesProvider>
  )
}