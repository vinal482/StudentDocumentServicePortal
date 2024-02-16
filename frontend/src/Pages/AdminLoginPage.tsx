import React from 'react'
import '../App.css';

const AdminLoginPage = () => {
  return (
    <>
        <div className="container">
            <div className="loginContainer">
                <h1 className="studentLoginTitle">Admin Login</h1>
                <form className="loginFormContainer">
                    <div className="studentLoginInputContainer">
                        <label htmlFor="email" className="studentLoginInputLabel">Email address</label>
                        <input type="email" className="studentLoginInput" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="studentLoginInputContainer">
                        <label htmlFor="password" className="studentLoginInputLabel">Password</label>
                        <input type="password" className="studentLoginInput" id="password" placeholder="Password" />
                    </div>
                    <button type="submit" className="submitBtn btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </>
  )
}

export default AdminLoginPage;
