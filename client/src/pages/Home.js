import React from 'react';

import TypedComponent from '../components/TypedComponent';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/page_css/Home.css';

export default class Home extends React.Component {
  render() {
    return(
      <div className="Home-component">
        <h1 className="title">Pi Chapter of<br/>Phi Gamma Delta</h1>
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
