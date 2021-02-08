import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";

// Token Request
import axios from 'axios';

// Components
import CustomPaginationActionsTable from './SearchResults';
import ShowErrors from './ShowErrors';

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

    const [values, setValues] = useState({
        nameSearch: '',
        nameCheck: ''
    });
    const [nameUnique, setNameUnique] = useState('')
    const [searchResult, setSearchResult] = useState('')

    const [errors, setErrors] = useState('')

    const handleInputChange = e => {
        const {name, value} = e.target
        setValues({...values, [name]: value})
    };
    
    // Search for organisations
    useEffect(() => {
        if (values.nameSearch !== '') {
            let organizationSearch = {
                organization_name: values.nameSearch
            }
        
            axios.post('%DOMAIN%/organisation/search', {organizationSearch})
            .then(response => {
                if (response.data.organizations) {
                    setSearchResult(response.data.organizations)
                } else {
                    setErrors(response.data.erorrs) 
                }
            })
            .catch(error => console.log('api errors:', error))
        } else {
            setSearchResult('')
        }
    }, [values.nameSearch]);

    // Checks for name uniqueness
    useEffect(() => {
        if (values.nameCheck !== '') {
            let organizationUnique = {
                organization_name: values.nameCheck
            }
        
            axios.post('%DOMAIN%/organisation/namecheck', {organizationUnique})
            .then(response => {
                if (response.data.unique) {
                    setNameUnique(response.data.unique)
                } else if (!response.data.unique) {
                    setNameUnique(response.data.unique)
                } else {
                    setErrors(response.data.erorrs) 
                }
            })
            .catch(error => console.log('api errors:', error))
        } else {
            setNameUnique('')
        }
    }, [values.nameCheck]);

    const handleCreate = (e) => {
        e.preventDefault()

        let organization = {
            organization_name: values.nameCheck
        }  
        
        axios.post('%DOMAIN%/organisation/create', {organization})
        .then(response => {
            console.log(response.data)
            if (response.data.created) {
                props.setRoutes(props.routes << response.data.organization_path)
                return <Redirect to={"/" + response.data.organization_path} />
            } else {
               setErrors(response.data.erorrs) 
            }
        })
        .catch(error => console.log('api errors:', error))
    };

    const handleJoin = (org_name, org_id) => {
        let organization_role = {
            organization_id: org_id,
            user_id: props.userID,
            role: 0
        }

        axios.post('%DOMAIN%/organisation/join', {organization_role})
        .then(response => {
            console.log(response.data)
            if (response.data.joined) {
                <Redirect to={"/" + org_name.trim().toLowerCase().replace(/[^a-zA-Z0-9 -]/, "").replace(/\s/g, "-")} />
            } else {
               setErrors(response.data.erorrs) 
            }
        })
        .catch(error => console.log('api errors:', error))
    };



    return (
        <Container component="main" maxWidth="sm" className="curved-container with-logo">

            <div className={classes.paper}>

            </div>

            {/* Logo */}
            <div className="logo">
                <img src={logoLarge} alt="Logo large"/>
            </div>

            <div className={classes.paper}>
                <form className={classes.form} noValidate>
                <h2>Join an Organisation</h2>
                    <Grid container spacing={2} justify="center">
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Search"
                            name="nameSearch"
                            value={values.nameSearch}
                            onChange={handleInputChange}
                            InputProps={{
                                style: {
                                backgroundColor: "white"
                                },
                            }}
                        />
                        {
                            searchResult.length > 0 ?
                            <CustomPaginationActionsTable searchResult={searchResult} handleJoin={handleJoin} parent={'join'} />
                            : null
                        }
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
                                name="nameCheck"
                                value={values.nameCheck}
                                onChange={handleInputChange}
                                InputProps={{
                                    style: {
                                    backgroundColor: "white"
                                    },
                                }}
                            />
                        </Grid>
                        <Grid container justify="flex-start" alignItems="center">
                            {nameUnique !== ''
                                ? nameUnique === true
                                    ? <><CheckCircleOutlineIcon /> Name Available</>
                                    : <><HighlightOffIcon /> Name Unavailable</>
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
            </div>
            
            <ShowErrors errors={errors} />

        </Container>
    );
}