import * as React from 'react';
import { HomeView } from './HomeView';
import { render } from 'enzyme';

describe('(View) Home', () => {
  let component;

  beforeEach(() => {
    component = render(<HomeView />);
  });

});
