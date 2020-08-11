import React from 'react';

import TypedComponent from '../components/TypedComponent';

export default class Home extends React.Component {
  render() {
    return(
      <div style={{"textAlign": "center"}}>
        <h1>Pi Chapter of<br/>Phi Gamma Delta</h1>
        <TypedComponent
          strings={[
            'Friendship^1000, Knowledge^1000, Service^1000, Morality^1000, and Excellence^1500',
            '^100Building Couragous Leaders'
          ]}
        />
      </div>
    )
  }
}
