import React, { Component } from "react";
import  {NavLink} from 'react-router-dom';

export class Navbar extends Component {
  render() {
    return (
      <>
        <nav
          className="navbar navbar-expand-lg text-black"
          style={{ backgroundColor: "#e3f2fe" }}
        >
          <div className="container-fluid ">
            <NavLink className="navbar-brand fs-1 fw-bold" to="/">
              AzaadNews
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0  ">
                <li className="nav-item  px-">
                  <NavLink className="nav-link active fs-3 text-success " aria-current="page" to="/">
                    Home
                  </NavLink>
                </li>
                
                <li className="nav-item px-2">
                  <NavLink className="nav-link fs-3 text-success" to="/business">
                    Business
                  </NavLink>
                </li>
                <li className="nav-item px-2">
                <NavLink className="nav-link fs-3 text-success" to="/entertainment">
                  Entertainment
                </NavLink>
              </li>
                <li className="nav-item px-2">
                  <NavLink className="nav-link fs-3 text-success" to="/general">
                    General
                  </NavLink>
                </li>
                <li className="nav-item px-2">
                <NavLink className="nav-link fs-3 text-success" to="/health">
                  Health
                </NavLink>
              </li>
              <li className="nav-item px-2">
                  <NavLink className="nav-link fs-3 text-success" to="/science">
                    Science
                  </NavLink>
                </li>
                <li className="nav-item px-2">
                  <NavLink className="nav-link fs-3 text-success" to="/sports">
                    Sports
                  </NavLink>
                </li>
                <li className="nav-item px-2">
                  <NavLink className="nav-link fs-3 text-success" to="/technology">
                    Technology
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
