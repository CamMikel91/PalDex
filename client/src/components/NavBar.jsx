import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand navbar-light bg-light px-4">
        <Link className="navbar-brand" to="/">
          PalDex
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/pals">
                Pals
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
