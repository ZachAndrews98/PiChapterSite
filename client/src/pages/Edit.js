import React from 'react';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

export default class Edit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: this.props.brothers,
      current: {},
    }
    console.log(this.state.selected)
    this.handleEditChange = this.handleEditChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.clearCurrent = this.clearCurrent.bind(this)
  }

  async handleEdit(event) {
    event.preventDefault();
    console.log(event.target.id)
    const id = event.target.id
    let edit = {
      last_name: '',
      first_name: '',
      year: '',
      major: '',
      minor: '',
      email: '',
      phone: ''
    }

    for(let key of Object.keys(edit)) {
      if((event.target.id + "-" + key) in this.state.current) {
        let value = this.state.current[id + "-" + key]
        if(value !== '')
          edit[key] = value
        else
          edit[key] = this.state.selected.find(brother => parseInt(brother.id) === parseInt(id))[key]
      } else {
        edit[key] = this.state.selected.find(brother => parseInt(brother.id) === parseInt(id))[key]
      }
    }
    console.log(edit)
    await fetch('brothers/edit', {
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

  handleEditChange(event) {
    console.log(event.target.id)
    if (event.target.id !== null) {
      let current = this.state.current;
      current[event.target.id] = event.target.value;
      this.setState({current: current});
    }
  }

  clearCurrent(event) {
    console.log(event)
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
              <Form.Group>
                <Form.Row>
                  <Col>
                    <Form.Control
                      id={selection.id+ "-first_name"}
                      placeholder={selection.first_name}
                      value={this.state.current.first_name}
                      onChange={this.handleEditChange}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      id={selection.id+ "-last_name"}
                      placeholder={selection.last_name}
                      value={this.state.current.last_name}
                      onChange={this.handleEditChange}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      id={selection.id+ "-year"}
                      placeholder={selection.year}
                      value={this.state.current.year}
                      onChange={this.handleEditChange}
                    />
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col>
                    <Form.Control
                      id={selection.id+ "-major"}
                      placeholder={selection.major}
                      value={this.state.current.major}
                      onChange={this.handleEditChange}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      id={selection.id+ "-minor"}
                      placeholder={selection.minor}
                      value={this.state.current.minor}
                      onChange={this.handleEditChange}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      id={selection.id+ "-email"}
                      placeholder={selection.email}
                      value={this.state.current.email}
                      onChange={this.handleEditChange}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      id={selection.id+ "-phone"}
                      placeholder={selection.phone}
                      value={this.state.current.phone}
                      onChange={this.handleEditChange}
                    />
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Button type="submit" id={selection.id} onClick={this.handleEdit}>Save</Button>
                </Form.Row>
                <Form.Row>
                  <Button type="submit" onClick={this.props.done}>Done</Button>
                </Form.Row>
              </Form.Group>
            </Form>
          </Tab>
        )}
      </Tabs>
    )
  }
}
