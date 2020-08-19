import React from 'react';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      register: {
        last_name: '',
        first_name: '',
        year: '',
        major: '',
        minor: '',
        email: '',
        phone: '',
        password: ''
      }
    }
    this.handleRegister = this.handleRegister.bind(this);
    this.handleRegisterChange = this.handleRegisterChange.bind(this);
  }

  handleRegister(event) {
    console.log(this.state.register)
    event.preventDefault();
    fetch('/register', {
      method: 'post',
      mode: 'cors',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
       "username": this.state.register.username,
       "password": this.state.register.password,
       "email": this.state.register.email,
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    let register = {
      last_name: '',
      first_name: '',
      year: '',
      major: '',
      minor: '',
      email: '',
      phone: '',
      password: ''
    }
    this.setState({register: register})
  }

  handleRegisterChange(event) {
    if (event.target.id !== null) {
      let register = this.state.register;
      register[event.target.id] = event.target.value;
      this.setState({register: register});
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <h1>Register</h1>
        </Row>
        <Row>
          <Form.Group>
            <Form.Row>
              <Col>
                <Form.Control
                  id="first_name"
                  placeholder="First Name"
                  value={this.state.register["first_name"]}
                  onChange={this.handleRegisterChange}
                />
              </Col>
              <Col>
                <Form.Control
                  id="last_name"
                  placeholder="Last Name"
                  value={this.state.register["last_name"]}
                  onChange={this.handleRegisterChange}
                />
              </Col>
              <Col>
                <Form.Control
                  id="year"
                  placeholder="Class Year"
                  value={this.state.register["year"]}
                  onChange={this.handleRegisterChange}
                />
              </Col>
              <Col>
                <Form.Control
                  id="major"
                  placeholder="Major"
                  value={this.state.register["major"]}
                  onChange={this.handleRegisterChange}
                />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Control
                  id="minor"
                  placeholder="Minor"
                  value={this.state.register["minor"]}
                  onChange={this.handleRegisterChange}
                />
              </Col>
              <Col>
                <Form.Control
                  id="email"
                  placeholder="Email"
                  value={this.state.register["email"]}
                  onChange={this.handleRegisterChange}
                />
              </Col>
              <Col>
                <Form.Control
                  id="phone"
                  placeholder="Phone Number"
                  value={this.state.register["phone"]}
                  onChange={this.handleRegisterChange}
                />
              </Col>
              <Col>
                <Form.Control
                  id="password"
                  placeholder="Password"
                  value={this.state.register["password"]}
                  onChange={this.handleRegisterChange}
                />
              </Col>
            </Form.Row>
            <Form.Row>
              <Button type="submit" onClick={this.handleRegister}>Register</Button>
            </Form.Row>
          </Form.Group>
        </Row>
      </Container>
    )
  }
}
