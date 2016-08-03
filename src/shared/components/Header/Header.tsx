import * as React from 'react';
import { IndexLink, Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
const classNames = require('classnames/bind');
const styles = require('./Header.css');
const cx = classNames.bind(styles);


 const Header = () =>
  (<div className={cx('container') }>
    <h1>Header</h1>
    <IndexLink to='/' activeClassName={styles['active-route']}>
      Home
    </IndexLink>
    {' · '}
    <Link to='/counter' activeClassName={styles['active-route']}>
      Counter
    </Link>
  </div>
  );


export default withStyles(styles)(Header);
