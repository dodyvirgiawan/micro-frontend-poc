import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'

// Mount function
const mount = (element) => {
  ReactDOM.render(
    <App />,
    element
  )
}

// If we are in development and in isolation, call mount
if (process.env.NODE_ENV === 'development') {
  const element = document.querySelector('#this-div-in-marketing-only');
  const isInIsolation = !!element;

  if(isInIsolation) {
    mount(element);
  }
}

// We are running through container, we export the mount function
export { mount }