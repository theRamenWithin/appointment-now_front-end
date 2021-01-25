import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function SimpleContainer() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography component="div" style={{ backgroundColor: '#FFF', borderLeft: '2vw solid #4EC5E6', borderRight: '2vw solid #4EC5E6', height: '100vh' }} />
      </Container>
    </>
  );
}