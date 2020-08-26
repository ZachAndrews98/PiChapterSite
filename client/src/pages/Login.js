import React from 'react';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      login: {
        email: '',
        password: '',
      }
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
  }

  handleLogin(event) {
    event.preventDefault();
    console.log(this.state.login)
    fetch('/user/login', {
     method: 'post',
     mode: 'cors',
     headers: {'Content-Type':'application/json'},
     body: JSON.stringify({
       "email": this.state.login.email,
       "password": this.state.login.password,
     })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    let login = {
      email: '',
      password: '',
    }
    this.setState({login: login})
  }

  handleLoginChange(event) {
    if (event.target.id !== null) {
      let login = this.state.login;
      login[event.target.id] = event.target.value;
      this.setState({login: login});
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <h1>Register</h1>
        </Row>
        <Row>
          <Form>
          <Col>
            <Form.Control
              id="email"
              placeholder="Email"
              value={this.state.login["email"]}
              onChange={this.handleLoginChange}
            />
          </Col>
          <Col>
            <Form.Control
              id="password"
              placeholder="Password"
              value={this.state.login["password"]}
              onChange={this.handleLoginChange}
            />
          </Col>
          <Col>
            <Button type="submit" onClick={this.handleLogin}>Login</Button>
          </Col>
          </Form>
        </Row>
      </Container>
    )
  }
}
