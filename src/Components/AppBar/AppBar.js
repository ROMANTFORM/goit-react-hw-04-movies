import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../routes';

const AppBar = () => {
    return (

    <div className="nav-container">
        <ul className="nav-list">
        <li className="nav-list__item">
          <NavLink
            exact
            to={routes.home}
            className="NavLink"
            activeClassName="NavLink--active"
          >Home</NavLink>
        </li>
        <li className="nav-list__item">
          <NavLink
            to={routes.searchMovie}
            className="NavLink"
            activeClassName="NavLink--active"
          >Movies</NavLink>
        </li>
      </ul>
      </div>
)
};

export default AppBar;