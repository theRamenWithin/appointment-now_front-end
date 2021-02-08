import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";

// Token Request
import axios from 'axios';

// Components
import ShowErrors from './ShowErrors';

// Styling
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
    margin: theme.spacing(2, 0, 3),
  },
}));

// Receive handleLogin from App.js
export default function SignIn(props) {
  const classes = useStyles();
  const history = useHistory();
  
  // State methods for use in the POST request later
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

  const handleSubmit = (event) => {
    // Do not re-render on submit
    event.preventDefault()

    // Build user for request
    let user = {
      username: username,
      email: email,
      password: password
    }

    // Create a POST request to login
    axios.post('%DOMAIN%/login', {user}, {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        props.handleLogin(response.data)
        history.push('/')
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
            <Grid item xs={12}>
              <TextField
                id="username"
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

            {/* <img src={OR} alt="OR line"/> */}
            
            <Grid item xs={12}>
              <TextField
                id="email"
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
              <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
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
            Sign In
          </Button>

          <Grid container>
            <Grid item xs>
              {/* TODO Create this component or make it a method */}
              <Link to={'/resetpassword'} variant="body2">Forgot password?</Link>
            </Grid>
            <Grid item>
              Don't have an account? <Link to={'/signup'} variant="body2">Sign Up</Link>
            </Grid>
          </Grid>
        </form>

        {/* Error messages */}

        <ShowErrors errors={errors} />        
      </div>
    </Container>
  );
}