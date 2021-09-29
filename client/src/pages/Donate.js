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
        <Row className="justify-content-md-center">
          <Col>
            <h1 className="header">Donate</h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center" xl={2} lg={2} md={2} sm={1} xs={1}>
          <Col>
            <Img
              className="image"
              src={[
                '/images/page_images/pledges.jpg'
              ]}
            />
          </Col>
          <Col className="message">
            <p>We just started the pledging process for our new members. We would like them
    to not have to worry about the finances involved in this process so that they
    may enjoy becoming a fully initiated brother of Phi Gamma Delta! Any funds are
    appreciated by these new members and by those already initiated!</p>
            <Button
              href="https://www.legfi.com/app/fundraisers/phigam2020spring/963" className="donate-button"
              size="lg" variant="feej" block
            > Donate
            </Button>
          </Col>
        </Row>
      </Container>
    )
  }
}
