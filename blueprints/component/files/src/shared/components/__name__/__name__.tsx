import * as React from 'react';
const classNames = require('classnames/bind');
const styles = require('./<%= pascalEntityName %>.scss');
const cx = classNames.bind(styles);

export interface <%= pascalEntityName %>Props {

}

export const <%= pascalEntityName %> = ( props: <%= pascalEntityName %>Props ) => (
  <div className={cx('<%= pascalEntityName %>')}>
    <h1><%= pascalEntityName %></h1>
  </div>
);

export default <%= pascalEntityName %>;
