import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Brother from '../components/Brother';

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

  render() {
    return(
      <Container>
        <Row>
          <h2>Seniors</h2>
          {this.state.seniors.map(
            brother => <Col key={brother.first_name + " " + brother.last_name}><Brother info={brother} /></Col>
          )}
        </Row>
        <Row>
          <h2>Juniors</h2>
          {this.state.juniors.map(
            brother => <Col key={brother.first_name + " " + brother.last_name}><Brother info={brother} /></Col>
          )}
        </Row>
        <Row>
          <h2>Sophmores</h2>
          {this.state.sophmores.map(
            brother => <Col key={brother.first_name + " " + brother.last_name}><Brother info={brother} /></Col>
          )}
        </Row>
        <Row>
          <h2>Freshmen</h2>
          {this.state.freshmen.map(
            brother => <Col key={brother.first_name + " " + brother.last_name}><Brother info={brother} /></Col>
          )}
        </Row>
      </Container>
    )
  }
}
