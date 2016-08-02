import { Component, PropTypes, Children } from 'react';

export class WithStylesContext extends Component<any, any> {
  static propTypes = {
    children: PropTypes.element.isRequired,
    onInsertCss: PropTypes.func.isRequired,
  };

  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
  };

  getChildContext() {
    return { insertCss: this.props.onInsertCss };
  }

  render() {
    return Children.only(this.props.children);
  }
}

export default WithStylesContext;