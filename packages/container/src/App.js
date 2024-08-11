import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import MarketingAppBootstrap from './components/marketing-app-bootstrap';
import Header from './components/Header'
import { StylesProvider, createGenerateClassName } from '@material-ui/core';

const generateClassName = createGenerateClassName({
  productionPrefix: 'container'
})

export default function App() {
  console.log('Hello from container engineering team!')

  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <Header />
        <MarketingAppBootstrap />
      </BrowserRouter>
    </StylesProvider>
  )
}