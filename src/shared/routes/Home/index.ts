export default (store) => ({
  path: '',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {

    if (__CLIENT__) {
      require.ensure([], (require) => {
        const HomeContainer = require('./containers/HomeContainer').default;
        cb(null, HomeContainer);
      }, 'home-view');
    } else {
      const HomeContainer = require('./containers/HomeContainer').default;
      cb(null, HomeContainer);
    }
  }
});