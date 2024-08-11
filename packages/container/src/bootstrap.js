import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// The container does not need to check anything
// Want to render immediately
ReactDOM.render(
  <App/>,
  document.querySelector('#root')
)