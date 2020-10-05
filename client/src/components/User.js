import React from 'react';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import '../css/component_css/UserCSS.css';

export default class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      password: '',
      confirm_password: '',
    }

    this.handleEditChange = this.handleEditChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
  }

  componentDidMount() {
    // console.log(this.props)
    this.setState({user: this.props.info})
    console.log(this.state.user)
  }

  async handleEdit(event) {
    event.preventDefault();
    await fetch(`${this.props.target}/edit`, {
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
    return(
      <Form className="User-Container">
        <Form.Group style={{"textAlign": "center"}}>
          <Form.Row>
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
          </Form.Row>
          <Form.Row>
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
          </Form.Row>
          <Form.Row>
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
          </Form.Row>
          <Form.Row>
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
                <Form.Row>
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
                </Form.Row>
              </Col>
            }
          </Form.Row>

          {!this.props.admin &&
            <Form.Row>
              <Col>
                <Form.Label>Update Password</Form.Label>
                <Form.Control
                  id={"password"}
                  value={this.state.user.minor}
                  onChange={this.handlePasswordChange}
                />
              </Col>
              <Col>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  id={"confirm_password"}
                  value={this.state.user.email}
                  onChange={this.handlePasswordChange}
                />
              </Col>
            </Form.Row>
          }
          <br/>
          <Form.Row>
            <ButtonGroup>
              <Button type="submit" id={this.state.user.id} onClick={this.handleEdit}>Save</Button>
              <Button type="submit" onClick={this.props.done}>Done</Button>
            </ButtonGroup>
          </Form.Row>
        </Form.Group>
      </Form>
    )
  }
}
