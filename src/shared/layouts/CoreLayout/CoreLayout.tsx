/* tslint:disable:no-unused-variable */
import * as React from 'react';
import Header from '../../components/Header';
const classes = require('./CoreLayout.scss');

export const CoreLayout = ({ children }) =>
  (<div className='container text-center'>
    <Header />
    <div className={classes['main-container']}>
      {children}
    </div>
  </div>
  );

/*CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired,
};*/

export default CoreLayout;
