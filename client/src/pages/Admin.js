import React from 'react';

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import BrotherList from '../components/BrothersList';
import GraduateList from '../components/GraduatesList';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/component_css/AdminCSS.css';

export default class Admin extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      totalBrothers: 0,
      totalGraduates: 0,
    };

    this.brothersSize = this.brothersSize.bind(this);
    this.graduatesSize = this.graduatesSize.bind(this);
  }

  componentDidMount() {
    this.brothersSize();
    this.graduatesSize();
  }

  brothersSize() {
    fetch('/brother')
    .then(res => res.json())
    .then((brothers) => {
      this.setState({totalBrothers: brothers.length})
    })
    .catch(console.log)
  }

  graduatesSize() {
    fetch('/graduate')
    .then(res => res.json())
    .then((graduates) => {
      this.setState({totalGraduates: graduates.length})
    })
    .catch(console.log)
  }

  render() {
    return(
      <div className="Admin-Container">
        <h3>Total Brothers: {this.state.totalBrothers}</h3>
        <h3>Total Graduates: {this.state.totalGraduates}</h3>
        <Tabs defaultActiveKey="brothers" id="Admin-Control">
          <Tab eventKey="brothers" title="Brothers" updateSize={this.brothersSize}>
            <BrotherList />
          </Tab>
          <Tab eventKey="graduates" title="Graduates" updateSize={this.graduatesSize}>
            <GraduateList />
          </Tab>
        </Tabs>
      </div>
    )
  }
}
