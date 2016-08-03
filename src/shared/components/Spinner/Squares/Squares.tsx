import * as React from 'react';
const classNames = require('classnames/bind');
const styles = require('./Squares.css');
const cx = classNames.bind(styles);
const Squares = () => {
  return (
    <div
      className={cx('uil-squares-css') }
      style={{ transform: 'scale(0.6)' }}>
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
  );
};

export default Squares;