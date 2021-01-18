import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";

const NavBar = ({ authenticated, setAuthenticated, setCurrentUser, currentUser }) => {
  console.log(currentUser);
  if (authenticated) {

    return (
      <>
        <div className="navbar">
          <div className="title__container">
            <NavLink className="navlinks" to="/" exact={true}><h1 className="title">Spark</h1></NavLink>
            {/* <h1 className="title">Spark</h1> */}
          </div>
          <nav className="navbar-links">
            <ul className="navbar-links__list">
              <li>
                <NavLink className="navlinks" to="/" exact={true} activeClassName="active">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className="navlinks" to="/decks" exact={true} activeClassName="active">
                  Decks
                </NavLink>
              </li>
              <li>
                <NavLink className="navlinks" to="/users" exact={true} activeClassName="active">
                  Users
                </NavLink>
              </li>
            </ul>
          </nav>
          <nav className="navbar-links__right">
            <ul className="navbar-links__right-list">
              <li>
                <NavLink className="navlinks" to="/login" exact={true} activeClassName="active">
                  Login
                    </NavLink>
              </li>
              <li>
                <NavLink className="navlinks" to={"/profile/"+ currentUser.id} exact={true} activeClassName="active">
                  Account
                    </NavLink>
              </li>
              <li>
                <LogoutButton setAuthenticated={setAuthenticated} />
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="navbar">
          <div className="title__container">
            <NavLink className="navlinks" to="/" exact={true}><h1 className="title">Spark</h1></NavLink>
            {/* <h1 className="title">Spark</h1> */}
          </div>
          <nav className="navbar-links">
            <ul className="navbar-links__list">
              <li>
                <NavLink className="navlinks" to="/decks" exact={true} activeClassName="active">
                  Decks
                </NavLink>
              </li>
              <li>
                <NavLink className="navlinks" to="/users" exact={true} activeClassName="active">
                  Users
                </NavLink>
              </li>
            </ul>
          </nav>
          <nav className="navbar-links__right">
            <ul className="navbar-links__right-list">
              <li>
                <NavLink className="navlinks" to="/login" exact={true} activeClassName="active">
                  Login
                    </NavLink>
              </li>
              <li>
                <NavLink className="navlinks" to="/sign-up" exact={true} activeClassName="active">
                  Sign Up
                    </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  }
}

export default NavBar;
