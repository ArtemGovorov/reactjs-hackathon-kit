import HomeRoute from '../../../src/shared/routes/Home';

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
