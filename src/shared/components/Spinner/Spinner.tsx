import * as React from 'react';
import * as  ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Squares from './Squares';
const classNames = require('classnames/bind');
const styles = require('./Spinner.scss');
const cx = classNames.bind(styles);


export const Spinner = (props) => {

  let component;
  if (props.isWaiting) {
    component = <Squares/>;
  }

  return (

    <ReactCSSTransitionGroup
      component='div'
      transitionEnterTimeout={1200}
      transitionLeaveTimeout={1200}
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

export default Spinner;
