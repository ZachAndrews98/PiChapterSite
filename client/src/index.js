import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';

import 'bootstrap/dist/css/bootstrap.min.css';

import Brothers from './pages/Brothers';
import Game from './pages/Game';
import About from './pages/About';
import Home from './pages/Home';
import Admin from './pages/Admin';

// ========================================

export default function App() {
  return (
    <Router>
      <div>
        <Navbar expand="lg" style={{"backgroundColor": "#543975"}}>
        <Navbar.Brand>Allegheny Fiji</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/game">Game</Nav.Link>
            <Nav.Link href="/brothers">Brothers</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/admin">Admin</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Navbar>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/game">
            <Game />
          </Route>
          <Route path="/brothers">
            <Brothers />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById("test")
);
