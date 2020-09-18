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

  get_cabinet() {
    fetch('/brothers/cabinet')
    .then(res => res.json())
    .then((cabinet) => {
      this.setState({president: cabinet.President})
      this.setState({treasurer: cabinet.Treasurer})
      this.setState({recording: cabinet.Recording})
      this.setState({corresponding: cabinet.Corresponding})
      this.setState({historian: cabinet.Historian})
    })
    .catch(console.log)
    console.log(this.state)
  }

  componentDidMount() {
    this.get_cabinet()
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
