import React, { useState, useEffect } from 'react'

// Token Request
import axios from 'axios';

// Components
import CustomPaginationActionsTable from './SearchResults';
import ShowErrors from './ShowErrors';

// Styling
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

// Icons
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '100%',
  },
  search: {
    backgroundColor: "white",
  },
}));

export default function About() {
  const classes = useStyles();
  const [values, setValues] = useState({
    nameSearch: ''
  });
  const [searchResult, setSearchResult] = useState('')
  const [errors, setErrors] = useState('')

  const handleInputChange = e => {
    const {name, value} = e.target
    setValues({...values, [name]: value})
  };
  
  // When the search value is updated by typing in the search bar, request LIKE organisations
  useEffect(() => {
    if (values.nameSearch !== '') {
      let organizationSearch = {
          organization_name: values.nameSearch
      }
    
      axios.post(process.env.REACT_APP_DOMAIN + '/organisation/search', {organizationSearch})
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

  return (
    <div className="about-container curved-container">
      <h1>Search for Organizations</h1>
      
      {/* Search form */}
      <FormControl className={classes.margin} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-amount">Search</InputLabel>
        <OutlinedInput
          className={classes.search}
          id="outlined-adornment-amount"
          name="nameSearch"
          value={values.searchName}
          onChange={handleInputChange}
          startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
          labelWidth={55}
        />
      </FormControl>

      {/* Show search result container if there are results to show */}
      {searchResult.length > 0 ?
      <CustomPaginationActionsTable searchResult={searchResult} parent={'about'} />
      : null}

      <hr/>

      <div className="about-text">
        <h2>About</h2>
        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies orci libero, ut sagittis urna cursus non. Nam leo dolor, pulvinar eu mi eu, efficitur porta odio. Donec ut odio ac nisi hendrerit fringilla. Sed cursus suscipit finibus. Donec vitae neque libero. Nullam facilisis ligula nibh, sed interdum justo ultricies quis. Fusce fringilla leo et quam porta cursus. Aliquam erat volutpat. Morbi a consequat risus. Morbi at metus at augue viverra malesuada id eget est. Sed vel quam lobortis, malesuada mi non, ultricies justo. Fusce et lorem at augue pellentesque suscipit.<br/><br/>

        Fusce mollis sem lectus, nec faucibus justo facilisis in. Nulla eget placerat dui. Maecenas ut justo blandit, posuere lacus eu, congue augue. Cras in aliquam quam, id venenatis massa. Suspendisse pulvinar turpis et ligula porta consequat. Aenean dignissim orci non lectus porttitor, id ullamcorper ligula lacinia. Donec dolor ipsum, ultrices non sollicitudin non, blandit commodo ante. Donec sodales eget turpis rutrum dictum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;<br/><br/>

        Integer ultrices dictum urna cursus vestibulum. Nunc et lacus leo. Cras pellentesque venenatis metus vitae consectetur. Nullam ac libero eget augue molestie fermentum. Cras commodo suscipit mauris, ut suscipit ante facilisis nec. Mauris vitae aliquet ipsum, quis fermentum ex. Pellentesque tempor sollicitudin rutrum. Etiam turpis leo, maximus finibus vulputate vehicula, pretium nec lorem. Vivamus commodo magna non ex efficitur lacinia. Nulla finibus a erat vel mollis. Sed lobortis posuere nibh sed aliquam. Maecenas accumsan, leo eu porta suscipit, purus purus fermentum metus, quis consequat tellus dolor maximus dolor. Maecenas mollis, felis id imperdiet rhoncus, libero purus consequat orci, quis ultrices eros neque vitae felis. Suspendisse et ultrices diam. </p>
      </div>
      <ShowErrors errors={errors} />
    </div>
  );
}