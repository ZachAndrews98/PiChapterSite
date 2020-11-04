import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { CSVLink } from "react-csv";

export default class Export extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      graduateData: [],
      brotherData: [],
      list: null
    }
  }

  componentDidMount() {
    fetch(`/api/brother?grad=false`)
    .then(res => res.json())
    .then((data) => {
      let entries = []
      for(let entry of data) {
        entries.push(entry)
      }
      this.setState({brotherData: entries})
    })

    fetch(`/api/brother?grad=true`)
    .then(res => res.json())
    .then((data) => {
      let entries = []
      for(let entry of data) {
        entries.push(entry)
      }
      this.setState({graduateData: entries})
    })
  }

  render() {
    let gradData = this.state.graduateData
    let broData = this.state.brotherData

    return(
      <Container>
        <Row>
          <CSVLink
            data={broData}
            filename={"brothers.csv"}
          >
            Download Brothers List
          </CSVLink>
        </Row>
        <Row>
          <CSVLink
            data={gradData}
            filename={"graduates.csv"}
          >
            Download Graduate List
          </CSVLink>
        </Row>
      </Container>
    )
  }
}
