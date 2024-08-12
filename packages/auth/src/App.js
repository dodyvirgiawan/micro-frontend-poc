import React from 'react';

import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Signin from './components/Signin';
import Signup from './components/Signup';

const generateClassName = createGenerateClassName({
  productionPrefix: 'auth'
})

export default function App({ history, onSignIn }) {
  console.log('Hello from auth engineering team!')

  return (
    <StylesProvider generateClassName={generateClassName}>
      {/* We want Memory History  */}
      <Router history={history}>
        <Switch>
          <Route path="/auth/signin">
            <Signin onSignIn={onSignIn} />
          </Route>

          <Route path="/auth/signup" >
            <Signup onSignUp={onSignIn} />
          </Route>
        </Switch>
      </Router>
    </StylesProvider>
  )
}