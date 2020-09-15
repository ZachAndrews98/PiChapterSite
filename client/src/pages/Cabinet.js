import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Brother from '../components/Brother';

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

  async componentDidMount() {
    await fetch('/brothers/cabinet')
    .then(res => res.json())
    .then((cabinet) => {
      // console.log(cabinet)
      this.setState({president: cabinet.filter(member => member.role === "President")})
      this.setState({treasurer: cabinet.filter(member => member.role === "Treasurer")})
      this.setState({recording: cabinet.filter(member => member.role === "Recording")})
      this.setState({corresponding: cabinet.filter(member => member.role === "Corresponding")})
      this.setState({historian: cabinet.filter(member => member.role === "Historian")})
    })
    .catch(console.log)
    console.log(this.state)
    // console.log(this.state.president)
    // console.log(this.state.treasurer)
    // console.log(this.state.recording)
    // console.log(this.state.corresponding)
    // console.log(this.state.historian)
  }

  render() {
    return(
      <Container>
        <Row>
          <Col>
            <Brother info={this.state.president} />
          </Col>
        </Row>
        <Row>
        </Row>
      </Container>
    )
  }
}
