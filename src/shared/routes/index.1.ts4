// We only need to import the modules necessary for initial render
import { CoreLayout } from '../layouts/CoreLayout/CoreLayout';
import HomeRoute from './Home';
import CounterRoute from './Counter';


/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: HomeRoute(store), // eslint-disable-line new-cap
  childRoutes: [
    CounterRoute(store), // eslint-disable-line new-cap
  ],
});

export default createRoutes;
