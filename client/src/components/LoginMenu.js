import React from 'react';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../css/page_css/Login.css';

export default class LoginMenu extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      login: {
        email: '',
        password: '',
      },
      user: '',
      loggedIn: false,
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
  }

  componentDidMount() {
    this.setState({user: this.props.user})
  }

  async handleLogin(event) {
    event.preventDefault();
    await fetch(`/api/user/login?perms=${this.props.perms}`, {
     method: 'post',
     mode: 'cors',
     headers: {'Content-Type':'application/json'},
     body: JSON.stringify({
       "email": this.state.login.email,
       "password": this.state.login.password,
     })
    })
    .then(response => {
      if(response.status === 200) {
        this.setState({loggedIn: true})
        this.props.setUser(this.state.login.email)
      } else {
        alert("Access Denied")
      }
      return response.json()
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  handleLoginChange(event) {
    if (event.target.id !== null) {
      let login = this.state.login;
      login[event.target.id] = event.target.value;
      this.setState({login: login});
    }
  }

  render() {
    let loginTitle = "Login";
    if(this.props.prefix) {
      loginTitle = this.props.prefix + " Login"
    }
    return(
      <div>
        {!this.state.loggedIn && (
          <Container className="Login-Menu">
            <Row className="justify-content-md-center">
              <Col>
                <h1>{loginTitle}</h1>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Form>
                <Col>
                  <Form.Control
                    id="email"
                    placeholder="Email"
                    value={this.state.login["email"]}
                    onChange={this.handleLoginChange}
                  />
                  <br/>
                </Col>
                <Col>
                  <Form.Control
                    id="password"
                    placeholder="Password"
                    value={this.state.login["password"]}
                    onChange={this.handleLoginChange}
                    type="password"
                  />
                </Col>
                <Col>
                  <br/>
                  <Button type="submit" onClick={this.handleLogin}>Login</Button>
                </Col>
              </Form>
            </Row>
          </Container>
        )}
        {this.state.loggedIn && (
          this.props.children
        )}
      </div>
    )
  }
}
