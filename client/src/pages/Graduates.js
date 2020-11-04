import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

import Graduate from '../components/Graduate';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class Graduates extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      graduates: [],
      years: []
    }
  }

  componentDidMount() {
    fetch('/api/brother?grad=true')
    .then(res => res.json())
    .then((graduates) => {
      let years = new Set()
      for (let entry of graduates) {
        years.add(entry.year)
      }
      this.setState({years: Array.from(years)})
      this.setState({graduates: graduates})
    })
    .catch(console.log)
  }

  render() {
    return(
      <Container className="brothers-container">
        <Container fluid>
          <Accordion defaultActiveKey="0">
          {this.state.years.map(
            year =>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey={this.state.years.indexOf(year).toString()}>
                Class of {year}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={this.state.years.indexOf(year).toString()}>
                <Card.Body>
                  <Row className="justify-content-md-center" xl={5} lg={4} md={3} sm={2} xs={1}>
                    {this.state.graduates.filter(entry => entry.year === year).map(
                      grad =>
                      <Col lg={true} key={grad.first_name + " " + grad.last_name}>
                        <Graduate info={grad} />
                        <br />
                      </Col>
                    )}
                  </Row>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          )}
          </Accordion>
        </Container>
      </Container>
    )
  }
}
