import React from 'react';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import '../css/component_css/UserCSS.css';

export default class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      password: '',
      confirm_password: '',
    }

    this.handleEditChange = this.handleEditChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
  }

  componentDidMount() {
    if(this.props.info !== undefined)
      this.setState({user: this.props.info})
    else if(this.props.userEmail !== ''){
      fetch(`/brother?email=${this.props.userEmail}`)
      .then(res => res.json())
      .then((brother) => {
        this.setState({user: brother[0]})
      })
      .catch(console.log)
    } else {
      this.setState({user: ''})
    }
  }

  async verify_password() {
    let pass_issues = "";
    if(this.state.password === this.state.confirm_password) {
      if(this.state.password.length >= 8) {
        await fetch('/user/update_password', {
          method: 'put',
          mode: 'cors',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            "id": this.state.user.id,
            "new_pass": this.state.password
          })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      } else {
        pass_issues += "Password must be at least 8 characters long\n"
      }
    } else {
      pass_issues += "Passwords do not match\n"
    }
    if(pass_issues !== "") {
      alert("Password not updated.\nThe following issues occurred: \n" + pass_issues)
    }
  }

  async handleEdit(event) {
    event.preventDefault();
    if(this.state.password !== '' && this.state.confirm_password !== '') {
      this.verify_password()
    }
    await fetch(`/${this.props.target}/edit`, {
     method: 'put',
     mode: 'cors',
     headers: {'Content-Type':'application/json'},
     body: JSON.stringify({
       "last_name": this.state.user.last_name,
       "first_name": this.state.user.first_name,
       "year": this.state.user.year,
       "major": this.state.user.major,
       "minor": this.state.user.minor,
       "email": this.state.user.email,
       "phone": this.state.user.phone,
       "role": this.state.user.role,
       "id": this.state.user.id
     })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  handleEditChange(event) {
    if (event.target.id !== null) {
      let update = this.state.user;
      update[event.target.id] = event.target.value;
      this.setState({user: update});
    }
  }

  handlePasswordChange(event) {
    if (event.target.id === "password") {
      this.setState({password: event.target.value})
    } else {
      this.setState({confirm_password: event.target.value})
    }
  }

  render() {
    if(this.state.user !== null) {
      return(
        <Form className="User-Container">
          <Form.Group style={{"textAlign": "center"}}>
            <Row
              className="justify-content-md-center"
              xl={2} lg={2} md={2} sm={1} xs={1}
            >
              <Col>
                <Form.Label>First name</Form.Label>
                <Form.Control
                  id={"first_name"}
                  value={this.state.user.first_name}
                  onChange={this.handleEditChange}
                />
              </Col>
              <Col>
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  id={"last_name"}
                  value={this.state.user.last_name}
                  onChange={this.handleEditChange}
                />
              </Col>
            </Row>
            <Row
              className="justify-content-md-center"
              xl={2} lg={2} md={2} sm={1} xs={1}
            >
              <Col>
                <Form.Label>Year</Form.Label>
                <Form.Control
                  id={"year"}
                  value={this.state.user.year}
                  onChange={this.handleEditChange}
                />
              </Col>
              <Col>
                <Form.Label>Major</Form.Label>
                <Form.Control
                  id={"major"}
                  value={this.state.user.major}
                  onChange={this.handleEditChange}
                />
              </Col>
            </Row>
            <Row
              className="justify-content-md-center"
              xl={2} lg={2} md={2} sm={1} xs={1}
            >
              <Col>
                <Form.Label>Minor</Form.Label>
                <Form.Control
                  id={"minor"}
                  value={this.state.user.minor}
                  onChange={this.handleEditChange}
                />
              </Col>
              <Col>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  id={"email"}
                  value={this.state.user.email}
                  onChange={this.handleEditChange}
                />
              </Col>
            </Row>
            <Row
              className="justify-content-md-center"
              xl={2} lg={2} md={2} sm={1} xs={1}
            >
              <Col>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  id={"phone"}
                  value={this.state.user.phone}
                  onChange={this.handleEditChange}
                />
              </Col>
              {this.props.admin &&
                <Col>
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    id={"role"}
                    onChange={this.handleEditChange}
                  >
                    <option selected disabled>{this.state.user.role}</option>
                    <option>Pledge</option>
                    <option>Brother</option>
                    <option>President</option>
                    <option>Treasurer</option>
                    <option>Recording</option>
                    <option>Corresponding</option>
                    <option>Historian</option>
                  </Form.Control>
                </Col>
              }
            </Row>

            {!this.props.admin &&
              <Row
                className="justify-content-md-center"
                xl={2} lg={2} md={2} sm={1} xs={1}
              >
                <Col>
                  <Form.Label>Update Password</Form.Label>
                  <Form.Control
                    id={"password"}
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                    type="password"
                  />
                </Col>
                <Col>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    id={"confirm_password"}
                    value={this.state.confirm_password}
                    onChange={this.handlePasswordChange}
                    type="password"
                  />
                </Col>
              </Row>
            }
            <Row>
              <ButtonGroup>
                <Button type="submit" id={this.state.user.id} onClick={this.handleEdit}>Save</Button>
                <Button type="submit" onClick={this.props.done}>Done</Button>
              </ButtonGroup>
            </Row>
          </Form.Group>
        </Form>
      )
    } else {
      return(<h1>Loading</h1>)
    }
  }
}
