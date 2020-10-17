import React from 'react';

import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default class EventList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      selected: [],
      addEvent: {
        title: '',
        event_date: '',
        event_time: ''
      },
    }

    this.handleSelect = this.handleSelect.bind(this);
    this.handleAddChange = this.handleAddChange.bind(this);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    // this.handleEdit = this.handleEdit.bind(this);
    // this.finishEdit = this.finishEdit.bind(this);
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents() {
    fetch('/event')
    .then(res => res.json())
    .then((events) => {
      this.setState({events: events})
    })
    .catch(console.log)
  }

  handleSelect(event) {
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
      let addEvent = this.state.addEvent;
      addEvent[event.target.id] = event.target.value;
      this.setState({addEvent: addEvent});
    }
  }

  async handleAdd(event) {
    event.preventDefault();
    //Add checks for if there is a brother to add (will have to do same in graduateList)
    if(Object.keys(this.state.addEvent).every(key => this.state.addEvent[key] !== "")) {
      await fetch('event/add', {
       method: 'post',
       mode: 'cors',
       headers: {'Content-Type':'application/json'},
       body: JSON.stringify({
         "title": this.state.addEvent.title,
         "event_date": this.state.addEvent.event_date,
         "event_time": this.state.addEvent.event_time,
       })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      let addEvent = {
        title: '',
        event_date: '',
        event_time: ''
      }
      this.setState({addEvent: addEvent})
      await this.getEvents();
    }
  }

  handleDelete(event) {
    event.preventDefault();
    for (let id of this.state.selected) {
      fetch('/event/delete', {
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
    this.getEvents();
    // this.props.updateSize();
  }

  render() {
    return (
        <Form>
          <ButtonGroup>
            <Button type="submit" onClick={this.handleAdd}>Add Event</Button>
            {/*<Button type="submit" onClick={this.handleEdit}>Edit Event</Button>*/}
            <Button type="submit" onClick={this.handleDelete}>Delete Event</Button>
          </ButtonGroup>
          <Form.Group>
            <Form.Row>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Time</th>
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
                        id="title"
                        placeholder="Title"
                        value={this.state.addEvent["title"]}
                        onChange={this.handleAddChange}
                      />
                    </td>
                    <td>
                      <Form.Control
                        id="event_date"
                        type="date"
                        placeholder="Event Date"
                        value={this.state.addEvent["event_date"]}
                        onChange={this.handleAddChange}
                      />
                    </td>
                    <td>
                      <Form.Control
                        id="event_time"
                        type="time"
                        placeholder="Event Time"
                        value={this.state.addEvent["event_time"]}
                        onChange={this.handleAddChange}
                      />
                    </td>
                  </tr>
                  {this.state.events.map(
                    event =>
                    <tr key={event.title + "-" + event.id}>
                      <td>
                        <Form.Check
                          type='checkbox'
                          id={event.id}
                          onChange={this.handleSelect}
                        />
                      </td>
                      <td>{event.title}</td>
                      <td>{event.event_date}</td>
                      <td>{event.event_time}</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Form.Row>
          </Form.Group>
        </Form>
    )
  }
}
