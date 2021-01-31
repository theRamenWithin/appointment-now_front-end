import React from 'react';

// Token Request
import axios from 'axios';

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

  const ListItemLink = (props) => {
    return <ListItem button component="a" {...props} />;
  }

  const ListItemLinkLogout = (props) => {
    return <ListItem button onClick={handleClick} component="a" {...props} />;
  }

  const handleClick = () => {
    axios.delete('http://localhost:3001/logout', {withCredentials: true})
    .then(response => {
      props.handleLogout()
      props.history.push('/')
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
            Welcome back, {props.username}.
          </div>
          <div className="drawerBottom">
            <List>
              <ListItemLink href="profile">
                <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemLink>

              <ListItemLink href="events">
                <ListItemIcon><DateRangeIcon /></ListItemIcon>
                <ListItemText primary="Events" />
              </ListItemLink>

              <ListItemLink href="history">
                <ListItemIcon><HistoryIcon /></ListItemIcon>
                <ListItemText primary="History" />
              </ListItemLink>

              <ListItemLink href="editorganisation">
                <ListItemIcon><BusinessIcon /></ListItemIcon>
                <ListItemText primary="Organisation" />
              </ListItemLink>
            </List>
            <Divider />
            <List>
              <ListItemLink href="settings">
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemLink>

              <ListItemLinkLogout href="logout">
                <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemLinkLogout>
            </List>
          </div>
        </div>
      </Drawer>
    </div>
  );
}