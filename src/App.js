import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Token Request
import axios from 'axios'

// Components
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

// Page content
import About from './components/About';
import Contact from './components/Contact';
import Blog from './components/Blog';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import JoinOrganisation from './components/JoinOrganisation';

// Sidebar links
import Events from './components/Events';
import EditProfile from './components/EditProfile';
import EditOrganisation from './components/EditOrganisation';

// 404 page
import NotFound from './components/404.js';

// Styling
import './App.css';
import Container from '@material-ui/core/Container';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');

  // Axios GET request to API method to check if there is a logged in user
  const loginStatus = () => {
    axios.get('http://localhost:3001/logged_in',
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
  
  // Sets isLoggedIn to True and user to user data received from Rails
  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setUser(data.user);
  }

  // Sets isLoggedIn to False and clears current user data
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser('');
  }

  // On re-render, check loginStatus
  useEffect(loginStatus);

  return (
    <>
      <Router>
        <div className="super-container">
          {/* Call the Navbar at the top */}
          <NavBar />
          { /* If the user is logged in, show the Sidebar */
            isLoggedIn ? <Sidebar user={user} /> : null
          }
          {/* Content is rendered inside this container through Route Switching  */}
          <Container maxWidth="lg" className="container">
            <Switch>
              {/* Passing handleLogin method to SignIn and SignUp as props */}
              <Route exact path='/signup' component={SignUp} handleLogin={handleLogin}/>
              <Route exact path='/signin' component={SignIn} handleLogin={handleLogin}/>
              <Route exact path='/join' component={JoinOrganisation} user={user} />
              <Route exact path='/events' component={Events} />
              <Route exact path='/editprofile' component={EditProfile} />
              <Route exact path='/editorganisation' component={EditOrganisation} />
              <Route exact path='/blog' component={Blog} />
              <Route exact path='/contact' component={Contact} />
              <Route exact path='/' component={About}/>
              {/* URL with no matching route calls the 404 component */}
              <Route component={NotFound}/>
            </Switch>
          </Container>
          {/* Call the Footer at the bottom */}
          <Footer />
        </div>
      </Router>
    </>
  );
}