import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Brother from '../components/Brother';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class Graduates extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      graduates: [],
    }
  }

  componentDidMount() {
    fetch('/graduates')
    .then(res => res.json())
    .then((brothers) => {
      this.setState({graduates: brothers})
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
            <Row>
              <h2>Graduates</h2>
            </Row>
            <Container fluid>
              {gradRows.map(
                row =>
                <Row>
                {row.map(
                  brother =>
                  <Col key={brother.first_name + " " + brother.last_name}>
                    <Brother info={brother} />
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
