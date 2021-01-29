import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { DropzoneArea } from 'material-ui-dropzone';

import Banner from '../assets/modal-org-splash.jpg';

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
    maxHeight: '150px',
    overflow: 'hidden',
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
    name: '',
    description: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postcode: '',
    country: '',
    telephone: '',
    email: '',
    image: ''
  });

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    
    <div className="curved-container">
      <h1>Edit Organization</h1>

      <form className={classes.form} noValidate>
        <Grid container spacing={2} justify="center">

          {/* Title & Description */}
          <Grid item xs={10}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Organisation Name"
              name="name"
              value={values.name}
              onChange={handleChange}
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
              onChange={handleChange}
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
              value={values.address1}
              onChange={handleChange}
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
              value={values.address2}
              onChange={handleChange}
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
              onChange={handleChange}
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
              label="State/Province"
              name="state"
              value={values.state}
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              value={values.telephone}
              onChange={handleChange}
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
              onChange={handleChange}
              InputProps={{
                  style: {
                    backgroundColor: "white"
                  },
              }}
            />
          </Grid>
          {/* Banner Image */}
          <Grid item xs={10}>
          <DropzoneArea
            name="image"
            acceptedFiles={['image/*']}
            dropzoneText={"Upload a banner image. Drag and drop an image here or click"}
            onChange={handleChange}
          />
          </Grid>
        </Grid>

        <h1>Manage Providers</h1>


      
        <div className="edit-org-buttons">
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
        </div>
      </form>

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
            <Grid container spacing={2} >
              <Grid item xs={12}>
                <img src={Banner} alt="org banner" className={classes.banner}></img>
              </Grid>
              <Grid item xs={4} className={classes.modaladdress}>
              <iframe
                title="Organisation Location"
                width="500"
                height="500"
                frameborder="0"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDsw_-i9Nf1d77G0BBtsNT6TIbPk2tHEZQ
                  &q=Sydney">
              </iframe>
                <ul>
                  <li>Address Line 1: {values.address1}</li>
                  <li>Addres Line 2: </li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </Grid>
              <Grid item xs={8}>
                
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}