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
      grad_years: []
    }
  }

  componentDidMount() {
    fetch('/api/brothers?role_id=3')
    .then(res => res.json())
    .then((graduates) => {
      let grad_years = new Set()
      for (let entry of graduates) {
        grad_years.add(entry.grad_year)
      }
      this.setState(
        {
          grad_years: Array.from(grad_years).sort((a, b) => {
            return b - a;
          })
        }
      )
      this.setState({graduates: graduates})
    })
    .catch(console.log)
  }

  render() {
    return(
      <Container className="brothers-container">
        <Container fluid>
          <Row className="justify-content-md-center">
            <Col>
              <h1>Pi Chapter Graduates</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Accordion defaultActiveKey="0">
              {this.state.grad_years.map(
                grad_year =>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey={this.state.grad_years.indexOf(grad_year).toString()}>
                    Class of {grad_year}
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={this.state.grad_years.indexOf(grad_year).toString()}>
                    <Card.Body>
                      <Row className="justify-content-md-center" xl={5} lg={4} md={3} sm={2} xs={1}>
                        {this.state.graduates.filter(entry => entry.grad_year === grad_year).map(
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
            </Col>
          </Row>
        </Container>
      </Container>
    )
  }
}
