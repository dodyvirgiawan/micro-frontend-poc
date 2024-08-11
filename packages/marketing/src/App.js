import React from 'react';

// ======= Will come back to this later =======
import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
// ======= Will come back to this later =======

import Landing from './components/Landing';
import Pricing from './components/Pricing';

// ==== This is related due to CSS issue (between container, uses the same Material UI, therefore class clash)
const generateClassName = createGenerateClassName({
  productionPrefix: 'marketing'
})

export default function App({ history }) {
  console.log('Hello from marketing engineering team!')

  return (
    <StylesProvider generateClassName={generateClassName}>
      {/* Previously we use Browser History */}
      {/* <BrowserRouter>
        <Switch>
          <Route exact path="/pricing" component={Pricing} />
          <Route path="/" component={Landing} />
        </Switch>
      </BrowserRouter> */}

      {/* We want Memory History instead -> due to navigation conflict with container/shell app */}
      <Router history={history}>
        <Switch>
          <Route exact path="/pricing" component={Pricing} />
          <Route path="/" component={Landing} />
        </Switch>
      </Router>

    </StylesProvider>
  )
}