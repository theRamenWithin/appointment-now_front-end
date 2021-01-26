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
import NotFound from './components/404.js';

// Styling
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function App() {
  return (
    <>
      <Router>
        <div>
          <CssBaseline />
          <NavBar />
          <Container maxWidth="lg">
            <Typography component="div" style={{ backgroundColor: '#FFF', borderLeft: '2vw solid #4EC5E6', borderRight: '2vw solid #4EC5E6', height: '100vh', padding: '20px' }}>
              <Switch>
                <Route exact path='/signup' component={SignUp} />
                <Route exact path='/signin' component={SignIn} />
                <Route exact path='/blog' component={Blog} />
                <Route exact path='/contact' component={Contact} />
                <Route exact path='/' component={About} />
                <Route component={NotFound}/>
              </Switch>
            </Typography>
          </Container>
          <Footer />
        </div>
      </Router>
    </>
  );
}