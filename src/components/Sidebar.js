import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from "react-router-dom";

// Token Request
import axios from 'axios';

// Components
import ShowErrors from './ShowErrors';

// Stlying
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// Sidebar
import Drawer from '@material-ui/core/Drawer';

// List Components
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Top Icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DateRangeIcon from '@material-ui/icons/DateRange';
import HistoryIcon from '@material-ui/icons/History';
import BusinessIcon from '@material-ui/icons/Business';
// Bottom Icons
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Avatar from '@material-ui/core/Avatar';

const drawerWidth = '12vw';
const minDrawerWidth = '10vw';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    minWidth: minDrawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    minWidth: minDrawerWidth,
  },
  drawerContainer: {
    paddingTop: '3rem',
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function ClippedDrawer(props) {
  const classes = useStyles();
  const history = useHistory();

  const [errors, setErrors] = useState('');

  const ListItemLink = (props) => {
    return <ListItem button component="a" {...props} />;
  }

  const ListItemLinkLogout = (props) => {
    return <ListItem button onClick={handleClick} component="a" {...props}/>;
  }

  // Handles the logout process
  const handleClick = () => {
    axios.delete(process.env.REACT_APP_DOMAIN + '/logout', {withCredentials: true})
    .then(response => {
      console.log(response.data)
      if (response.data.logged_out) {
        props.handleLogout()
        history.push('/')
      } else {
        setErrors(response.data.errors)
      }
    })
    .catch(error => console.log(error))
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerContainer}>
          <div className="drawerTop">
            <Avatar src="/broken-image.jpg" className={classes.large} />
            Welcome back, {props.user}.
          </div>
          <div className="drawerBottom">
            {/* Links */}
            <List>
              <ListItemLink component={RouterLink} to="/profile">
                <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemLink>

              <ListItemLink component={RouterLink} to="/events">
                <ListItemIcon><DateRangeIcon /></ListItemIcon>
                <ListItemText primary="Events" />
              </ListItemLink>

              <ListItemLink component={RouterLink} to="/history">
                <ListItemIcon><HistoryIcon /></ListItemIcon>
                <ListItemText primary="History" />
              </ListItemLink>

              <ListItemLink component={RouterLink} to="/organisation/edit">
                <ListItemIcon><BusinessIcon /></ListItemIcon>
                <ListItemText primary="Organisation" />
              </ListItemLink>
            </List>
            <Divider />
            <List>
              <ListItemLink component={RouterLink} to="/settings">
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemLink>

              <ListItemLinkLogout>
                <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemLinkLogout>
            </List>
          </div>
          <ShowErrors errors={errors} />
        </div>
      </Drawer>
    </div>
  );
}