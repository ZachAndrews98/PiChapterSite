import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../css/page_css/NotFound.css';

export default function NotFound() {
  return (
    <Container className="NotFound-Container">
      <h1 className="header-centered">Page Not Found</h1>
    </Container>
  )
}
