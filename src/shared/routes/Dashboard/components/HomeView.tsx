import * as React from 'react';

const DuckImage = require('../assets/Duck.jpg');
const styles = require('./HomeView.css');

export const HomeView = () => (
  <div>
    <h4>Welcome!!</h4>
    < img
      alt = 'This is a duck, because Redux!'
      className = { styles['duck']}
      src = { DuckImage }
      />
  </div>
);

if (__DEVSERVER__) {
  (HomeView as any).styles = [styles.source];
}


export default HomeView;
