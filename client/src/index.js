import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/site.css';
import './index.css';

import Brothers from './pages/Brothers';
import About from './pages/About';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Register from './pages/Register';
import Graduates from './pages/Graduates';
import Cabinet from './pages/Cabinet';
import PigDinner from './pages/PigDinner';
import Donate from './pages/Donate';
import Login from './pages/Login';

import Footer from './components/Footer';
import NavBar from './components/NavBar';


// ========================================

export default class App extends React.Component{

  render() {
    return (
      <div className="main-container">
      <Router>
        <NavBar/>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/brothers">
            <Brothers />
          </Route>
          <Route exact path="/graduates">
            <Graduates />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/admin">
            <Admin />
          </Route>
          <Route exact path="/login">
            <Login loggedIn={false} />
          </Route>
          <Route exact path="/cabinet">
            <Cabinet />
          </Route>
          <Route exact path="/pig_dinner">
            <PigDinner />
          </Route>
          <Route exact path="/donate">
            <Donate />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
        <Footer />
      </Router>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
