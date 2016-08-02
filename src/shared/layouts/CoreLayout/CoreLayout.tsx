import * as React from 'react';
import SplitReducer from '../../components/SplitReducer';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
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

export default withStyles(styles)(CoreLayout);
