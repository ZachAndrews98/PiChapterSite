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
    fetch('/graduate')
    .then(res => res.json())
    .then((graduates) => {
      this.setState({graduates: graduates})
    })
    .catch(console.log)
  }

  makeRows(list, numPerRow) {
    let rows = []
    let row = []
    for (let i=0, j=list.length; i<j; i+=numPerRow) {
      row = list.slice(i,i+numPerRow);
      rows.push(row)
    }
    return rows;
  }

  render() {
    const numPerRow = 4;
    let gradRows = this.makeRows(this.state.graduates, numPerRow)
    return(
      <Container className="brothers-container">
        {gradRows.length > 0 &&
          <Row>
          <Container>
            <Row>
              <Col className="class-year">
                <h2>Graduates</h2>
              </Col>
            </Row>
          </Container>
            <Container fluid>
              {gradRows.map(
                row =>
                <Row>
                {row.map(
                  graduate =>
                  <Col key={graduate.first_name + " " + graduate.last_name}>
                    <Graduate info={graduate} />
                  </Col>
                )}
                </Row>
              )}
            </Container>
          </Row>
        }
      </Container>
    )
  }
}
