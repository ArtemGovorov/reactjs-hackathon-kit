import { injectReducer } from '../../store/reducers';


export default (store) => ({
  path: 'counter',

  getComponent(nextState, cb) {
    if (__CLIENT__) {
      require.ensure([], (require) => {
        const Counter = require('./containers/CounterContainer').default;
        const reducer = require('./modules/counter').default;
        injectReducer(store, { key: 'counter', reducer });
        cb(null, Counter);
      }, 'counter');
    } else {
      const Counter = require('./containers/CounterContainer').default;
      const reducer = require('./modules/counter').default;
      injectReducer(store, { key: 'counter', reducer });
      cb(null, Counter);
    }

  }
});
