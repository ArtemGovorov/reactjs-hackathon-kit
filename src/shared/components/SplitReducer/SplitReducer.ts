import * as React from 'react';
import findAndReplaceReducerFromComponents  from '../../utils/findAndReplaceReducerFromComponents';
const withRouter = require('react-router/lib/withRouter');
const match = require('react-router/lib/match');
const SplitReducer = React.createClass({
  propTypes: {
    location: React.PropTypes.object,
    children: React.PropTypes.element,
    routes: React.PropTypes.array,
  },
  contextTypes: {
    store: React.PropTypes.object,
  },

  componentWillMount() {
    this.updateReducerFromComponents();
  },

  componentWillReceiveProps(nextProps: any) {
    this.updateReducerFromComponents();
  },

  updateReducerFromComponents() {
    const {  location, routes } = this.props;
    match({ location, routes }, (error, redirectLocation, renderProps) => {
      findAndReplaceReducerFromComponents(renderProps.components, this.context.store);
    });
  },

  render() {
    return React.Children.only(this.props.children);
  },
});

export default withRouter(SplitReducer);
