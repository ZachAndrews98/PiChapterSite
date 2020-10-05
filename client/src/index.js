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
import Login from './pages/Login';
import Register from './pages/Register';
import Graduates from './pages/Graduates';
import Cabinet from './pages/Cabinet';

import Footer from './components/Footer';
import NavBar from './components/NavBar';


// ========================================

export default class App extends React.Component{

  render() {
    return (
      <Router>
        <NavBar/>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
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
            <Login loggedIn={false} user={''} />
          </Route>
          <Route exact path="/cabinet">
            <Cabinet />
          </Route>
        </Switch>
        <Footer />
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
