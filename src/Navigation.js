import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
// import "./Navigation.scss";
import UserContext from "./UserContext";

function Navigation({ logout }) {
    // * getting the user from the UserContext context, this is used for conditional rendering --> {user?loggedInNav:loggedOutNav}
  const { currentUser } = useContext(UserContext);
    // * one nav for a logged in user
  function loggedInNav() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/companies">
            Companies
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/jobs">
            Jobs
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/profile">
            Profile
          </NavLink>
        </li>
        <li className="nav-item">
          {/* brilliant! add the logout function as click handler on the logout nav button! so much less hustle */}
          <Link className="nav-link" to="/" onClick={logout}>
            Log out
          </Link>
        </li>
      </ul>
    );
  }
//  * another nav for when there's no user
  function loggedOutNav() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
      </ul>
    );
  }

  return (
    <nav className="Navigation navbar navbar-expand-md">
      <Link className="navbar-brand" to="/">
        Jobly
      </Link>
      {currentUser ? loggedInNav() : loggedOutNav()}
    </nav>
  );
}

export default Navigation;
