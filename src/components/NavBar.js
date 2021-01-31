import React from 'react';
import { Link } from "react-router-dom";

// Logos
import logoSmall from '../assets/logo-small.svg';

// Recieving isLoggedIn from App.js
export default function NavBar(props) {

  // Renders a Navbar split into two sides.
  return (
    <nav className="nav">
      <div className="nav-left">
        <img src={logoSmall} alt="Logo typeface"/>
        <ul>
          {/* Render the Sign In & Sign Out links if not signed in */}
          {
            props.isLoggedIn ? null: (
              <>
                <li><Link to={'/signup'} className="nav-link">Sign Up </Link></li>
                <li><Link to={'/signin'} className="nav-link"> Sign In</Link></li>
              </>
            )
          }
        </ul>
      </div>
      
      <div className="nav-right">
        <ul>
          <li><Link to={'/'} className="nav-link">About </Link></li>
          <li><Link to={'/contact'} className="nav-link"> Contact </Link></li>
          <li><Link to={'/blog'} className="nav-link"> Blog</Link></li>
        </ul>
      </div>
    </nav>
  );
}