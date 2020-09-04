import React from 'react';

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import BrotherList from '../components/BrothersList';
import GraduateList from '../components/GraduatesList';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class Admin extends React.Component{
  render() {
    return(
      <Tabs defaultActiveKey="brothers" id="Admin-Control">
        <Tab eventKey="brothers" title="Brothers">
          <BrotherList />
        </Tab>
        <Tab eventKey="graduates" title="Graduates">
          <GraduateList />
        </Tab>
      </Tabs>
    )
  }
}
