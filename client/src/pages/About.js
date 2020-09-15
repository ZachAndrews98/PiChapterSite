import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/page_css/About.css';

export default function About(){
  return (
    <Container className="About-Content">
      <Row style={{"textAlign": "center"}}>
        <Col>
          <img className="coat" src="/images/ChapterCoat.png" alt="Pi Chapter Coat of Arms" />
        </Col>
      </Row>
      <Row>
        <strong><h2>Mission Statement</h2></strong>
        <p>We the brothers of the Pi Chapter of Phi Gamma Delta, exist to create a group
  of extraordinary gentlemen through diversity, excellence, and love for oneself.
  We aim to seek the highest standard of Friendship through diverse lifelong
  bonds of brotherhood. We aim to achieve true Knowledge through scholarly
  excellence. We aim to be the standard of Service for fraternities and
  sororities on campus through our commitment to philanthropy and community
  service. We aim to be the definition of Morality for knowing right from wrong
  and treating others with the utmost respect and showing we are truly Fiji
  gentlemen. We aim to achieve Excellence by upholding these four values and
  will aim to always lead with love and compassion for oneself and for the world.</p>
      </Row>
      <Row>
        <strong><h2>History</h2></strong>
        <p>Founded on June 5th, 1860, the Pi Chapter of Phi Gamma Delta was the ninth
          chapter of Phi Gamma Delta to be founded. The chapter has had several notible
          brothers, like Brother Edwin Mattern class of 1890. The chapter remained in
          operation until 1998 when the chapter was kicked off of Allegheny College's
          campus and the charter revoked by the International Headquarters of Phi Gamma
          Delta. The chapter then remained closed until 2013, when it was recharted.
          Since that point the chapter has strived to excel in everything it places its
          mind upon and to build the most upstanding fraternity men as possible.</p>
      </Row>
      <Row>
        <strong><h2>Values</h2></strong>
        <p>The Fraternity has five core values. <strong>Friendship</strong>,
          <strong>Knowledge</strong>, <strong>Service</strong>, <strong>Morality</strong>,
          and <strong>Excellence</strong>. These values are the pillars that have allowed
          for Phi Gamma Delta to remain in operation across the country and in Canada
          since 1848. These pillars are what every brother of the Pi Chapter are held to
          for any brother who is not held to the highest of standards cannot truly be a
          Fiji Gentleman nor a Couragous Leader.
        </p>
      </Row>
    </Container>
  )
}
