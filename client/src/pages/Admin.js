import React from 'react';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class BrotherList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brothers: [],
      selected: [],
      addBrother: {
        last_name: '',
        first_name: '',
        year: '',
        major: '',
        minor: '',
        email: '',
        phone: ''
      },
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleAddChange = this.handleAddChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);

  }

  componentDidMount() {
    this.getBrothers();
  }

  getBrothers() {
    fetch('/brothers')
    .then(res => res.json())
    .then((brothers) => {
      this.setState({brothers: brothers})
    })
    .catch(console.log)
  }

  handleChange(event) {
    // console.log(event.target)
    let selected = this.state.selected;
    if (!selected.includes(event.target.id)){
      selected.push(event.target.id)
    } else {
      selected.splice(selected.indexOf(event.target.id), 1)
    }
    this.setState({selected: selected});
  }

  handleAddChange(event) {
    if (event.target.id !== null) {
      let addBrother = this.state.addBrother;
      addBrother[event.target.id] = event.target.value;
      this.setState({addBrother: addBrother});
    }
  }

  handleDelete(event) {
    event.preventDefault();
    for (let item of this.state.selected) {
      let last_name = item.split('-')[0]
      let first_name = item.split('-')[1]
      let year = item.split('-')[2]
      fetch('/delete_brother', {
        method: 'delete',
        mode: 'cors',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "last_name": last_name,
          "first_name": first_name,
          "year": year,
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
    this.setState({selected: []})
    this.getBrothers();
  }

  handleAdd(event) {
    event.preventDefault();
    fetch('/add_brother', {
     method: 'post',
     mode: 'cors',
     headers: {'Content-Type':'application/json'},
     body: JSON.stringify({
       "last_name": this.state.addBrother.last_name,
       "first_name": this.state.addBrother.first_name,
       "year": this.state.addBrother.year,
       "major": this.state.addBrother.major,
       "minor": this.state.addBrother.minor,
       "email": this.state.addBrother.email,
       "phone": this.state.addBrother.phone
     })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    console.log(this.state.addBrother)
    let addBrother = {
      last_name: '',
      first_name: '',
      year: '',
      major: '',
      minor: '',
      email: '',
      phone: ''
    }
    this.setState({addBrother: addBrother})
    console.log(this.state.addBrother)
    this.getBrothers();
  }

  handleSubmit(event) {
    console.log(this.state.selected);
    event.preventDefault();
  }

  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Row>
            <Button type="submit" onClick={this.handleDelete}>Delete Brother</Button>
          </Form.Row>
          <Form.Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th></th>
                  <th>Last Name</th>
                  <th>First Name</th>
                  <th>Class Year</th>
                  <th>Major</th>
                  <th>Minor</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {this.state.brothers.map(
                  brother =>
                  <tr>
                    <td>
                      <Form.Check
                        type='checkbox'
                        id={brother.last_name + "-" + brother.first_name + "-" + brother.year}
                        onChange={this.handleChange}
                      />
                    </td>
                    <td>{brother.last_name}</td>
                    <td>{brother.first_name}</td>
                    <td>{brother.year}</td>
                    <td>{brother.major}</td>
                    <td>{brother.minor}</td>
                    <td>{brother.email}</td>
                    <td>{brother.phone}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Form.Row>
          <Form.Row>
            <Button type="submit" onClick={this.handleDelete}>Delete Brother</Button>
          </Form.Row>
        </Form.Group>

        <Form.Group>
          <Form.Row>
            <Col>
              <Form.Control
                id="first_name"
                placeholder="First Name"
                value={this.state.addBrother["first_name"]}
                onChange={this.handleAddChange}
              />
            </Col>
            <Col>
              <Form.Control
                id="last_name"
                placeholder="Last Name"
                value={this.state.addBrother["last_name"]}
                onChange={this.handleAddChange}
              />
            </Col>
            <Col>
              <Form.Control
                id="year"
                placeholder="Class Year"
                value={this.state.addBrother["year"]}
                onChange={this.handleAddChange}
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Control
                id="major"
                placeholder="Major"
                value={this.state.addBrother["major"]}
                onChange={this.handleAddChange}
              />
            </Col>
            <Col>
              <Form.Control
                id="minor"
                placeholder="Minor"
                value={this.state.addBrother["minor"]}
                onChange={this.handleAddChange}
              />
            </Col>
            <Col>
              <Form.Control
                id="email"
                placeholder="Email"
                value={this.state.addBrother["email"]}
                onChange={this.handleAddChange}
              />
            </Col>
            <Col>
              <Form.Control
                id="phone"
                placeholder="Phone Number"
                value={this.state.addBrother["phone"]}
                onChange={this.handleAddChange}
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Button type="submit" onClick={this.handleAdd}>Add Brother</Button>
          </Form.Row>
        </Form.Group>
      </Form>
    )
  }
}

export default class Admin extends React.Component{
  render() {
    return(
      <Container>
        <Row>
          <BrotherList />
        </Row>
      </Container>
    )
  }
}
