import * as React from 'react';
import Welcome from './Welcome';
import Copyright from './../Copyright';
import Spinner from './../Spinner';

const classNames = require('classnames/bind');
const styles = require('./Login.scss');


function click() {

}


export interface LoginProps {
  attemptLogin: (username: string, password: string) => void;
  cancelLogin: () => void;
  user: any;
}

export const Login = (props: LoginProps) =>
  (
    <div onClick={click.bind(this)} className='loginColumns animated fadeInDow'>
    <Spinner/>
    <div className='row'>
      <div className='col-md-6'>
        <Welcome/>
      </div>
      <div className='col-md-6'>
        <div className='ibox-content'>
          <div className='m-t' role='form'>
            <div className='form-group'>
              <input type='text' className='form-control' placeholder='Username' required='' />
              {props.user.username}
            </div>
            <div className='form-group'>
              <input type='password' className='form-control' placeholder='Password' required=''/>
            </div>
            <button className='btn btn-primary block full-width m-b'
              onClick={props.attemptLogin.bind(this, 'nathanvale', 'password') }>Login!</button>

            <a >
              <small>Forgot password?</small>
            </a>

            <p className='text-muted text-center'>
              <small>Do not have an account?</small>
            </p>
            <a className='btn btn-sm btn-white btn-block' onClick={props.cancelLogin} >Create an account</a>
          </div>
          <p className='m-t'>
            <small>Inspinia we app framework base on Bootstrap 3 &copy; 2014</small>
          </p>
        </div>
      </div>
    </div>
    <hr/>
    <div className='row'>
      <div className='col-md-6'>
        <Copyright/>
      </div>
      <div className='col-md-6 text-right'>
        <small>© 2014-2015</small>2
      </div>
    </div>
  </div>
  );

export default Login;
