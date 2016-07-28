import * as React from 'react';
const styles = require('./Counter.css');
import Header from '../Header';
export const Counter = (props) => (
  <div>
  <Header/>
    <h2 className={styles['counter-container']}>
      Counter:1ddddd
      {' '}
      <span className={styles['counter--green']}>
        {props.counter}
      </span>
    </h2>
    <button className='btn btn-default' onClick={props.increment}>
      Increment
    </button>
    {' '}
    <button className='btn btn-default' onClick={props.doubleAsync}>
      Double (Async)
    </button>
  </div>
);

if (__DEVSERVER__) {
  (Counter as any).styles = [styles.source];
}


export default Counter;
