import React from 'react'

import '../css/component_css/BrotherCSS.css';

export default class Brother extends React.Component {
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
      <div style={{float: "left"}}>
        <ul>
          <div>
            <img
              className="image"
              src={'/images/brothers/'+this.state.year+'/'+this.state.last_name.toLowerCase()+'.jpg'}
              alt={this.state.first_name+" "+this.state.last_name}
            />
            <h5>Name: {this.state.first_name} {this.state.last_name}</h5>
            <p key="major">Major: {this.state.major}</p>
            <p key="minor">Minor: {this.state.minor}</p>
          </div>
        </ul>
      </div>
    )
  }
}
