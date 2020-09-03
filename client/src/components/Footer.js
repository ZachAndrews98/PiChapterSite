import React from 'react';

import '../css/component_css/FooterCSS.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faCopyright } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'

export default class Footer extends React.Component {
  render() {
    return (
      <div className="Footer-component">
        <Container>
          <Row>
            <Col className="social">
              {/*<a href="/contact">
                <FontAwesomeIcon icon={faAddressCard} size="2x"/>
              </a>*/}
              <a href="https://www.facebook.com/allegheny.fiji/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} size="2x"/>
              </a>
              <a href="https://www.instagram.com/allegheny_fiji" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} size="2x"/>
              </a>
              <a href="https://www.twitter.com/fiji_pi_chapter" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} size="2x"/>
              </a>
            </Col>
            <Col className="copyright">
              <span><FontAwesomeIcon icon={faCopyright} /> Allegheny Fiji. All Rights Reserved.</span>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
