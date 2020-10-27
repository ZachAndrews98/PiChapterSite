import React from 'react';

import Container from 'react-bootstrap/Container';

export default class PigDinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      time: '',
      location: '',
    }
  }

  componentDidMount() {
    fetch('/api/event?title=Pig_Dinner')
    .then(res => res.json())
    .then((info) => {
      console.log(info)
      this.setState({date: info[0].event_date})
      this.setState({time: info[0].event_time})
      this.setState({location: "TEMP"})
    })
  }

  render() {
    return(
      <Container>
        <h1>Pig Dinner</h1>
        <h2>{this.state.date}</h2>
        <h2>{this.state.time}</h2>
        <h2>{this.state.location}</h2>
      </Container>
    )
  }
}
