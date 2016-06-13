/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as Helmet from 'react-helmet';

const DuckImage = require('../assets/Duck.jpg');
const classes = require('./HomeView.scss') ;

export const HomeView = () => (
  <div>
    <Helmet
      title='Home Page'
      />
    <h4>Welcome!</h4>
    < img
      alt = 'This is a duck, because Redux!'
      className = { classes['duck']}
      src = { DuckImage }
      />
  </div>
);
export default HomeView;
