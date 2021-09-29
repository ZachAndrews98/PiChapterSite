import React from 'react';

import TypedComponent from '../components/TypedComponent';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/page_css/Home.css';

export default class Home extends React.Component {
  render() {
    return(
      <div className="Home-component">
        <Row className="justify-content-md-center">
          <Col>
            <h1 className="title">Pi Chapter of<br/>Phi Gamma Delta</h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <TypedComponent
              strings={[
                'Friendship^1000, Knowledge^1000, Service^1000,<br> Morality^1000, and Excellence^1500',
                '^100Building Couragous Leaders'
              ]}
            />
          </Col>
        </Row>
        {/*<Row className="justify-content-md-center">
          <Col>
            <Button
              href="/about" className="home-button"
              size="lg" variant="feej"
            > About Us
            </Button>
            <Button
              href="/#" className="home-button"
              size="lg" variant="feej"
            > Contact Us
            </Button>
          </Col>
        </Row>*/}
      </div>
    )
  }
}
