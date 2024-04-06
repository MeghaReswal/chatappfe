import React from "react";

import "./nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <div className="header">
        <div className=" container desktopp_menu">
          <nav className="header_navbar">
            <div className="logo">
              <div>
                Chat <span>App</span>
              </div>
            </div>
            <div className="menu_bar">
              <div className="nav_link">
                <ul>
                  <li>
                    <Link to="/">Home </Link>
                  </li>

                  <li>
                    <Link to="/chat">chat </Link>
                  </li>

                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                </ul>

                <div className="apn_btn ">
                  <Link>
                    <i className="bi bi-person-fill"></i>
                  </Link>
                </div>
                <div className="apn_btn ">
                  <Link>
                    <i className="bi bi-bag-fill"></i>
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Nav;
