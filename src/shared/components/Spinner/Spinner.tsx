import * as React from 'react';
import * as  ReactCSSTransitionGroup from 'react-addons-css-transition-group';
const classNames = require('classnames/bind');
const styles = require('./Spinner.scss');
const cx = classNames.bind(styles);
console.log(styles);

const fuck = {
  appear: cx('example-appear'),
  appearActive: cx('example-appear-active'),
  enter: cx('example-enter'),
  enterActive: cx('example-enter-active'),
  leave: cx('example-leave'),
  leaveActive: cx('example-leave-active')
};
export const Spinner = (props) => {
  console.log(fuck);
  return (

    <ReactCSSTransitionGroup
      transitionName={fuck}
      transitionAppear={true}
      transitionLeave={true}
      transitionLeaveTimeout={1000}
      >
      <div  >
        {
          props.isWaiting ?
            <div key={props.isWaiting} className={cx('uil-squares-css') }  style={{ transform: 'scale(0.6)' }}>
              <div>
                <div>
                </div>
              </div>
              <div>
                <div>
                </div>
              </div>
              <div>
                <div>
                </div>
              </div>
              <div>
                <div>
                </div>
              </div>
              <div>
                <div>
                </div>
              </div>
              <div>
                <div>
                </div>
              </div>
              <div>
                <div>
                </div>
              </div>
              <div>
                <div>
                </div>
              </div>
            </div>
            : <div>ouch!</div>
        }
      </div>

    </ReactCSSTransitionGroup>
  );
};

export default Spinner;