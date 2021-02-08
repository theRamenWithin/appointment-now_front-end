import React, { useState } from 'react'

// Token Request
import axios from 'axios';

// Components
import ShowErrors from './ShowErrors';

// Styling
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// import Container from '@material-ui/core/Container';

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

export default function EditProfile() {
    const classes = useStyles();

    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        mobile: '',
        email: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        state: '',
        country: '',
        postcode: '',
        errors: ''
    });

      // Sets values
    const handleInputChange = (e) => {
        const {name, value} = e.target
        setValues({...values, [name]: value})
    };

    const handleSubmit = (event) => {
        // Do not re-render on submit
        event.preventDefault()

        let profile = {
            first_name: values.first_name,
            last_name: values.last_name,
            mobile: values.mobile,
            email: values.email,
            address_line_1: values.address_line_1,
            address_line_2: values.address_line_2,
            city: values.city,
            state: values.state,
            country: values.country,
            postcode: values.postcode
        }
    
        // Create a POST request to update profile
        axios.post('%DOMAIN%/profile', {profile}, {withCredentials: true})
        .then(response => {
            if (response.data.updated) {
                setValues(response.data)
            } else {
                setValues({...values, [values.errors]: response.data.errors})
            }
        })
        .catch(error => console.log('api errors:', error))
    };


    return (
        <div className="curved-container">
            <h1>Edit Profile</h1>

            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2} justify="center">

                    <Grid item xs={5}>
                        <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="First Name"
                        name="first_name"
                        value={values.first_name}
                        onChange={handleInputChange}
                        InputProps={{
                            style: {
                                backgroundColor: "white"
                            },
                        }}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Last Name"
                        name="last_name"
                        value={values.last_name}
                        onChange={handleInputChange}
                        InputProps={{
                            style: {
                                backgroundColor: "white"
                            },
                        }}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Mobile No."
                        name="mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        InputProps={{
                            style: {
                                backgroundColor: "white"
                            },
                        }}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                        variant="outlined"
                        fullWidth
                        label="Email Address"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        InputProps={{
                            style: {
                                backgroundColor: "white"
                            },
                        }}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Address Line 1"
                        name="address1"
                        value={values.address_line_1}
                        onChange={handleInputChange}
                        InputProps={{
                            style: {
                                backgroundColor: "white"
                            },
                        }}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                        variant="outlined"
                        fullWidth
                        label="Address Line 2"
                        name="address2"
                        value={values.address_line_2}
                        onChange={handleInputChange}
                        InputProps={{
                            style: {
                                backgroundColor: "white"
                            },
                        }}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="City"
                        name="city"
                        value={values.city}
                        onChange={handleInputChange}
                        InputProps={{
                            style: {
                                backgroundColor: "white"
                            },
                        }}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="State/Province"
                        name="state"
                        value={values.state}
                        onChange={handleInputChange}
                        InputProps={{
                            style: {
                                backgroundColor: "white"
                            },
                        }}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                        variant="outlined"
                        fullWidth
                        label="Postcode"
                        name="postcode"
                        value={values.postcode}
                        onChange={handleInputChange}
                        InputProps={{
                            style: {
                                backgroundColor: "white"
                            },
                        }}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Country"
                        name="country"
                        value={values.country}
                        onChange={handleInputChange}
                        InputProps={{
                            style: {
                                backgroundColor: "white"
                            },
                        }}
                        />
                    </Grid>

                    {/* Contact */}
                    <Grid item xs={10}>
                        <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Telephone No."
                        name="telephone"
                        value={values.phone}
                        onChange={handleInputChange}
                        InputProps={{
                            style: {
                                backgroundColor: "white"
                            },
                        }}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        InputProps={{
                            style: {
                                backgroundColor: "white"
                            },
                        }}
                        />
                    </Grid>

                    {/* Buttons */}
                    <Grid item xs={10}>
                        <Button 
                        type="submit"
                        label="Save"
                        variant="contained"
                        onClick={classes.submit}
                        >
                        Save
                        </Button>
                        <Button 
                        type="reset"
                        label="Reset"
                        variant="contained"
                        onClick={classes.reset}
                        >
                        Reset
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <ShowErrors errors={values.errors} />
        </div>
    );
}