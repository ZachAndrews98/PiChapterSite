import React from 'react';

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import BrotherList from '../components/BrothersList';
import GraduateList from '../components/GraduatesList';
import EventList from '../components/EventList';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/page_css/Admin.css';

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
        <Tabs defaultActiveKey="brothers" id="Admin-Control">
          <Tab eventKey="brothers" title="Brothers List">
            <h3>Total Brothers: {this.state.totalBrothers}</h3>
            <BrotherList updateSize={this.brothersSize}/>
          </Tab>
          <Tab eventKey="graduates" title="Graduates List">
            <h3>Total Graduates: {this.state.totalGraduates}</h3>
            <GraduateList updateSize={this.graduatesSize}/>
          </Tab>
          <Tab eventKey="events" title="Events List">
            <EventList/>
          </Tab>
        </Tabs>
      </div>
    )
  }
}
