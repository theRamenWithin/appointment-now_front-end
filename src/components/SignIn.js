import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";

// Styling
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// Logos
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
    margin: theme.spacing(2, 0, 3),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const history = useHistory();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault()
    // const {username, email, password, password_confirmation} = this.state
    let user = {
      username: username,
      email: password,
      password: password
    }

  axios.post('http://localhost:3000/login', {user}, {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
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

      {/* Logo */}
      <div className="logo">
        <img src={logoLarge} alt="Logo large"/>
      </div>
      
      <div className={classes.paper}>
        {/* Form */}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
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

            <img src={OR} alt="OR line"/>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
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
              <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
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
            Sign In
          </Button>

          <Grid container>
            <Grid item xs>
              <Link to={'/resetpassword'} variant="body2">Forgot password?</Link>
            </Grid>
            <Grid item>
              Don't have an account? <Link to={'/signup'} variant="body2">Sign Up</Link>
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