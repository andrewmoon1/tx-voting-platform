import React from 'react';
import { Link } from 'react-router';
import Auth from './Auth';

const HeaderNav = ({ onLogoutClick }) => {
  return (

    <div className="header-right header-menu">
      <span className="header-item">
        <Link to="/entries" activeClassName="active">Entries</Link>
      </span>
      <span className="header-item">
        <Link to="/about" activeClassName="active">About</Link>
      </span>
      <Auth onLogoutClick={onLogoutClick} />
    </div>
  );
};


module.exports = HeaderNav;
