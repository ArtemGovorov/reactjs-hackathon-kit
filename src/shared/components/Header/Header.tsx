/* tslint:disable:no-unused-variable */
import * as React from 'react';
import { IndexLink, Link } from 'react-router';
import classes from './Header';

export const Header = () =>
  (<div>
    <h1>React Redux Starter Kit </h1>
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
