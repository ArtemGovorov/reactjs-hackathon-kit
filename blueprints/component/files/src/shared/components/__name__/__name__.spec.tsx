import * as React from 'react';
import { bindActionCreators } from 'redux';
import {
  <%= pascalEntityName %>
  <%= pascalEntityName %>Props
 } from './<%= pascalEntityName %>';
import { shallow } from 'enzyme';

describe('(Component) <%= pascalEntityName %>', () => {
  let props:<%= pascalEntityName %>Props;
  let spies: {
    dispatch: Sinon.SinonSpy,
    doubleAsync: Sinon.SinonSpy
    increment: Sinon.SinonSpy
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
          doubleAsync: spies.doubleAsync,
          increment: spies.increment
        },
        spies.dispatch)
    );
    wrapper = shallow(<<%= pascalEntityName %> {...props} />);
  });

  it('Should render as a <div>.', () => {
    expect(wrapper.is('div')).to.equal(true);
  });

});
