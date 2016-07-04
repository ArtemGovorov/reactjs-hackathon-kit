import * as React from 'react';

//const classes = require('./Login.scss');
export interface LoginProps {
  attemptLogin: (username: string, password: string) => void;
  cancelLogin: () => void;
  user: any;
}

export const Login = (props: LoginProps) =>
  (<div className='loginColumns animated fadeInDow'>

    <div className='row'>

      <div className='col-md-6'>
        <h2 className='font-bold'>WWWouch!!!Welcome to IN+</h2>

        <p>
          Perfectly designed and precisely prepared admin theme with over 50 pages with extra new web app views.
        </p>

        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </p>

        <p>
          When an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>

        <p>
          <small>It has survived not only five centuries,
            but also the leap into electronic typesetting,
            remaining essentially unchanged.</small>
        </p>

      </div>
      <div className='col-md-6'>
        <div className='ibox-content'>
          <div className='m-t' role='form'>
            <div className='form-group'>
              <input type='text' className='form-control' placeholder='Username' required='' />
              {props.user.username} arse?
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
        Copyright Example Company
      </div>
      <div className='col-md-6 text-right'>
        <small>© 2014-2015</small>
      </div>
    </div>
  </div>
  );

export default Login;
