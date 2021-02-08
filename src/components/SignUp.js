import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";

// Token Request
import axios from 'axios';

// Components
import ShowErrors from './ShowErrors';

// Styling
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// Logos
import logoLarge from '../assets/logo-large.svg';
// import OR from '../assets/OR.svg';

// Custom styling that overrides Material UI defaults
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// Receive handleLogin from App.js
export default function SignUp(props) {
  const classes = useStyles();
  const history = useHistory();

  // State methods for use in the POST request later
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState({});
  const [passwordConfirmation, setPasswordConfirmation] = useState({});
  const [errors, setErrors] = useState('');

  const handleSubmit = (event) => {
    // Do not re-render on submit
    event.preventDefault()

    // Build user for request
    let user = {
      username: username,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation 
    }

    // Create a POST request to sign up
    axios.post('http://localhost:3001/sign_up', {user}, {withCredentials: true})
    .then(response => {
      if (response.data.created) {
        props.handleLogin(response.data)
        // If success, redirect to Organisation Join page
        history.push('/organisation/join')
      } else {
        setErrors(response.data.errors)
      }
    })
    .catch(error => console.log('api errors:', error))
  };

  return (
    <Container component="main" maxWidth="sm" className="curved-container with-logo">

      {/* Logo */}
      <div className="logo">
        <img src={logoLarge} alt="Logo large"/>
      </div>
      
      <div className={classes.paper}>
        {/* Form */}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2} justify="center">

          {/* <img src={OR} alt="OR line"/> */}

          <Grid item xs={12}>
              <TextField
                id="username"
                variant="outlined"
                required
                fullWidth
                type="text"
                label="Username"
                name="username"
                value={username}
                autoComplete="username"
                onChange={e => setUsername(e.target.value)}
                InputProps={{
                    style: {
                      backgroundColor: "white"
                    },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                variant="outlined"
                fullWidth
                type="text"
                label="Email Address"
                name="email"
                value={email}
                autoComplete="email"
                onChange={e => setEmail(e.target.value)}
                InputProps={{
                    style: {
                      backgroundColor: "white"
                    },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                value={password}
                type="password"
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                InputProps={{
                    style: {
                      backgroundColor: "white"
                    },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="confpassword"
                variant="outlined"
                required
                fullWidth
                name="passwordConfirmation"
                label="Confirm Password"
                value={passwordConfirmation}
                type="password"
                onChange={e => setPasswordConfirmation(e.target.value)}
                InputProps={{
                    style: {
                      backgroundColor: "white"
                    },
                }}
              />
            </Grid>
          </Grid>

          <Button
            id="submit"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item>
              Already have an account? <Link to={'/signin'} variant="body2">Sign in</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <ShowErrors errors={errors} />
    </Container>
  );
}