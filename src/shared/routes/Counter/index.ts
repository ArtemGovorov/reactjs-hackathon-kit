import { injectReducer } from '../../store/reducers';
import { endLoading } from '../../store/modules/global';

export default (store) => ({
  path: 'counter',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Counter = require('./containers/CounterContainer').default;
      const reducer = require('./modules/counter').default;
      injectReducer(store, { key: 'counter', reducer });
      if (store.getState().router.locationBeforeTransitions.pathname
        === nextState.location.pathname) {
        cb(null, Counter);
        store.dispatch(endLoading(nextState.location.pathname));
      }
    }, 'counter');
  },
});
