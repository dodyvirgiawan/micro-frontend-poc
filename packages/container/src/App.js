import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import MarketingAppBootstrap from './components/marketing-app-bootstrap';
import Header from './components/Header'

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <MarketingAppBootstrap />
      </div>
    </BrowserRouter>
  )
}