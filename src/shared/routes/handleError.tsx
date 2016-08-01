import * as React from 'react';
import * as ReactDOM from 'react-dom';
export default function handleError(error) {
  const RedBox = require('redbox-react').default;
  const MOUNT_ELEMENT = document.getElementById('root');
  ReactDOM.render(<RedBox error={ error } />, MOUNT_ELEMENT);
}

