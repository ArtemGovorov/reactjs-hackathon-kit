import * as React from 'react';
import * as  ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Squares from './Squares';
const classNames = require('classnames/bind');
const styles = require('./Spinner.css');
const cx = classNames.bind(styles);


export const Spinner = (props) => {

  let component;
  if (props.isWaiting) {
    component = <Squares/>;
  }

  return (

    <ReactCSSTransitionGroup
      component='div'
      transitionEnterTimeout={1100}
      transitionLeaveTimeout={1100}
      transitionName={{
        enter: cx('enter'),
        enterActive: cx('enter-active'),
        leave: cx('leave'),
        leaveActive: cx('leave-active')
      }}
      >
      {component}
    </ReactCSSTransitionGroup>

  );

};

if (__DEVSERVER__) {
  (Spinner as any).styles = [styles.source];
}


export default Spinner;
