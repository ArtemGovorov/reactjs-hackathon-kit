import { Component } from 'react';
import * as React from 'react';


export const HOCLayout1 = ComposedComponent => class extends Component<any, any> {

  constructor() {
    super();
  }

  componentDidMount() {

  }

  render() {
    return <ComposedComponent {...this.props}  />;
  }

};

export default HOCLayout1;