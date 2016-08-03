import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as _debug from 'debug';
const debug = _debug('app:shared:routes:handleError');
export default function handleError(error) {
  debug(error);
  const RedBox = require('redbox-react').default;
  const MOUNT_ELEMENT = document.getElementById('root');
  ReactDOM.render(<RedBox error={error} />, MOUNT_ELEMENT);
}