import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

const AdminLoginPage = () => {
  return (
    <>
      <div className="container">
        <div className="stundetLoginMainCont">
          <div className="loginContainer">
            <h1 className="studentLoginTitle">Admin Login</h1>
            <form className="loginFormContainer">
              <div className="studentLoginInputContainer">
                <label htmlFor="email" className="studentLoginInputLabel">
                  Email address
                </label>
                <input
                  type="email"
                  className="studentLoginInput"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div className="studentLoginInputContainer">
                <label htmlFor="password" className="studentLoginInputLabel">
                  Password
                </label>
                <input
                  type="password"
                  className="studentLoginInput"
                  id="password"
                  placeholder="Password"
                />
              </div>
              <Link to="/admin/dashboard">
                <button type="submit" className="adminSubmitBtn btn btn-primary">
                  Submit
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLoginPage;
