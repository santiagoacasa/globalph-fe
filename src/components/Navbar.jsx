import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = props => {
  let authLink = (
    <>
    <li></li>
      <li className="nav-item">
        <NavLink to="/signup" className="nav-link">
          Signup
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/login" className="nav-link">
          Login
        </NavLink>
      </li>
    </>
  );

  if (props.user) {
    authLink = (
      <>
      <li className="nav-item">
        Hi {props.user.firstName}!
      </li>
      <li className="nav-item">
        <NavLink to="/profile" className="nav-link">
         Profile
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/profile/edit" className="nav-link">
         Edit my profile
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/logout" className="nav-link">
          Logout
        </NavLink>
      </li>
      </>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink to="/" className="nav-link">
        <img style={{height: "48px"}} src={`${process.env.PUBLIC_URL}/assets/images/brand-icon.png`} alt=""/>
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto text-right">{authLink}</ul>
      </div>
    </nav>
  );
};

export default Navbar;
