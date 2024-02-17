import React from "react";
import "../App.css";

const StudentLoginPage = () => {
  return (
    <>
      <div className="container">
        <div className="stundetLoginMainCont">
          <div className="loginContainer">
            <h1 className="studentLoginTitle">Student Login</h1>
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
                <label htmlFor="name" className="studentLoginInputLabel">
                  Email address
                </label>
                <input
                  type="text"
                  className="studentLoginInput"
                  id="name"
                  aria-describedby="nameHelp"
                  placeholder="Enter your name"
                />
              </div>
              <div className="studentLoginInputContainer">
                <label htmlFor="contactNo" className="studentLoginInputLabel">
                  Contact number
                </label>
                <input
                  type="number"
                  className="studentLoginInput"
                  id="contactNo"
                  aria-describedby="nameHelp"
                  placeholder="Enter your contact number"
                />
              </div>
              <button type="submit" className="submitBtn btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentLoginPage;
