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
import Organisation from './components/Organisation';
import JoinOrganisation from './components/JoinOrganisation';

// Sidebar links
import Events from './components/Events';
import EventHistory from './components/History';
import EditProfile from './components/EditProfile';
import EditOrganisation from './components/EditOrganisation';
import Settings from './components/Settings';

// 404 page
import NotFound from './components/404.js';

// Styling
import './App.css';
import Container from '@material-ui/core/Container';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [userID, setUserID] = useState('');
  const [routes, setRoutes] = useState([]);

  // Axios request for getting organizational routes
  useEffect(() => {
    axios.get(process.env.REACT_APP_DOMAIN + '/organisation/org_routes')
    .then(response => { setRoutes(response.data.organizations_routes) })
    .catch(error => console.log('api errors:', error))
  },[])

  const routesComponents = routes.map(route => {
    return <Route
      key={route} 
      exact path={'/' + route} 
      render={(props) => ( 
        <Organisation {...props} route={route} />
      )}
    />
  })

  // Axios GET request to API method to check if there is a logged in user
  const loginStatus = () => {
    axios.get(process.env.REACT_APP_DOMAIN + '/logged_in', {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        handleLogin(response.data.user)
      } else {
        handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  }

  // Sets isLoggedIn to True and user to user data received from Rails
  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setUserID(data.id);
    setUser(data.username);
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
          {/* If the user is logged in, show the Sidebar */}
          {
            isLoggedIn ? <Sidebar user={user} handleLogout={handleLogout} /> : null
          }
          {/* Content is rendered inside this container through Route Switching  */}
          <Container maxWidth="lg" className="container">
            <Switch>
              {/* Passing handleLogin method to SignIn and SignUp as props */}
              <Route 
                exact path='/signup'
                render={(props) => (
                  <SignUp {...props} handleLogin={handleLogin}/>
                )}
              />
              <Route 
                exact path='/signin'
                render={(props) => (
                  <SignIn {...props} handleLogin={handleLogin}/>
                )}
              />
              <Route 
                exact path='/organisation/join' 
                render={(props) => (
                  <JoinOrganisation {...props} userID={userID} routes={routes} setRoutes={setRoutes}/>
                )}
              />
              <Route exact path='/events' component={Events} />
              <Route exact path='/profile' component={EditProfile} />
              <Route exact path='/history' component={EventHistory} />
              <Route exact path='/settings' component={Settings} />
              <Route exact path='/organisation/edit' component={EditOrganisation} />
              <Route exact path='/blog' component={Blog} />
              <Route exact path='/contact' component={Contact} />
              <Route exact path='/' component={About}/>

              {/* Organisation routes */}
              {routesComponents}

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