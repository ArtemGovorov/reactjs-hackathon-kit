import * as React from 'react';
const styles = require('./CoreLayout.css');

export const CoreLayout = ({ children }) =>
  (<div className={styles['container']}>
    <div className={styles['main-container']}>
      {children}
    </div>
  </div>);

if (__DEVSERVER__) {
  (CoreLayout as any).styles = [styles.source];
}

export default CoreLayout;
