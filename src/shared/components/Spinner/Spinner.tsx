import * as React from 'react';
const classNames = require('classnames/bind');
const styles = require('./Spinner.scss');
const cx = classNames.bind(styles);

export const Spinner = () => {
  return (
    <div>
      <div className={cx('uil-squares-css')}  style={{transform:'scale(0.6)'}}>
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
    </div>
  );
};

export default Spinner;