import React from 'react'

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import { makeStyles } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function About() {
  const classes = useStyles();

  return (
    <div className="about-container">
      <h1>Search for Organizations</h1>
      
      <form className={classes.root} noValidate autoComplete="off">
        <TextField 
          id="outlined-search" 
          label="Search field" 
          type="search" 
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon font-size="large" />
              </InputAdornment>
            ),
          }} 
        />
      </form>

      <hr/>

      <div className="about-text">
        <h2>About</h2>
        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies orci libero, ut sagittis urna cursus non. Nam leo dolor, pulvinar eu mi eu, efficitur porta odio. Donec ut odio ac nisi hendrerit fringilla. Sed cursus suscipit finibus. Donec vitae neque libero. Nullam facilisis ligula nibh, sed interdum justo ultricies quis. Fusce fringilla leo et quam porta cursus. Aliquam erat volutpat. Morbi a consequat risus. Morbi at metus at augue viverra malesuada id eget est. Sed vel quam lobortis, malesuada mi non, ultricies justo. Fusce et lorem at augue pellentesque suscipit.<br/><br/>

        Fusce mollis sem lectus, nec faucibus justo facilisis in. Nulla eget placerat dui. Maecenas ut justo blandit, posuere lacus eu, congue augue. Cras in aliquam quam, id venenatis massa. Suspendisse pulvinar turpis et ligula porta consequat. Aenean dignissim orci non lectus porttitor, id ullamcorper ligula lacinia. Donec dolor ipsum, ultrices non sollicitudin non, blandit commodo ante. Donec sodales eget turpis rutrum dictum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;<br/><br/>

        Integer ultrices dictum urna cursus vestibulum. Nunc et lacus leo. Cras pellentesque venenatis metus vitae consectetur. Nullam ac libero eget augue molestie fermentum. Cras commodo suscipit mauris, ut suscipit ante facilisis nec. Mauris vitae aliquet ipsum, quis fermentum ex. Pellentesque tempor sollicitudin rutrum. Etiam turpis leo, maximus finibus vulputate vehicula, pretium nec lorem. Vivamus commodo magna non ex efficitur lacinia. Nulla finibus a erat vel mollis. Sed lobortis posuere nibh sed aliquam. Maecenas accumsan, leo eu porta suscipit, purus purus fermentum metus, quis consequat tellus dolor maximus dolor. Maecenas mollis, felis id imperdiet rhoncus, libero purus consequat orci, quis ultrices eros neque vitae felis. Suspendisse et ultrices diam. </p>
      </div>

    </div>
  );
}