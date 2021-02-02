import React, { useState } from 'react';
import { Redirect } from "react-router-dom";

// Token Request
import axios from 'axios';

// Styling
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// Logos
import logoLarge from '../assets/logo-large.svg';
import OR from '../assets/OR.svg';

//Icons
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

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

export default function JoinOrganisation(props) {
    const classes = useStyles();

    const [name, setName] = useState('');
    const [nameSearch, setNameSearch] = useState('');
    const [nameSearchResult, setNameSearchResult] = useState('');
    const [nameID, setNameID] = useState('');
    const [nameUnique, setNameUnique] = useState('');
    const [errors, setErrors] = useState('');

    const handleSearch = (event) => {
        event.preventDefault()

        setNameSearch(event.target.value)

        let organization = {
            organization_name: nameSearch
        }

        axios.get('http://localhost:3001/organisation/search', {organization})
        .then(reponse => {
            console.log(reponse.data)
            if (reponse.data.organizations) {
                setNameSearchResult(reponse.data.organizations)
            } else if (!reponse.data.organizations) {
                setNameSearchResult('No results found...')
            } else {
               setErrors(reponse.data.erorrs) 
            }
        })
        .catch(error => console.log('api errors:', error))
    };

    // Checks name uniqueness for Organisation creation
    const handleNameCheck = (event) => {
        event.preventDefault()

        setName(event.target.value)

        let organization = {
            organization_name: name
        }

        axios.get('http://localhost:3001/organisation/namecheck', {organization})
        .then(reponse => {
            console.log(reponse.data)
            if (reponse.data.unique) {
                setNameUnique('true')
            } else if (!reponse.data.unique) {
                setNameUnique('false')
            } else {
               setErrors(reponse.data.erorrs) 
            }
        })
        .catch(error => console.log('api errors:', error))
    };

    const handleCreate = (event) => {
        event.preventDefault()

        let organization = {
            organization_name: name,
            // TODO Make sure you're getting user from somewhere here
            user: props.user.id
        }  
        
        axios.post('http://localhost:3001/organisation/create', {organization})
        .then(reponse => {
            console.log(reponse.data)
            if (reponse.data.created) {
                // TODO Some method to create a route and redirect to new unique URL?
                return <Redirect to={"/" + reponse.data.organization_path} />
            } else {
               setErrors(reponse.data.erorrs) 
            }
        })
        .catch(error => console.log('api errors:', error))
    };

    const handleJoin = (event) => {
        event.preventDefault()

        let organization_role = {
            // TODO Make sure to set the organization ID on submit
            organization: nameID,
            // TODO Make sure you're getting user from somewhere here
            user_id: props.user.id,
            role: 0
        }

        axios.post('http://localhost:3001/organisation/join', {organization_role})
        .then(reponse => {
            console.log(reponse.data)
            if (reponse.data.join) {
                return <Redirect to={"/" + reponse.data.organization} />
            } else {
               setErrors(reponse.data.erorrs) 
            }
        })
        .catch(error => console.log('api errors:', error))
    };

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

            <div className={classes.paper}>

            </div>

            {/* Logo */}
            <div className="logo">
                <img src={logoLarge} alt="Logo large"/>
            </div>

            <div className={classes.paper}>
                <form className={classes.form} noValidate onSubmit={handleJoin}>
                <h2>Join an Organisation</h2>
                    <Grid container spacing={2} justify="center">
                        <Grid item xs={12}>
                        <TextField
                                variant="outlined"
                                fullWidth
                                label="Search"
                                name="name"
                                value={name}
                                onChange={handleSearch}
                                InputProps={{
                                    style: {
                                    backgroundColor: "white"
                                    },
                                }}
                            />
                        {/* TODO for each record in nameSearchResult, list in a new window with a join button type submit */}
                        </Grid>
                    </Grid>
                </form>

                <img src={OR} alt="OR line"/>

                {/* Create Form */}
                <form className={classes.form} noValidate onSubmit={handleCreate}>
                    <h2>Create an Organisation</h2>

                    <Grid container spacing={2} justify="center">
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Organisation Name"
                                name="name"
                                value={name}
                                onChange={handleNameCheck}
                                InputProps={{
                                    style: {
                                    backgroundColor: "white"
                                    },
                                }}
                            />
                            {nameUnique !== ''
                                ? nameUnique === true
                                    ? <><img src={CheckCircleOutlineIcon} alt="Tick Icon" /> Name Available</>
                                    : <><img src={HighlightOffIcon} alt="Tick Icon" /> Name Unavailable</>
                                : null
                            }                  
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </form>

                {/* Error messages */}
                <div>
                {
                    errors ? handleErrors() : null
                }
                </div>
            </div>

        </Container>
    );
}