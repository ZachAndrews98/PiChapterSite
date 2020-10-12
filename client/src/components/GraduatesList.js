import React from 'react';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import Edit from './Edit';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class GraduatesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      graduates: [],
      selected: [],
      selectedGraduates: [],
      addGraduate: {
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

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
    this.handleTransfer = this.handleTransfer.bind(this);

  }

  componentDidMount() {
    this.getGraduates();
  }

  getGraduates() {
    fetch('/graduate')
    .then(res => res.json())
    .then((graduates) => {
      this.setState({graduates: graduates})
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
      let addGraduate = this.state.addGraduate;
      addGraduate[event.target.id] = event.target.value;
      this.setState({addGraduate: addGraduate});
    }
  }

  handleDelete(event) {
    event.preventDefault();
    for (let id of this.state.selected) {
      fetch('/graduate/delete', {
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
    this.getGraduates();
    this.props.updateSize();
  }

  async handleAdd(event) {
    event.preventDefault();
    await fetch('graduate/add', {
     method: 'post',
     mode: 'cors',
     headers: {'Content-Type':'application/json'},
     body: JSON.stringify({
       "last_name": this.state.addGraduate.last_name,
       "first_name": this.state.addGraduate.first_name,
       "year": this.state.addGraduate.year,
       "major": this.state.addGraduate.major,
       "minor": this.state.addGraduate.minor,
       "email": this.state.addGraduate.email,
       "phone": this.state.addGraduate.phone
     })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    console.log(this.state.addGraduate)
    let addGraduate = {
      last_name: '',
      first_name: '',
      year: '',
      major: '',
      minor: '',
      email: '',
      phone: ''
    }
    this.setState({addGraduate: addGraduate})
    console.log(this.state.addGraduate)
    await this.getGraduates();
    this.props.updateSize();
  }

  handleEdit(event) {
    event.preventDefault();
    let selectedGraduates = []
    for(let selected of this.state.selected) {
      for(let graduate of this.state.graduates) {
        if(parseInt(selected) === parseInt(graduate.id)) {
          selectedGraduates.push(graduate)
        }
      }
    }
    console.log(selectedGraduates)
    if(selectedGraduates.length > 0) {
      this.setState({selectedGraduates: selectedGraduates})
      this.setState({edit: true})
    }
  }

  finishEdit(event) {
    event.preventDefault();
    this.setState({selected: []});
    this.setState({edit: false});
    this.getGraduates();
  }

  async handleTransfer(event) {
    // event.preventDefault();
    for (let id of this.state.selected) {
      fetch('/graduate/transfer', {
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
    this.getGraduates();
    this.props.updateSize();
  }


render() {
  return (
    <Container>
      {this.state.edit &&
        <Edit brothers={this.state.selectedGraduates} done={this.finishEdit} target="graduate" />
      }
      {!this.state.edit &&
        <Form>
          <ButtonGroup>
            <Button type="submit" onClick={this.handleAdd}>Add Graduate</Button>
            <Button type="submit" onClick={this.handleEdit}>Edit Graduate</Button>
            <Button type="submit" onClick={this.handleDelete}>Delete Graduate</Button>
            <Button type="submit" onClick={this.handleTransfer}>Make Under Grad</Button>
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
                  </tr>
                </thead>
                <tbody>
                  <tr>
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
                        value={this.state.addGraduate["last_name"]}
                        onChange={this.handleAddChange}
                      />
                    </td>
                    <td>
                      <Form.Control
                        id="first_name"
                        placeholder="First Name"
                        value={this.state.addGraduate["first_name"]}
                        onChange={this.handleAddChange}
                      />
                    </td>
                    <td>
                      <Form.Control
                        id="year"
                        placeholder="Class Year"
                        value={this.state.addGraduate["year"]}
                        onChange={this.handleAddChange}
                      />
                    </td>
                    <td>
                      <Form.Control
                        id="major"
                        placeholder="Major"
                        value={this.state.addGraduate["major"]}
                        onChange={this.handleAddChange}
                      />
                    </td>
                    <td>
                      <Form.Control
                        id="minor"
                        placeholder="Minor"
                        value={this.state.addGraduate["minor"]}
                        onChange={this.handleAddChange}
                      />
                    </td>
                    <td>
                      <Form.Control
                        id="email"
                        placeholder="Email"
                        value={this.state.addGraduate["email"]}
                        onChange={this.handleAddChange}
                      />
                    </td>
                    <td>
                      <Form.Control
                        id="phone"
                        placeholder="Phone Number"
                        value={this.state.addGraduate["phone"]}
                        onChange={this.handleAddChange}
                      />
                    </td>
                  </tr>
                  {this.state.graduates.map(
                    graduate =>
                    <tr>
                      <td>
                        <Form.Check
                          type='checkbox'
                          id={graduate.id}
                          onChange={this.handleChange}
                        />
                      </td>
                      <td>{graduate.last_name}</td>
                      <td>{graduate.first_name}</td>
                      <td>{graduate.year}</td>
                      <td>{graduate.major}</td>
                      <td>{graduate.minor}</td>
                      <td>{graduate.email}</td>
                      <td>{graduate.phone}</td>
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
