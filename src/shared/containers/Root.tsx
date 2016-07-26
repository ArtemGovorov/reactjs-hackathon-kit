import * as React from 'react';
import { PropTypes } from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';

/**
 * Callback function handling frontend route changes.
 */
function onUpdate() {
  // Prevent duplicate fetches when first loaded.
  // Explanation: On server-side render, we already have __INITIAL_STATE__
  // So when the client side onUpdate kicks in, we do not need to fetch twice.
  // We set it to null so that every subsequent client-side navigation will
  // still trigger a fetch data.
  // Read more: https://github.com/choonkending/react-webpack-node/pull/203#discussion_r60839356
  if (window.__INITIAL_STATE__ !== null) {
    window.__INITIAL_STATE__ = null;
    return;
  }
}

export class Root extends React.Component<any, any> {


  render() {
    const { store, routerKey } = this.props;

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router key={routerKey} {...this.props} onUpdate={onUpdate} />
        </div>
      </Provider>
    );
  }
}

export default Root;
