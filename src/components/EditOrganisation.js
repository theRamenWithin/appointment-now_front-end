import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { DropzoneArea } from 'material-ui-dropzone';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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
  const [open, setOpen] = React.useState(false);

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
              id="name"
              label="Organisation Name"
              name="name"
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
              id="description"
              label="Organisation Description"
              name="description"
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
              id="address1"
              label="Address Line 1"
              name="address1"
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
              id="address2"
              label="Address Line 2"
              name="address2"
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
              id="city"
              label="City"
              name="city"
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
              id="state"
              label="State/Province"
              name="state"
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
              id="postcode"
              label="Postcode"
              name="postcode"
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
              id="country"
              label="Country"
              name="country"
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
              id="country"
              label="Country"
              name="country"
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
              id="telephone"
              label="Telephone No."
              name="telephone"
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
              id="email"
              label="Email Address"
              name="email"
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
            acceptedFiles={['image/*']}
            dropzoneText={"Upload a banner image. Drag and drop an image here or click"}
            onChange={(files) => console.log('Files:', files)}
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
            <h2 id="transition-modal-title">Title</h2>
            <p id="transition-modal-description">description</p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}