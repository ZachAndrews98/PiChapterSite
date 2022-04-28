import React from 'react'

import {Img} from 'react-image'

import '../css/component_css/BrotherCSS.css';

export default class Brother extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: props.info.first_name,
      last_name: props.info.last_name,
      major: props.info.major,
      minor: props.info.minor,
      grad_year: props.info.grad_year,
    }
  }
  render() {
    return (
      <div className="brother-info">
        {/*<img
          className="image"
          src={'/images/brothers/'+this.state.year+'/'+this.state.last_name.toLowerCase()+'.jpg'}
          onError="src='/images/test.jpg'"
          alt={this.state.first_name+" "+this.state.last_name}
        />*/}
        <Img
          className="image"
          src={[
            '/images/brothers/'+this.state.grad_year+'/'+this.state.last_name.toLowerCase()+'.jpg',
            '/images/test.jpg'
          ]}
        />
        <h5>{this.state.first_name} {this.state.last_name}</h5>
        <p key="major"><strong>Major:</strong> {this.state.major}</p>
        <p key="minor"><strong>Minor:</strong> {this.state.minor}</p>
      </div>
    )
  }
}
