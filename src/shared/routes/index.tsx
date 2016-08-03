import CoreLayout  from '../layouts/CoreLayout/CoreLayout';
import CounterRoute from './Counter';
import HomeRoute from './Home';

const routes = {
  path: '/',
  component: CoreLayout,
  indexRoute: HomeRoute,
  childRoutes: [
    CounterRoute
  ]
};

export default routes;
