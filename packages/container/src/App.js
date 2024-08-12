import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header'
import { StylesProvider, createGenerateClassName } from '@material-ui/core';

import MarketingApp from './components/marketing-app-bootstrap';
import AuthApp from './components/auth-app-bootstrap';

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
        <Switch>
          <Route path="/auth" component={AuthApp} />
          <Route path="/" component={MarketingApp} />
        </Switch>
      </BrowserRouter>
    </StylesProvider>
  )
}