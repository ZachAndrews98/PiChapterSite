import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import '../css/site.css';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: "test",
    }
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    console.log(this.state.active)
  }

  handleSelect(selected) {
    console.log(this.state.active)
    this.setState({active: selected.value})
    console.log(this.state.active)
  }

  render() {
    return (
      <Navbar fixed="top" expand="lg" bg="feej" varient="navbar-feej">
      <Navbar.Brand>Allegheny Fiji</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav justify fill defaultActiveKey="/" onSelect={this.handleSelect} className="ml-auto" varient="nav-link">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/brothers">Brothers</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/admin">Admin</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Navbar>
    )
  }
}
