import * as React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
const styles = require('./Counter.css');
import Header from '../Header';
 const Counter = (props) => (
  <div>
    <Header/>
    <h2 className={styles['container']}>
      Counter:d
      {' '}
      <span className={styles['counter--green']}>
        {props.counter}
      </span>
    </h2>
    <button className='btn btn-defaut' onClick={props.increment}>
      Increment
    </button>
    {' '}
    <button className='btn btn-default' onClick={props.doubleAsync}>
      Double (Async)
    </button>
  </div>
);


export default withStyles(styles)(Counter);
