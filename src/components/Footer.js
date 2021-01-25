import React from 'react';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function Footer() {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/" onClick={handleClick}>
        About
      </Link>
      <Link color="inherit" href="/contact" onClick={handleClick}>
        Contact
      </Link>
      <Link color="inherit" href="/blog" onClick={handleClick}>
        Blog
      </Link>
    </Breadcrumbs>
  );
}