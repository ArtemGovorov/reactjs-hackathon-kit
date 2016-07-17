import * as React from 'react';
import { IndexLink, Link } from 'react-router';
const styles = require('./Header.scss');

export const Header = () =>
  (<div>
    <h1>Header!</h1>
    <IndexLink to='/' activeClassName={styles['active-route']}>
      Home
    </IndexLink>
    {' · '}
    <Link to='/counter' activeClassName={styles['active-route']}>
      Counter
    </Link>
  </div>
  );

if (__DEVSERVER__) {
  (Header as any).styles = [styles.source];
}

export default Header;
