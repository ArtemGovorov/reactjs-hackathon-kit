import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import CoreLayout from './CoreLayout';

function shallowRender(component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

function shallowRenderWithProps(props = {}) {
  return shallowRender(<CoreLayout children={void 0}{...props} ></CoreLayout>);
}

describe('(Layout) Core', () => {
  let component;
  let props;
  let child;

  beforeEach(() => {
    child = <h1 className='child'>Child</h1>;
    props = {
      children: child
    };

    component = shallowRenderWithProps(props);
  });

  it('Should render as a <div>.', () => {
    expect(component.type).to.equal('div');
  });
});
