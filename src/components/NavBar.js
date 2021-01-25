import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import About from './About';
import Contact from './Contact';
import Blog from './Blog';
import SignIn from './SignIn';
import SignUp from './SignUp';

import logoSmall from '../assets/logo-small.svg';

// import { AppBar, Toolbar } from '@material-ui/core'

export default function NavBar() {
    return (
        <Router>
        <div>
          <nav className="nav">
            <div className="nav-left">
              <img src={logoSmall} alt="Logo typeface"></img>
              <ul>
                <li><Link to={'/signout'} className="nav-link">Sign Up</Link></li>
                <li><Link to={'/signin'} className="nav-link">Sign In</Link></li>
              </ul>
            </div>
            
            <div className="nav-right">
              <ul>
                <li><Link to={'/'} className="nav-link">About</Link></li>
                <li><Link to={'/contact'} className="nav-link">Contact</Link></li>
                <li><Link to={'/blog'} className="nav-link">Blog</Link></li>
              </ul>
            </div>
          </nav>
  
          <Switch>
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/blog' component={Blog} />
            <Route exact path='/contact' component={Contact} />
            <Route exact path='/' component={About} />
          </Switch>
        </div>
      </Router>
    );
}