import HomeRoute from './index';

describe('(Route) Home', () => {
  let route;

  beforeEach(() => {
    route = HomeRoute({});
  });

  it('Should return a route configuration object', () => {
    expect(typeof (route)).to.equal('object');
  });

  it('Should define a route component', () => {
    expect(route.path).to.equal('');
  });
});
