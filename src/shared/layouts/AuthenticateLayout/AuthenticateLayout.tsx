import * as React from 'react';
import withStyles from 'shared/utils/withStyles';
const classNames = require('classnames/bind');
const styles = require('./AuthenticateLayout.css');
const cx = classNames.bind(styles);

export const AuthenticatedLayout =
  ComposedComponent =>
    withStyles(styles)(
      props => (
        <div className={cx('container') }>
          Funky town!
          <ComposedComponent { ...props }/>;
        </div>
      )
    );

export default AuthenticatedLayout;


