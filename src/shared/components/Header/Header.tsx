import * as React from 'react';
import { IndexLink, Link } from 'react-router';
const classes = require('./Header.scss');

export const Header = () =>
  (<div>
    <h1>Header!</h1>
    <IndexLink to='/' activeClassName={classes['active-route']}>
      Home
    </IndexLink>
    {' · '}
    <Link to='/counter' activeClassName={classes['active-route']}>
      Counter
    </Link>
  </div>
  );

export default Header;
