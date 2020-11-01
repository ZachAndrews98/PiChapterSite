import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import {Img} from 'react-image';

import '../css/page_css/Donate.css';

export default class Donate extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Container className="Donate-Component">
        <Row className="justify-content-md-center" xl={1} lg={1} md={1} sm={1} xs={1}>
          <Col>
            <h1 className="header">Donate</h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <Img
              className="image"
              src={[
                '/images/page_images/pledges.jpg'
              ]}
            />
          </Col>
          <Col>
            <p>We just started the pledging process for our new members. We would like them
    to not have to worry about the finances involved in this process so that they
    may enjoy becoming a fully initiated brother of Phi Gamma Delta! Any funds are
    appreciated by these new members and by those already initiated!</p>
            <Button
              href="#" className="home-button"
              size="lg" variant="feej" block
            > Donate
            </Button>
          </Col>
        </Row>
      </Container>
    )
  }
}
