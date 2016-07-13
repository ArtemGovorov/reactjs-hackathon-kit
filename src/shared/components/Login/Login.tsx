import * as React from 'react';
import Welcome from './Welcome';
import Copyright from './../Copyright';
import Spinner from './../Spinner';
import {Grid, Row, Col} from 'react-bootstrap';
import {  } from 'redux';

const classNames = require('classnames/bind');
const styles = require('./Login.scss');


function click(props) {
  props.toggle();
}


export interface LoginProps {
  attemptLogin: (username: string, password: string) => void;
  cancelLogin: () => void;
  toggle: () => void;
  user: any;
  isWaiting: boolean;
}

export const Login = (props: LoginProps) =>
  (

    <div onClick={click.bind(this, props) } className='loginColumns animated fadeInDow'>

      <Grid>

        <Row >

          <Col md={6}>
            <Welcome/>
          </Col>

          <Col md={6}>
            <Spinner isWaiting={props.user.isWaiting} key={Math.random().toString(36).substring(7) }/>

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

          </Col>

        </Row>
        <hr/>
        <Row >

          <Col md={6}>
            <Copyright/>
          </Col>

          <Col md={6}>
            <small>© 2014-2015</small>2
          </Col>

        </Row>

      </Grid>




    </div>
  );

export default Login;
