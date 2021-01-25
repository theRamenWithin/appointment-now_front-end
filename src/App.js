import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import logoSmall from './assets/logo-small.svg';
import './App.css';


export default function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <div className="nav-left">
            <img src="logoSmall" alt="Logo typeface"></img>
            <ul>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            </ul>
          </div>
          
          <div className="nav-right">
            <ul>
              <li>
                <Link to="/">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
            </ul>
          </div>
        </nav>

        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/blog">
            <Blog />
          </Route>
          <Route path="/Contact">
            <Contact />
          </Route>
          <Route path="/">
            <About />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function About() {
  return <h2>About</h2>;
}

function Contact() {
  return <h2>Contact Us</h2>;
}

function Blog() {
  return <h2>Blog</h2>;
}

function SignUp() {
  return <h2>SignUp</h2>;
}

function SignIn() {
  return <h2>Sign In</h2>;
}
