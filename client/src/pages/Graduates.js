import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Graduate from '../components/Graduate';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class Graduates extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      graduates: [],
    }
  }

  componentDidMount() {
    fetch('/api/brother?grad=true')
    .then(res => res.json())
    .then((graduates) => {
      this.setState({graduates: graduates})
    })
    .catch(console.log)
  }

  render() {
    return(
      <Container className="brothers-container">
        <Container fluid>
          <Row className="justify-content-md-center" xl={5} lg={4} md={3} sm={2} xs={1}>
            {this.state.graduates.map(
              grad =>
              <Col lg={true} key={grad.first_name + " " + grad.last_name}>
                <Graduate info={grad} />
                <br />
              </Col>
            )}
          </Row>
        </Container>
      </Container>
    )
  }
}
