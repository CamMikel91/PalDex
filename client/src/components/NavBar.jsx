import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./css/navBar.css";
import "../app.css";

class NavBar extends Component {
  render() {
    const { user } = this.props;
    return (
      <nav className="navbar bg-dark navbar-expand px-4">
        <Link className="navbar-brand" to="/">
          PalDex
        </Link>
        <div className="navbar bg-dark" id="navbarNav">
          <ul className="navbar-nav">
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/pals">
                  Pals
                </Link>
              </li>
            )}
            {!user && (
              <>
                <li>
                  <Link className="nav-link" to="/users/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/users/register">
                    Register
                  </Link>
                </li>
              </>
            )}
            {user && (
              <li>
                <Link className="nav-link" to="/users/logout">
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
