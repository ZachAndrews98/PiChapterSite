import React from 'react';

import Container from 'react-bootstrap/Container';

import User from '../components/User';
import LoginMenu from '../components/LoginMenu';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../css/page_css/Login.css';

export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      user: '',
    }
    this.setUser = this.setUser.bind(this)
  }

  setUser(user) {
    this.setState({user: user})
  }

  render() {
    return (
      <Container className="Login-Component">
        <LoginMenu setUser={this.setUser} prefix="Brother">
          {this.state.user !== '' &&
            <User userEmail={this.state.user} target="brother"/>
          }
        </LoginMenu>
      </Container>
    )
  }
}
