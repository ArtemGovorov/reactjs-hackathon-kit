import * as React from 'react';

const DuckImage = require('../assets/Duck.jpg');
const classes = require('./HomeView.scss');

export const HomeView = () => (
  <div>
    <h4>Welcome!!</h4>
    < img
      alt = 'This is a duck, because Redux!'
      className = { classes['duck']}
      src = { DuckImage }
      />
  </div>
);
export default HomeView;
