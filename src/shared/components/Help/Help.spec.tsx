import * as React from 'react';
import { bindActionCreators } from 'redux';
import {
  Help,
  HelpProps
 } from './Help';
import { shallow } from 'enzyme';

describe('(Component) Help', () => {
  let props: HelpProps;
  let spies: {
    dispatch: Sinon.SinonSpy
  };
  let wrapper;

  beforeEach(() => {
    spies = {
      dispatch: sinon.spy()
    };
    props = Object.assign(
      {

      },
      bindActionCreators(
        {

        },
        spies.dispatch)
    );
    wrapper = shallow(<Help {...props} />);
  });

  it('Should render as a <div>.', () => {
    expect(wrapper.is('div')).to.equal(true);
  });

});
