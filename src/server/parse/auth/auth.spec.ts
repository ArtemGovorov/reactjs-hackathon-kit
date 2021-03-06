import {
  hello,
  // signUp,
  logIn,
  // logOut
} from './index';

function getArguments(params: any, user?: any): {
  res: { success: any, error: any },
  req: { [key: string]: any }
} {
  return {
    req: {
      params,
      user
    },
    res: {
      success: sinon.spy(),
      error: sinon.spy()
    }
  };
}

describe('(Cloud) Auth', () => {

  it('Should say hello!', () => {
    const { req, res } = getArguments(void 0, void 0);
    const expectedResponse = 'Hello!';
    hello(req, res);
    expect(res.success).calledWith(expectedResponse);
  });

  it('Should logIn', (done) => {
    const expectedResponse = {
      result: {
        username: 'nathanvale',
        ACL: {
          '*': {
            read: true
          },
          a1pN5oh6eT: {
            read: true,
            write: true
          }
        },
        updatedAt: '2016-06-08T13:45:40.269Z',
        createdAt: '2016-06-08T13:45:40.269Z',
        sessionToken: 'r:f43aed3f912a380652f71dc904492e40',
        objectId: 'a1pN5oh6eT',
        __type: 'Object',
        className: '_User'
      }
    };
    const { req, res } = getArguments(
      {
        username: 'nathanvale',
        password: 'password'
      }
    );
    const stub = sinon.stub(Parse.User, 'logIn')
      .returns(When(expectedResponse));

    logIn(req, res)
      .then(
      () => {
        expect(stub).calledWith('nathanvale', 'password');
        expect(res.success).calledWith(expectedResponse);
      }
      )
      .then(done, done);

    stub.restore();
  });

  it('Should thrown an error with an invalid password', (done) => {
    const expectedError = {
      code: 141,
      error: 'Invalid username/password.'
    };
    const { req, res } = getArguments(
      {
        username: 'nathanvale',
        password: 'wrongpassword'
      }
    );
    const stub = sinon.stub(Parse.User, 'logIn')
      .returns(When.reject(expectedError));

    logIn(req, res)
      .then(
      () => {
        expect(stub).calledWith('nathanvale', 'wrongpassword');
        expect(res.error).calledWith(expectedError);
      }
      )
      .then(done, done);

    stub.restore();
  });
});
