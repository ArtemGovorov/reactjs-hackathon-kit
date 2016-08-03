import * as React from 'react';
import SplitReducer from 'shared/components/SplitReducer';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
//import styles from 'styles/main.css';
const styles = require('styles/main.css');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);
console.log(styles);
function CoreLayout(props) {
  return (
    <SplitReducer {...props}>
      <div className={cx('container')}>
        <div className={cx('main-container') }>
          {props.children}
        </div>
      </div>
    </SplitReducer>
  );
}

export default withStyles(styles)(CoreLayout);
