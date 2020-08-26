import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Instead of using props as the argument, just write the specific props
const Navbar = ({ icon, title }) => {
  return (
    <nav className="navbar bg-primary">
      <h1>
        <Link to="/">
          <i className={icon}></i> {title}
        </Link>
      </h1>
      {/* We use link tags here instead of a tags bc link tags save state (Link from REACT ROUTER DOM*/}
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: 'Insert Title',
  icon: 'fas fa-question-circle',
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Navbar;
