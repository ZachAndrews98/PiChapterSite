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
    this.handleTransfer = this.handleTransfer.bind(this)
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
    // console.log(this.state.selected)
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

  // async handleTransfer(event) {
  //   const id = event.target.id
  //   const brother = this.state.selected.find(brother => parseInt(brother.id) === parseInt(id))
  //   let transfer = {
  //     last_name: '',
  //     first_name: '',
  //     year: '',
  //     major: '',
  //     minor: '',
  //     email: '',
  //     phone: '',
  //     id: '',
  //     password: ''
  //   }
  //
  //   for(let key of Object.keys(transfer)) {
  //     if((event.target.id + "-" + key) in this.state.current) {
  //       let value = this.state.current[id + "-" + key]
  //       if(value !== '')
  //         transfer[key] = value
  //       else
  //         transfer[key] = brother[key]
  //     } else {
  //       transfer[key] = brother[key]
  //     }
  //   }
  //   await fetch(`${this.state.target}/transfer`, {
  //    method: 'post',
  //    mode: 'cors',
  //    headers: {'Content-Type':'application/json'},
  //    body: JSON.stringify({
  //      "last_name": transfer.last_name,
  //      "first_name": transfer.first_name,
  //      "year": transfer.year,
  //      "major": transfer.major,
  //      "minor": transfer.minor,
  //      "email": transfer.email,
  //      "phone": transfer.phone,
  //      "id": transfer.id,
  //      "password": transfer.password
  //    })
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log('Success:', data);
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });
  //   // console.log(this.state.selected)
  //   let newSelection = this.state.selected;
  //   this.setState({selected: newSelection.splice(newSelection.indexOf(brother), 1)})
  //   this.clearCurrent()
  // }

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
                  <ButtonGroup>
                    <Button type="submit" id={selection.id} onClick={this.handleEdit}>Save</Button>
                    <Button type="submit" onClick={this.props.done}>Done</Button>
                    <Button type="submit" id={selection.id} onClick={this.handleTransfer}>Transfer</Button>
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
