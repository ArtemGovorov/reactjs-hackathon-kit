import * as React from 'react';
import { bindActionCreators } from 'redux';
import { Counter } from '../../../src/shared/components/Counter/Counter';
import { shallow } from 'enzyme';
const _extends = Object.assign ||
  function (target) {
    for (let i = 1; i < arguments.length; i++) {
      let source = arguments[i];
      for (let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; }
      }
    } return target;
  };

describe('(Component) Counter', () => {
  let props;
  let spies;
  let wrapper;

  beforeEach(() => {
    spies = {};
    props = _extends({
      counter: 5
    }, bindActionCreators({
      doubleAsync: spies.doubleAsync = sinon.spy(),
      increment: spies.increment = sinon.spy()
    }, spies.dispatch = sinon.spy()));
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
  //
  describe('An increment button...', () => {
    let button;

    beforeEach(() => {
      button = wrapper.find('button').filterWhere(a => a.text() === 'Increment');
    });

    it('has bootstrap classes', () => {
      expect(button.hasClass('btn btn-default')).to.be.true;
    });

    it('Should dispatch a `increment` action when clicked', () => {
      //FIX spies.dispatch.should.have.not.been.called;

      button.simulate('click');

      //FIX spies.dispatch.should.have.been.called;
      //FIX spies.increment.should.have.been.called;
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
      //FIX spies.dispatch.should.have.not.been.called;

      button.simulate('click');

      //FIX spies.dispatch.should.have.been.called;
      //FIX spies.doubleAsync.should.have.been.called;
    });
  });
});
