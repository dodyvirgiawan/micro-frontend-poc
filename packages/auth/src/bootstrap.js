import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'

import { createMemoryHistory, createBrowserHistory } from 'history'

const mount = (element, childEvents = {}, options = {}) => {
  const { defaultHistory, initialPath = '/' } = options;
  const { onNavigate, onSignIn } = childEvents;

  // This createMemoryHistory will default on /, since our container wants if the container open /auth (in container BrowserRouter) to immediately show /auth/signup (in this MemoryRouter)
  const history = defaultHistory || createMemoryHistory({ 
    // Therefore, add a default initial state of memory history to /auth/signin
    initialEntries: [initialPath]
   });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(
    <App
      history={history}
      onSignIn={onSignIn}
    />,
    element
  )

  // ====

  const parentEvents = {
    onParentNavigate(location) {
      const { pathname: nextPathname } = location;
      const { pathname } = history.location;

      if(pathname === nextPathname) return;
      history.push(nextPathname);
    }
  }

  return { parentEvents };
}

if (process.env.NODE_ENV === 'development') {
  const element = document.querySelector('#this-div-in-auth-only');
  const isInIsolation = !!element;

  if (isInIsolation) {
    mount(element, {}, {
      defaultHistory: createBrowserHistory(),
    })
  }
}

export { mount }