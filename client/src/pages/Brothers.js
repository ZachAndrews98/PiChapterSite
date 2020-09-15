import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Brother from '../components/Brother';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/component_css/BrotherCSS.css';

export default class Brothers extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      seniors: [],
      juniors: [],
      sophmores: [],
      freshmen: [],
    }
  }

  componentDidMount() {
    fetch('/brothers')
    .then(res => res.json())
    .then((brothers) => {
      this.get_classes(brothers)
    })
    .catch(console.log)
  }

  get_classes(brothers) {
    fetch('/grad_year')
    .then(res => res.json())
    .then((year) => {
      this.setState({seniors: brothers.filter(brother => brother.year === parseInt(year))})
      this.setState({juniors: brothers.filter(brother => brother.year === parseInt(year) + 1)})
      this.setState({sophmores: brothers.filter(brother => brother.year === parseInt(year) + 2)})
      this.setState({freshmen: brothers.filter(brother => brother.year === parseInt(year) + 3)})
    })
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
    let seniorRows = this.makeRows(this.state.seniors, numPerRow)
    let juniorRows = this.makeRows(this.state.juniors, numPerRow)
    let sophmoreRows = this.makeRows(this.state.sophmores, numPerRow)
    let freshmenRows = this.makeRows(this.state.freshmen, numPerRow)
    return(
      <Container className="brothers-container">
        {seniorRows.length > 0 &&
          <Row>
            <Container>
              <Row>
                <Col className="class-year">
                  <h2>Seniors</h2>
                </Col>
              </Row>
            </Container>
            <Container fluid>
              {/*{seniorRows.map(
                row =>
                <Row>
                {row.map(
                  brother =>
                  <Col key={brother.first_name + " " + brother.last_name}>
                    <Brother info={brother} />
                  </Col>
                )}
                </Row>
              )}*/}
              <Row xl={5} lg={4} md={3} sm={2} xs={1}>
              {this.state.seniors.map(
                brother =>
                <Col lg={true} key={brother.first_name + " " + brother.last_name}>
                  <Brother info={brother} />
                </Col>
              )}
              </Row>
            </Container>
          </Row>
        }
        {juniorRows.length > 0 &&
          <Row>
          <Container>
            <Row>
              <Col className="class-year">
                <h2>Juniors</h2>
              </Col>
            </Row>
          </Container>
            <Container fluid>
              {/*{juniorRows.map(
                row =>
                <Row>
                {row.map(
                  brother =>
                  <Col key={brother.first_name + " " + brother.last_name}>
                    <Brother info={brother} />
                  </Col>
                )}
                </Row>
              )}*/}
              <Row xl={5} lg={4} md={3} sm={2} xs={1}>
              {this.state.juniors.map(
                brother =>
                <Col lg={true} key={brother.first_name + " " + brother.last_name}>
                  <Brother info={brother} />
                </Col>
              )}
              </Row>
            </Container>
          </Row>
        }
        {sophmoreRows.length > 0 &&
          <Row>
            <Container>
              <Row>
                <Col className="class-year">
                  <h2>Sophmores</h2>
                </Col>
              </Row>
            </Container>
            <Container fluid>
              {/*{sophmoreRows.map(
                row =>
                <Row>
                {row.map(
                  brother =>
                  <Col key={brother.first_name + " " + brother.last_name}>
                    <Brother info={brother} />
                  </Col>
                )}
                </Row>
              )}*/}
              <Row xl={5} lg={4} md={3} sm={2} xs={1}>
              {this.state.sophmores.map(
                brother =>
                <Col lg={true} key={brother.first_name + " " + brother.last_name}>
                  <Brother info={brother} />
                </Col>
              )}
              </Row>
            </Container>
          </Row>
        }
        {freshmenRows.length > 0 &&
          <Row>
            <Container>
              <Row>
                <Col className="class-year">
                  <h2>Freshmen</h2>
                </Col>
              </Row>
            </Container>
            <Container fluid>
              {freshmenRows.map(
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
