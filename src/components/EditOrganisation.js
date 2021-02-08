import React, { useState } from 'react';

// Token Request
import axios from 'axios';

// Components
import ShowErrors from './ShowErrors';

// Styling
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// import { DropzoneArea } from 'material-ui-dropzone';

// Images
import Banner from '../assets/modal-org-splash.jpg';

// Custom styling that overrides Material UI defaults
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    borderRadius: '15px',
    width: '70vw',
    height: '95vh',
    boxShadow: theme.shadows[5],
  },
  banner: {
    width: '100%',
    maxHeight: '250px',
    overflow: 'hidden',
    padding: '0',
    borderRadius: '12px 12px 0 0',
  },
  modaladdress: {
    backgroundColor: 'rgba(78, 197, 230, 0.20)',
    height: '100%',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function EditOrganisation() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    organization_name: '',
    description: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postcode: '',
    country: '',
    phone: '',
    email: '',
    image: '',
    providers: '',
    errors: ''
  });

  // Sets values
  const handleInputChange = (e) => {
    const {name, value} = e.target
    setValues({...values, [name]: value})
  };

  // Updates the organisation record in the back-end on submit
  const handleSubmit = () => {
    axios.post(process.env.REACT_APP_DOMAIN + '/organisation/edit', {values}, {withCredentials: true})
    .then(response => {
      if (response.data.updated) {

      } else {
        setValues({...values, [values.errors]: response.data.errors})
      }
    })
    .catch(error => console.log('api errors:', error))
  };

  // Opens the modal
  const handleOpen = () => {
    setOpen(true);
  };

  // Closes the modal
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="curved-container">
      <h1>Edit Organization</h1>

      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2} justify="center">

          {/* Title & Description */}
          <Grid item xs={10}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Organisation Name"
              name="organization_name"
              value={values.organization_name}
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
              multiline
              rows={4}
              label="Organisation Description"
              name="description"
              value={values.description}
              onChange={handleInputChange}
              InputProps={{
                  style: {
                    backgroundColor: "white"
                  },
              }}
            />
          </Grid>

          {/* Address */}
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
          {/* Banner Image */}
          <Grid item xs={10}>
          {/* TODO Need to figure out the correct onChange method for image files */}
          {/* <DropzoneArea
            name="image"
            acceptedFiles={['image/*']}
            dropzoneText={"Upload a banner image. Drag and drop an image here or click"}
            onChange={handleInputChange}
          /> */}
          </Grid>

          <h1>Manage Providers</h1>

          {/* TODO All the logic for bring up associated providers, adding and deleting them */}
        
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
            <Button 
              type="button" 
              variant="contained"
              onClick={handleOpen}
            >
              Show Customer View
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Show Customer View Modal */}
      {/* TODO Move this to a component? */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Grid spacing={2} >
              {/* Banner image */}
              <Grid xs={12}>
                <img src={Banner} alt="org banner" className={classes.banner}></img>
              </Grid>
              {/* Left container */}
              <Grid item xs={4} className={classes.modaladdress}>
                {/* Google Maps */}
                <iframe
                  title="Organisation Location"
                  width="100%"
                  height="100%"
                  frameborder="0"
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDsw_-i9Nf1d77G0BBtsNT6TIbPk2tHEZQ
                    &q={values.address_line_1}">
                </iframe>
                <ul className="org-modal">
                  <li>Address Line 1: {values.address_line_1}</li>
                  <li>Address Line 2: {values.address_line_2}</li>
                  <li>City: {values.city}</li>
                  <li>State/Province: {values.state}</li>
                  <li>Postcode: {values.postcode}</li>
                  <li>Country: {values.country}</li>
                  <li>Telephone No.: {values.phone}</li>
                  <li>Email Address: <a href={"mailto:" + values.email}>{values.email}</a></li>
                </ul>
              </Grid>
              {/* Right container */}
              <Grid item xs={8}>
                <h1>{values.organization_name}</h1>
                <p>{values.description}</p>
                <strong>Providers</strong>
                <Grid container spacing={3}>
                 {/* Provider org cards */}
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
      <ShowErrors errors={values.errors} />
    </div>
  );
}