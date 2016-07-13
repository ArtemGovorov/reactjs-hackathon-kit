import * as React from 'react';

/*const classNames = require('classnames/bind');
const styles = require('./Form.scss');*/


function click(props) {
  props.toggle();
}


export interface FormProps {
  login: (username: string, password: string) => void;
  cancelLogin: () => void;
  toggle: () => void;
  user: any;
  isWaiting: boolean;
}

export const Form = (props: FormProps) => (
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
        onClick={props.login.bind(this, 'nathanvale', 'password') }>Login</button>

      <a >
        <small onClick={click.bind(this, props) }>Forgot password?</small>
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
);

export default Form;
