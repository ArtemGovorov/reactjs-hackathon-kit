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

const Container = connect(mapStateToProps, mapActionCreators as any)(Login);


export default AuthenticatedLayout(Container);

