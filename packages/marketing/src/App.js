import React from 'react';

// ======= Will come back to this later =======
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';
// ======= Will come back to this later =======

import Landing from './components/Landing';
import Pricing from './components/Pricing';

export default function App() {
  console.log('Hello from marketing engineering team App Root!')

  return (
    <div>
      <StylesProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/pricing" component={Pricing} />
            <Route path="/" component={Landing} />
          </Switch>
        </BrowserRouter>
      </StylesProvider>
    </div>
  )
}