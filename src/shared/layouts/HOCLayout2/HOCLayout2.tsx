import * as React from 'react';

export const HOCLayout2 =
  ComposedComponent =>
    props =>
      <ComposedComponent { ...props }/>;

export default HOCLayout2;


