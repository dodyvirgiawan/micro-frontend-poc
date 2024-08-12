import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'

// To create memory history
import { createMemoryHistory, createBrowserHistory } from 'history'; // react-router-dom

// Mount function
const mount = (element, childEvents = {}, options = {}) => {
  // ! To communicate to container
  const { onNavigate } = childEvents;

  // ! To determine if is isolation or not (whether to use Browser or Memory Router)
  const { defaultHistory, initialPath } = options;

  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath] // to sync the default router state between container to this marketing
  });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(
    <App history={history} />,
    element
  )

  // ! For container to communicate to this Marketing MFE
  const parentEvents = {
    onParentNavigate(location) {
      const { pathname: nextPathname } = location;

      const { pathname } = history.location;
      if (pathname === nextPathname) return;

      history.push(nextPathname)
    }
  }

  return { parentEvents };
}

// If we are in development and in isolation, call mount
if (process.env.NODE_ENV === 'development') {
  const element = document.querySelector('#this-div-in-marketing-only');
  const isInIsolation = !!element;

  if(isInIsolation) {
    mount(element, {}, {
      defaultHistory: createBrowserHistory()
    }); // will revisit later, we want to use BrowserRouter in dev. but MemoryRouter in prod.
  }
}

// We are running through container, we export the mount function
export { mount }