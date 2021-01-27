import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
              <Route exact path='/editorganisation' component={EditOrganisation} />

              <Route exact path='/signup' component={SignUp} />
              <Route exact path='/signin' component={SignIn} />
              <Route exact path='/blog' component={Blog} />
              <Route exact path='/contact' component={Contact} />
              <Route exact path='/' component={About} />
              <Route component={NotFound}/>
            </Switch>
          </Container>
          <Footer />
        </div>
      </Router>
    </>
  );
}