import React from 'react';

import '../css/component_css/FooterCSS.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

export default class Footer extends React.Component {
  render() {
    return (
      <div className="Footer-component">
        <Container>
          <Row>
            <Col>
              <span>Test</span>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
