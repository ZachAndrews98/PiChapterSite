import React from 'react';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import BrotherList from '../components/BrothersList';
import GraduateList from '../components/GraduatesList';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class Admin extends React.Component{
  render() {
    return(
      <Container>
        <Row>
        <Tabs defaultActiveKey="brothers" id="Admin-Control" style={{"color": "black"}}>
          <Tab eventKey="brothers" title="Brothers">
            <BrotherList />
          </Tab>
          <Tab eventKey="graduates" title="Graduates">
            <GraduateList />
          </Tab>
        </Tabs>
        </Row>
      </Container>
    )
  }
}
