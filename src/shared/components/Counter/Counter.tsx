import * as React from 'react';
const classes = require('./Counter.scss');

export const Counter = (props) => (
  <div>
    <h2 className={classes['counter-container']}>
      Counter:
      {' '}
      <span className={classes['counter--green']}>
        {props.counter}
      </span>
    </h2>
    <button className='btn btn-default' onClick={props.increment}>
      Increment
    </button>
    {' '}
    <button className='btn btn-default' onClick={props.doubleAsync}>
      Double (Async!)
    </button>
  </div>
);

export default Counter;