import React from 'react';

import { Link } from "react-router-dom";

import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';

export default function Footer() {
  return (
    <>
      <div className="footer">

        <div className="foot-left">
          AppointmentNow® Ltd.
        </div>

        <div className="foot-mid">
          <ul>
            <li><Link to={'/'} className="nav-link">About </Link></li>
            <li><Link to={'/contact'} className="nav-link"> Contact </Link></li>
            <li><Link to={'/blog'} className="nav-link"> Blog</Link></li>
          </ul>
        </div>

        <div className="foot-right">
          <InstagramIcon fontSize="large" />
          <TwitterIcon fontSize="large" />
          <FacebookIcon fontSize="large" />
        </div>
        
      </div>
    </>
  );
}

