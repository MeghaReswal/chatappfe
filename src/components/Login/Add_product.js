import "bootstrap/dist/js/bootstrap";
import React, { useState } from "react";
import Nav from "../Navbar/Nav";
import { Link } from "react-router-dom";

import "./styles.css";


const AddProduct = () => {
      const [data, setData] = useState({
        email: "",
        pass: "",
      });

      const handleSubmit = (e) => {
        e.preventDefault();
        const authData = {
          email: data?.email,
          password: data?.pass,
        };
        console.log(authData);
      };
    return (
      <section className="Add_Products">
          <Nav />
        <div className="Login">
          <div className="app">
            <div className="login-form">
              <div className="title">Add Products</div>
              <div className="form">
                <form onSubmit={handleSubmit}>
                  <div className="input-container">
                    <label>Username </label>
                    <input
                      type="email"
                      name="uname"
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                      value={data.email}
                      required
                    />
                  </div>
                  <div className="input-container">
                    <label>Password </label>
                    <input
                      type="password"
                      name="pass"
                      onChange={(e) =>
                        setData({ ...data, pass: e.target.value })
                      }
                      value={data.pass}
                      required
                    />
                  </div>
                  <div className="forgot_pswd">
                    <Link to="/register">
                      <span>Create a New Account</span>
                    </Link>
                  </div>
                  <div className="button-container">
                    <input type="submit" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default AddProduct;
