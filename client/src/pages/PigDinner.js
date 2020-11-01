import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import {Img} from 'react-image'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/page_css/PigDinner.css';

export default class PigDinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      time: '',
      location: '',
    }
  }

  componentDidMount() {
    fetch('/api/event?title=Pig_Dinner')
    .then(res => res.json())
    .then((info) => {
      console.log(info)
      if(info[0] !== undefined) {
        this.setState({date: info[0].event_date})
        this.setState({time: info[0].event_time})
      }
      else {
        this.setState({date: "To be announced"})
        this.setState({time: "To be announced"})
      }
      this.setState({location: "TEMP"})
    })
  }

  render() {
    return(
      <Container className="PigDinner-Component">
        <Row className="justify-content-md-center" xl={1} lg={1} md={1} sm={1} xs={1}>
          <Col>
            <h1 className="header">Frank Norris Memorial Pig Dinner</h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <Img
              className="image"
              src={[
                '/images/page_images/pig_dinner.jpg'
              ]}
            />
          </Col>
        </Row>
        <Row className="justify-content-md-center info" xl={2} lg={2} md={2} sm={1} xs={1}>
          <Col>
            <p>Phi Gamma Delta's Norris Pig Dinner is the most widely observed and
          longest continually running, chapter based, annual graduate event in the
          Greek world. The first Pig Dinner was held at the University of California
          at Berkeley in 1893. In 1902, the Pig Dinner was dedicated in memory of
          Frank Norris (California at Berkeley 1894), whose sense of humor created
          the event that has become an annual ceremony throughout all of Phi Gamma Delta.</p>
          </Col>
          <Col>
            <h2>Event Information</h2>
            <h2>{"Date: " + this.state.date}</h2>
            <h2>{"Time: " + this.state.time}</h2>
            <h2>{"Location: " + this.state.location}</h2>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <Button
              href="#" className="home-button"
              size="lg" variant="feej" block
            > Buy Tickets
            </Button>
          </Col>
        </Row>
      </Container>
    )
  }
}
