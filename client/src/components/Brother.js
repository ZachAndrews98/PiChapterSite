import React from 'react'

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
            <p>Name: {this.state.first_name} {this.state.last_name}</p>
            <ul>
              <li key="year">Year: {this.state.year}</li>
              <li key="major">Major: {this.state.major}</li>
              <li key="minor">Minor: {this.state.minor}</li>
            </ul>
            <img
              className="image"
              src={'/images/brothers/'+this.state.year+'/'+this.state.last_name.toLowerCase()+'.jpg'}
              alt={this.state.first_name+" "+this.state.last_name}
            />
          </div>
        </ul>
      </div>
    )
  }
}
