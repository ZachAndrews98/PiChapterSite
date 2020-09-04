import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import '../css/component_css/NavCSS.css';

export default function NavBar() {
  return (
    <div className="NavBar-Component">
      <Navbar fixed="top" expand="lg" bg="feej" varient="navbar-feej">
        <Navbar.Brand className="feej-brand">
          <img className="crest" src="/images/ChapterCoatWhite.png" alt="Chapter Coat of Arms"/>
          Allegheny Fiji
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav justify fill activeKey={window.location.pathname} className="ml-auto">
            <Nav.Link className="feej-link" href="/">Home</Nav.Link>
            <Nav.Link className="feej-link" href="/about">About</Nav.Link>
            <Nav.Link className="feej-link" href="/brothers">Brothers</Nav.Link>
            <Nav.Link className="feej-link" href="/admin">Admin</Nav.Link>
            {/*<Nav.Link className="feej-link" href="/login">Login</Nav.Link>
            <Nav.Link className="feej-link" href="/register">Register</Nav.Link>*/}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
