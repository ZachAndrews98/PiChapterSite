import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Brother from '../components/Brother';

import '../css/page_css/Cabinet.css';

export default class Cabinet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      president: '',
      treasurer: '',
      recording: '',
      corresponding: '',
      historian: '',
    }
  }

  async get_cabinet() {
    await fetch('/api/executives')
    .then(res => res.json())
    .then((cabinet) => {
      // console.log(cabinet.filter(role => role.role_name === "President"))
      cabinet.filter(role => console.log(role))
      this.setState({president: cabinet.filter(role => role.role_name === "President")[0]})
      this.setState({treasurer: cabinet.filter(role => role.role_name === "Treasurer")[0]})
      this.setState({recording: cabinet.filter(role => role.role_name === "Recording Secretary")[0]})
      this.setState({corresponding: cabinet.filter(role => role.role_name === "Corresponding Secretary")[0]})
      this.setState({historian: cabinet.filter(role => role.role_name === "Historian")[0]})
    })
    .catch(console.log)
    console.log(this.state)
  }

  componentDidMount() {
    this.get_cabinet()
    console.log(this.state)
  }

  render() {
    return(
      <Container className="cabinet-container">
        <Row xl={3} lg={3} md={3} sm={1} xs={1}>
          <Col>
            <h2>President</h2>
            {this.state.president && (
              <Brother info={this.state.president} />
            )}
          </Col>
          <Col>
            <h2>Treasurer</h2>
            {this.state.treasurer && (
              <Brother info={this.state.treasurer} />
            )}
          </Col>
          <Col>
            <h2>Recording Secretary</h2>
            {this.state.recording && (
              <Brother info={this.state.recording} />
            )}
          </Col>
        </Row>
        <Row xl={2} lg={2} md={2} sm={1} xs={1}>
          <Col>
            <h2>Corresponding Secretary</h2>
            {this.state.corresponding && (
              <Brother info={this.state.corresponding} />
            )}
          </Col>
          <Col>
            <h2>Historian</h2>
            {this.state.historian && (
              <Brother info={this.state.historian} />
            )}
          </Col>
        </Row>
      </Container>
    )
  }
}
