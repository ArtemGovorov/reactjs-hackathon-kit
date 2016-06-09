import * as React from "react";
import {Link} from "react-router";

let styles = {
  color: 'white',
  backgroundColor: 'red',
  minHeight: 100
};

class App extends React.Component<any, any> {
  render() {
    //console.log(this.props.children);
    return (
      <div>
        <div style={styles}>
          <h1> React 11 template with Webpack, react-router and react-hot-loader </h1>
        </div>

        {/*Rendu des composants des routes enfants*/}
        {this.props.children}

        <div>
          <Link to="/">Go back</Link>
        </div>

        <nav className="navbar-default navbar-static-side" role="navigation">
          <div className="sidebar-collapse">

            <ul className="nav metismenu" id="side-menu">
              <li className="nav-header">
                <div className="dropdown profile-element"> <span>
image
                </span>
                  <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                    <span className="clear"> <span className="block m-t-xs"> <strong className="font-bold">Nathan Vale</strong>
                    </span> <span className="text-muted text-xs block">Student<b className="caret"></b></span> </span> </a>
                  <ul className="dropdown-menu animated fadeInRight m-t-xs">
                    <li><a href="profile.html">Profile</a></li>
                    <li><a href="contacts.html">Contacts</a></li>
                    <li><a href="mailbox.html">Mailbox</a></li>
                    <li className="divider"></li>
                    <li><a href="login.html">Logout</a></li>
                  </ul>
                </div>
                <div className="logo-element">
                  IN+
                </div>
              </li>
              <li className="active">
                <a href="index.html"><i className="fa fa-th-large"></i> <span className="nav-label">Dashboard</span> <span className="fa arrow"></span></a>
                <ul className="nav nav-second-level">
                  <li className="active"><a href="index.html">Teachers</a></li>
                  <li><a href="dashboard_2.html">Students</a></li>
                  <li><Link to={`StylesUtility`}>StylesUtility</Link></li>
                </ul>
              </li>
              <li>
                <a href="layouts.html"><i className="fa fa-university"></i> <span className="nav-label">Lessons</span></a>
              </li>

            </ul>

          </div>
        </nav>
      </div>
    );
  }
}

//render par défaut sans react-router:
//render(<App/>, document.getElementById('app'));

export default App;
