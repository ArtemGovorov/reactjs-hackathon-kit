import * as React from 'react';
import SplitReducer from '../../components/SplitReducer';
const styles = require('./CoreLayout.css');

function CoreLayout(props) {
  return (
    <SplitReducer {...props}>
      <div className={styles['container']}>
        <div className={styles['main-container']}>
          {props.children}
        </div>
      </div>
    </SplitReducer>
  );
}

if (__DEVSERVER__) {
  (CoreLayout as any).styles = [styles.source];
}

export default CoreLayout;
