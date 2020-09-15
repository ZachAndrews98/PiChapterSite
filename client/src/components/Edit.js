import React from 'react';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

export default class Edit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: this.props.brothers,
      target: this.props.target,
      current: {},
    }
    console.log(this.state.selected)
    this.handleEditChange = this.handleEditChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.clearCurrent = this.clearCurrent.bind(this)
  }

  async handleEdit(event) {
    event.preventDefault();
    const id = event.target.id
    const brother = this.state.selected.find(brother => parseInt(brother.id) === parseInt(id))
    let edit = {
      last_name: '',
      first_name: '',
      year: '',
      major: '',
      minor: '',
      email: '',
      phone: '',
      role: '',
      id: ''
    }

    for(let key of Object.keys(edit)) {
      if((event.target.id + "-" + key) in this.state.current) {
        let value = this.state.current[id + "-" + key]
        if(value !== '')
          edit[key] = value
        else
          edit[key] = brother[key]
      } else {
        edit[key] = brother[key]
      }
    }
    await fetch(`${this.state.target}/edit`, {
     method: 'put',
     mode: 'cors',
     headers: {'Content-Type':'application/json'},
     body: JSON.stringify({
       "last_name": edit.last_name,
       "first_name": edit.first_name,
       "year": edit.year,
       "major": edit.major,
       "minor": edit.minor,
       "email": edit.email,
       "phone": edit.phone,
       "role": edit.role,
       "id": edit.id
     })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    let newSelection = this.state.selected;
    newSelection[newSelection.indexOf(brother)] = edit;
    this.setState({selected: newSelection})
    this.clearCurrent()
  }

  handleEditChange(event) {
    if (event.target.id !== null) {
      let current = this.state.current;
      current[event.target.id] = event.target.value;
      this.setState({current: current});
    }
  }

  clearCurrent(event) {
    let current = {}
    this.setState({current: current});
  }

  render() {
    return (
      <Tabs defaultActiveKey={this.state.selected[0].id} id="edit-brothers" onSelect={this.clearCurrent}>
        {this.state.selected.map(
          selection =>
          <Tab eventKey={selection.id} title={selection.last_name}>
            <Form>
              <Form.Group style={{"textAlign": "center"}}>
                <Form.Row>
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    id={selection.id+ "-first_name"}
                    placeholder={selection.first_name}
                    value={this.state.current.first_name}
                    onChange={this.handleEditChange}
                  />
                </Form.Row>
                <Form.Row>
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    id={selection.id+ "-last_name"}
                    placeholder={selection.last_name}
                    value={this.state.current.last_name}
                    onChange={this.handleEditChange}
                  />
                </Form.Row>
                <Form.Row>
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    id={selection.id+ "-year"}
                    placeholder={selection.year}
                    value={this.state.current.year}
                    onChange={this.handleEditChange}
                  />
                </Form.Row>
                <Form.Row>
                  <Form.Label>Major</Form.Label>
                  <Form.Control
                    id={selection.id+ "-major"}
                    placeholder={selection.major}
                    value={this.state.current.major}
                    onChange={this.handleEditChange}
                  />
                </Form.Row>
                <Form.Row>
                  <Form.Label>Minor</Form.Label>
                  <Form.Control
                    id={selection.id+ "-minor"}
                    placeholder={selection.minor}
                    value={this.state.current.minor}
                    onChange={this.handleEditChange}
                  />
                </Form.Row>
                <Form.Row>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    id={selection.id+ "-email"}
                    placeholder={selection.email}
                    value={this.state.current.email}
                    onChange={this.handleEditChange}
                  />
                </Form.Row>
                <Form.Row>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    id={selection.id+ "-phone"}
                    placeholder={selection.phone}
                    value={this.state.current.phone}
                    onChange={this.handleEditChange}
                  />
                </Form.Row>
                <Form.Row>
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    id={selection.id + "-role"}
                    onChange={this.handleEditChange}
                  >
                    <option selected disabled>{selection.role}</option>
                    <option>Pledge</option>
                    <option>Brother</option>
                    <option>President</option>
                    <option>Treasurer</option>
                    <option>Recording</option>
                    <option>Corresponding</option>
                    <option>Historian</option>
                  </Form.Control>
                </Form.Row>
                <br/>
                <Form.Row>
                  <ButtonGroup>
                    <Button type="submit" id={selection.id} onClick={this.handleEdit}>Save</Button>
                    <Button type="submit" onClick={this.props.done}>Done</Button>
                  </ButtonGroup>
                </Form.Row>
              </Form.Group>
            </Form>
          </Tab>
        )}
      </Tabs>
    )
  }
}
