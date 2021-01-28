import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import logoLarge from '../assets/logo-large.svg';
import OR from '../assets/OR.svg';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState({});
  const [passwordConfirmation, setPasswordConfirmation] = useState({});
  const [errors, setErrors] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault()
    // const {username, email, password, password_confirmation} = this.state
    let user = {
      username: username,
      email: password,
      password: password,
      passwordConfirmation: passwordConfirmation
    }

  axios.post('http://localhost:3000/login', {user}, {withCredentials: true})
    .then(response => {
      if (response.data.status === 'created') {
        props.handleLogin(response.data)
        redirect()
      } else {
        setErrors(response.data.errors)
      }
    })
    .catch(error => console.log('api errors:', error))
  };

  const redirect = () => {
    history.push('/')
  }

  const handleErrors = () => {
    return (
      <div>
        <ul>
          {errors.map(error => {
            return <li key={error}>{error}</li>
          })}
        </ul>
      </div>
    )
  }

  return (
    <Container component="main" maxWidth="sm" className="curved-container with-logo">
      <CssBaseline />
      <div className="logo">
        <img src={logoLarge} alt="Logo large"/>
      </div>
      
      <div className={classes.paper}>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>

        <img src={OR} alt="OR line"/>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
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
        <div>
          {
            errors ? handleErrors() : null
          }
        </div>
      </div>
    </Container>
  );
}