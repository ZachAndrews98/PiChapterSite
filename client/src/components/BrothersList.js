import React from 'react';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import Edit from './Edit';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class BrotherList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      brothers: [],
      selected: [],
      selectedBrothers: [],
      addBrother: {
        last_name: '',
        first_name: '',
        year: '',
        major: '',
        minor: '',
        email: '',
        phone: '',
        role: ''
      },
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleAddChange = this.handleAddChange.bind(this);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
    this.handleTransfer = this.handleTransfer.bind(this);

  }

  componentDidMount() {
    this.getBrothers();
  }

  getBrothers() {
    fetch('/brother')
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
    for (let id of this.state.selected) {
      fetch('/brother/delete', {
        method: 'delete',
        mode: 'cors',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "id": id
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
    this.props.updateSize();
  }

  async handleAdd(event) {
    event.preventDefault();
    await fetch('brother/add', {
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
       "phone": this.state.addBrother.phone,
       "role": this.state.addBrother.role
     })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    let addBrother = {
      last_name: '',
      first_name: '',
      year: '',
      major: '',
      minor: '',
      email: '',
      phone: '',
      role: ''
    }
    this.setState({addBrother: addBrother})
    await this.getBrothers();
    this.props.updateSize();
  }

  handleEdit(event) {
    event.preventDefault();
    let selectedBrothers = []
    for(let selected of this.state.selected) {
      for(let brother of this.state.brothers) {
        if(parseInt(selected) === parseInt(brother.id)) {
          selectedBrothers.push(brother)
        }
      }
    }
    console.log(selectedBrothers)
    if(selectedBrothers.length > 0) {
      this.setState({selectedBrothers: selectedBrothers})
      this.setState({edit: true})
    }
  }

  finishEdit(event) {
    event.preventDefault();
    this.setState({selected: []});
    this.setState({edit: false});
    this.getBrothers();
  }

  async handleTransfer(event) {
    // event.preventDefault();
    for (let id of this.state.selected) {
      fetch('/brother/transfer', {
        method: 'post',
        mode: 'cors',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "id": id
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
    this.props.updateSize();
  }


render() {
  return (
    <Container>
      {this.state.edit &&
        <Edit brothers={this.state.selectedBrothers} done={this.finishEdit} target="brother"/>
      }
      {!this.state.edit &&
        <Form>
          <ButtonGroup>
            <Button type="submit" onClick={this.handleAdd}>Add Brother</Button>
            <Button type="submit" onClick={this.handleEdit}>Edit Brother</Button>
            <Button type="submit" onClick={this.handleDelete}>Delete Brother</Button>
            <Button type="submit" onClick={this.handleTransfer}>Make Graduate</Button>
          </ButtonGroup>
          <Form.Group>
            <Form.Row>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Class Year</th>
                    <th>Major</th>
                    <th>Minor</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key="add_brother">
                    <td>
                      <Form.Check
                        type='checkbox'
                        id="filler"
                        disabled
                      />
                    </td>
                    <td>
                      <Form.Control
                        id="last_name"
                        placeholder="Last Name"
                        value={this.state.addBrother["last_name"]}
                        onChange={this.handleAddChange}
                      />
                    </td>
                    <td>
                      <Form.Control
                        id="first_name"
                        placeholder="First Name"
                        value={this.state.addBrother["first_name"]}
                        onChange={this.handleAddChange}
                      />
                    </td>
                    <td>
                      <Form.Control
                        id="year"
                        placeholder="Class Year"
                        value={this.state.addBrother["year"]}
                        onChange={this.handleAddChange}
                      />
                    </td>
                    <td>
                      <Form.Control
                        id="major"
                        placeholder="Major"
                        value={this.state.addBrother["major"]}
                        onChange={this.handleAddChange}
                      />
                    </td>
                    <td>
                      <Form.Control
                        id="minor"
                        placeholder="Minor"
                        value={this.state.addBrother["minor"]}
                        onChange={this.handleAddChange}
                      />
                    </td>
                    <td>
                      <Form.Control
                        id="email"
                        placeholder="Email"
                        value={this.state.addBrother["email"]}
                        onChange={this.handleAddChange}
                      />
                    </td>
                    <td>
                      <Form.Control
                        id="phone"
                        placeholder="Phone Number"
                        value={this.state.addBrother["phone"]}
                        onChange={this.handleAddChange}
                      />
                    </td>
                    <td>
                      <Form.Control
                        as="select"
                        id="role"
                        value={this.state.addBrother["role"]}
                        onChange={this.handleAddChange}
                      >
                        <option>Pledge</option>
                        <option>Brother</option>
                        <option>President</option>
                        <option>Treasurer</option>
                        <option>Recording</option>
                        <option>Corresponding</option>
                        <option>Historian</option>
                      </Form.Control>
                    </td>
                  </tr>
                  {this.state.brothers.map(
                    brother =>
                    <tr key={brother.last_name + "-" + brother.id}>
                      <td>
                        <Form.Check
                          type='checkbox'
                          id={brother.id}
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
                      <td>{brother.role}</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Form.Row>
          </Form.Group>
        </Form>
      }
      </Container>
    )
  }
}
