
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { Counter } from './Counter';
import { shallow } from 'enzyme';

describe('(Component) Counter', () => {
  let props;
  let spies: {
    dispatch: Sinon.SinonSpy,
    doubleAsync: Sinon.SinonSpy
    increment: Sinon.SinonSpy
  };
  let wrapper;


  beforeEach(() => {
    spies = {
      dispatch: sinon.spy(),
      doubleAsync: sinon.spy(),
      increment: sinon.spy()
    };
    props = Object.assign(
      {
        counter: 5
      },
      bindActionCreators(
        {
          doubleAsync: spies.doubleAsync,
          increment: spies.increment
        },
        spies.dispatch)
    );
    wrapper = shallow(<Counter {...props} />);
  });

  it('Should render as a <div>.', () => {
    expect(wrapper.is('div')).to.equal(true);
  });

  it('Should render with an <h2> that includes Sample Counter text.', () => {
    expect(wrapper.find('h2').text()).to.match(/Counter:/);
  });

  it('Should render props.counter at the end of the sample counter <h2>.', () => {
    expect(wrapper.find('h2').text()).to.match(/5$/);
    wrapper.setProps({ counter: 8 });
    expect(wrapper.find('h2').text()).to.match(/8$/);
  });

  it('Should render exactly two buttons.', () => {
    expect(wrapper).to.have['descendants']('.btn');
  });

  describe('An increment button...', () => {
    let button;

    beforeEach(() => {
      button = wrapper.find('button').filterWhere(a => a.text() === 'Increment');
    });

    it('has bootstrap classes', () => {
      expect(button.hasClass('btn btn-default')).to.be.true;
    });

    it('Should dispatch a `increment` action when clicked', () => {
      expect(spies.dispatch.callCount).to.equal(0);

      button.simulate('click');

      expect(spies.dispatch.called).to.be.true;
      expect(spies.increment.called).to.be.true;

    });
  });

  describe('A Double (Async) button...', () => {
    let button;

    beforeEach(() => {
      button = wrapper.find('button').filterWhere(a => a.text() === 'Double (Async)');
    });

    it('has bootstrap classes', () => {
      expect(button.hasClass('btn btn-default')).to.be.true;
    });

    it('Should dispatch a `doubleAsync` action when clicked', () => {

      expect(spies.dispatch.callCount).to.equal(0);

      button.simulate('click');

      expect(spies.dispatch.called).to.be.true;
      expect(spies.doubleAsync.called).to.be.true;

    });
  });
});
