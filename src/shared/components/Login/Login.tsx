import * as React from 'react';

const classNames = require('classnames/bind');
const styles = require('./Login.css');
const cx = classNames.bind(styles);

function click(props) {
  props.toggle();
}


export interface LoginProps {
  login: (username: string, password: string) => void;
  cancelLogin: () => void;
  toggle: () => void;
  user: any;
  isWaiting: boolean;
}

//className='loginColumns animated fadeInDow'

export const Login = (props: LoginProps) =>
  (


    <div className={cx('loginColumns', 'animated', 'fadeInDow') } >

      <div className={cx('row1')}>

        <div className={cx('col1')}>
          <h2 className='font-bold'>Welcome to IN+</h2>

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
        <div className={cx('col1')}>
          <div className='ibox-content'>
            <div className='m-t' role='form'>
              <div className='form-group'>
                <input type='text' className='form-control' placeholder='Username' required='' />
                {props.user.username}?
              </div>
              <div className='form-group'>
                <input type='password' className='form-control' placeholder='Password' required=''/>
              </div>
              <button className='btn btn-primary block full-width m-b'
                onClick={props.login.bind(this, 'nathanvale', 'password') }>Login!!!!</button>

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
      <div className={cx('row2')}>
        <div className={cx('col1')}>
          Copyright Example Company
        </div>
        <div className={cx('col2')}>
          <small>© 2014-2015</small>
        </div>
      </div>
    </div>
  );

if (__DEVSERVER__) {
  (Login as any).styles = [styles.source];
}

export default Login;
