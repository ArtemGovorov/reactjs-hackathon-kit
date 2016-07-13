import * as React from 'react';
import Welcome from './Welcome';
import Copyright from './../Copyright';
import Spinner from './../Spinner';
import Form from './Form';
import {Grid, Row, Col} from 'react-bootstrap';
import {  } from 'redux';

const classNames = require('classnames/bind');
const styles = require('./Login.scss');
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

export const Login = (props: LoginProps) =>
  (

    <div  className='loginColumns animated fadeInDow'>

      <Grid>

        <Row >

          <Col md={6}>
            <Welcome/>
          </Col>

          <Col md={6}>
            <div className={cx('form-container')}>
              <Spinner isWaiting={!props.user.isWaiting}/>
              <Form {...props} />
            </div>
          </Col>

        </Row>

        <hr/>

        <Row >

          <Col md={6}>
            <Copyright/>
          </Col>

          <Col md={6}>
            <small>© 2014-2015</small>
          </Col>

        </Row>

      </Grid>




    </div>
  );

export default Login;
