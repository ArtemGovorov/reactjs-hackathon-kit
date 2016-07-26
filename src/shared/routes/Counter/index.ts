import { injectReducer } from '../../store/reducers';
export default (store) => ({
  path: 'counter',
  getComponent(nextState, cb) {
    require.ensure(
      [],
      (require) => {
        const Counter = require('./containers/CounterContainer').default;
        const reducer = require('./modules/counter').default;
        injectReducer(store, { key: 'counter', reducer });
        cb(null, Counter);
      }
      , 'counter');
  }
});
/*import { injectReducer } from '../../store/reducers';
export default (store) => ({
  path: 'counter',
  getComponent(nextState, cb) {
    require.ensure(
      [],
      (require) => {

        const load1: () => Promise<any> = require('promise?global!./containers/CounterContainer');
        const load2: () => Promise<any> = require('promise?global!./modules/counter');
        let Counter;
        let reducer;
        Promise.resolve()
          .then(() => load1())
          .then(
          (module) => {
            Counter = module.default;
            return load2();
          }
          )
          .then(
          (module) => {
            reducer = module.default;
            injectReducer(store, { key: 'counter', reducer });

            cb(null, Counter);

          }
          );
      }
      , 'counter');
  }
});
*/