import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import logoSmall from '../assets/logo-small.svg';

export default function NavBar(props) {
  const handleClick = () => {
    axios.delete('http://localhost:3001/logout', {withCredentials: true})
    .then(response => {
      props.handleLogout()
      props.history.push('/')
    })
    .catch(error => console.log(error))
  }

  return (
    <nav className="nav">
      <div className="nav-left">
        <img src={logoSmall} alt="Logo typeface"/>
        <ul>
          <li><Link to={'/signup'} className="nav-link">Sign Up </Link></li>
          <li><Link to={'/signin'} className="nav-link"> Sign In</Link></li>
          <li>
            {
              props.loggedInStatus ? <Link to={'/logout'} onClick={handleClick}>Log Out</Link> : null
            }
          </li>
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