import * as React from 'react';
import SplitReducer from '../../components/SplitReducer';
const styles = require('./CoreLayout.css');

function CoreLayout(props) {
  return (<div className={styles['container']}>
    <div className={styles['main-container']}>
      <SplitReducer {...props}>
        {props.children}
      </SplitReducer>
    </div>
  </div>);
}

if (__DEVSERVER__) {
  (CoreLayout as any).styles = [styles.source];
}

export default CoreLayout;
