import handleError from '../handleError';
export default {
  path: '',
  getComponent(nextState, cb) {
    System.import('./containers/HomeContainer')
      .then(module => cb(null, module.default))
      .catch(handleError);
  }
};

