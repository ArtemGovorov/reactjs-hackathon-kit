export default (store) => ({
  path: '',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {

    if (__CLIENT__) {
      require.ensure([], (require) => {
        const HomeView = require('./components/HomeView').default;
        cb(null, HomeView);
      }, 'home-view');
    } else {
      const HomeView = require('./components/HomeView').default;
      cb(null, HomeView);
    }
  }
});