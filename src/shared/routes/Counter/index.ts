import handleError from '../handleError';
export default {
  path: 'counter',
  getComponent : function(nextState, cb) {
    System.import('./containers/CounterContainer')
      .then(module => cb(null, module.default))
      .catch(error => {
        handleError(error);
      });
}};

