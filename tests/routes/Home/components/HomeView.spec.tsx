/* tslint:disable:no-unused-variable */
import * as React from 'react';
import { HomeView } from '../../../../src/shared/routes/Home/components/HomeView';
import { render } from 'enzyme';

describe('(View) Home', () => {
  let component;

  beforeEach(() => {
    component = render(<HomeView />);
  });

  it('Renders a welcome message', () => {
    const welcome = component.find('h4');
    console.log(welcome);
    expect(welcome).to.exist;
    expect(welcome.text()).to.match(/Welcome!/);
  });

  it('Renders an awesome duck image', () => {
    const duck = component.find('img');
    expect(duck).to.exist;
    expect(duck.attr('alt')).to.match(/This is a duck, because Redux!/);
  });
});
