import * as React from 'react';
const classNames = require('classnames/bind');
const styles = require('./Help.scss');
const cx = classNames.bind(styles);

export interface HelpProps {

}

export const Help = ( props: HelpProps ) => (
  <div className={cx('Help')}>
    <h1>Help</h1>
  </div>
);

if (__DEVSERVER__) {
  (Help as any).styles = [styles.source];
}

export default Help;
