import React from 'react'

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import logoLarge from '../assets/logo-large.svg';

const usertypes = [
  {
    value: 'Customer',
    label: 'Customer',
  },
  {
    value: 'Provider',
    label: 'Provider',
  },
]

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false,
  });
  const [usertype, setUsertype] = React.useState('Customer');

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword2 = () => {
    setValues({ ...values, showPassword2: !values.showPassword2 });
  };

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  return (
    <div className="curved-container">
      {/* Logo */}
      <img src={logoLarge} alt="Logo Large" width="100px" />

      {/* Email Address */}
      <FormControl variant="outlined">
        <InputLabel htmlFor="component-outlined">Email Address</InputLabel>
        <OutlinedInput id="component-outlined" value={values.email} onChange={handleChange} label="Email Address" />
      </FormControl>

      {/* Password */}
      <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>

      {/* Reneter Password */}
      <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Re-enter Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword2 ? 'text' : 'password2'}
          value={values.password2}
          onChange={handleChange('password2')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password2 visibility"
                onClick={handleClickShowPassword2}
                onMouseDown={handleMouseDownPassword2}
                edge="end"
              >
                {values.showPassword2 ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>

      {/* Customer Select */}
      <TextField
        id="outlined-select-currency"
        select
        label="User Type"
        value={usertype}
        onChange={handleChange}
        variant="outlined"
      >
        {usertypes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}