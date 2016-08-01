import * as React from 'react';
import { connect } from 'react-redux';
import {
  login,
  cancelLogin,
  toggle
} from '../../../store/modules/user';
import Login from '../../../components/Login';
import AuthenticatedLayout from '../../../layouts/AuthenticateLayout/AuthenticateLayout';
export const mapActionCreators = {
  login,
  cancelLogin,
  toggle
};

const mapStateToProps = (state) => ({
  user: state.user,
});

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'resloelect'
    const counter = (state) => state.counter
    const tripleCount = createSelector(counter, (count) => count * 3)
    const mapStateToProps = (state) => ({
      counter: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

const Container = connect(mapStateToProps, mapActionCreators as any)(AuthenticatedLayout);

const hoc = C => props => <C { ...props }/>;
//https://github.com/choonkending/useful-js-patterns/tree/master/higher-order-components


const TodoApp = () => (<Container></Container>);

export default TodoApp;

