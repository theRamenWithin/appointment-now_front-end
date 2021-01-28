import React, { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Connection to back-end
import axios from 'axios'

// Components
import NavBar from './components/NavBar';
import Footer from './components/Footer';

// Page content
import About from './components/About';
import Contact from './components/Contact';
import Blog from './components/Blog';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

// Sidebar links
import Events from './components/Events';
import EditProfile from './components/EditProfile';
import EditOrganisation from './components/EditOrganisation';

import NotFound from './components/404.js';

// Styling
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');

  const loginStatus = () => {
    axios.get('http://localhost:3000/logged_in',
    {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        handleLogin(response)
      } else {
        handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  }
  
  const handleLogin = useCallback((data) => {
    setIsLoggedIn(!isLoggedIn);
    setUser(data.user);
  }, [isLoggedIn])

  const handleLogout = useCallback(() => {
    setIsLoggedIn(isLoggedIn);
    setUser('');
  },[isLoggedIn])

  useEffect(loginStatus, [loginStatus]);

  return (
    <>
      <Router>
        <div className="super-container">
          <CssBaseline />
          <NavBar />
          <Container maxWidth="lg" className="container">
            <Switch>\
              <Route exact path='/events' component={Events} />
              <Route exact path='/editprofile' component={EditProfile} />
              <Route exact path='/editprofile' component={EditOrganisation} />

              <Route 
                exact path='/signup'
                render={props => (
                <SignUp {...props} handleLogin={handleLogin} loggedInStatus={isLoggedIn}/>
                )}
              />
              <Route 
                exact path='/signin'
                render={props => (
                <SignIn {...props} handleLogin={handleLogin} loggedInStatus={isLoggedIn}/>
                )}
              />
              <Route exact path='/blog' component={Blog} />
              <Route exact path='/contact' component={Contact} />
              <Route 
                exact path='/' 
                render={props => (
                <About {...props} handleLogin={handleLogout}/>
                )}
              />
              <Route component={NotFound}/>
            </Switch>
          </Container>
          <Footer />
        </div>
      </Router>
    </>
  );
}