import React from 'react'

import '../css/component_css/BrotherCSS.css';

export default class Graduate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: props.info.first_name,
      last_name: props.info.last_name,
      major: props.info.major,
      minor: props.info.minor,
      year: props.info.year,
    }
  }
  render() {
    return (
      <div class="brother-info">
        <h5>{this.state.first_name} {this.state.last_name}</h5>
        <h6>Class of {this.state.year}</h6>
        <p key="major"><strong>Major:</strong> {this.state.major}</p>
        <p key="minor"><strong>Minor:</strong> {this.state.minor}</p>
      </div>
    )
  }
}
