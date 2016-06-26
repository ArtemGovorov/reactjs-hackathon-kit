import * as assert from 'assert';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
import { mount, render, shallow } from 'enzyme';

const Fixture = () =>
  <div>
    <input id = 'checked' defaultChecked />
    < input id = 'not' defaultChecked = { false} / >
  </div>;

describe('(Framework) Karma Plugins', () => {
  it('Should expose "expect" globally.', () => {
    assert.ok(expect);
  });

  it('Should expose "chai" globally.', () => {
    assert.ok(chai);
  });

  it('Should expose "sinon" globally.', () => {
    assert.ok(sinon);
  });

  it('Should expose "should" globally.', () => {
    assert.ok(should);
  });

  it('Should have chai-as-promised helpers.', () => {
    const pass = new Promise(res => res('test'));
    const fail = new Promise((res, rej) => rej());

    return Promise.all([
      expect(pass).to.be.fulfilled,
      expect(fail).to.not.be.fulfilled
    ]);
  });

  it('should have chai-enzyme working', () => {
    let shallowWrapper = shallow(<Fixture />);
    expect(shallowWrapper.find('#checked')).to.be['checked']();
    let reactWrapper;
    reactWrapper = mount(<Fixture />);
    expect(reactWrapper.find('#checked')).to.be['checked']();

    reactWrapper = render(<Fixture />);
    expect(reactWrapper.find('#checked')).to.be['checked']();
  });
});
