import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

const AdminLoginPage = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [adminName, setAdminName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  React.useEffect(() => {
    const adminId = localStorage.getItem("adminId");
    if (adminId !== null) {
      window.location.href = "/admin/dashboard";
    }
  }, []);

  const handleLogin = async () => {
    if (email === "" || adminName === "" || password === "") {
      alert("Please fill all fields.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:8080/admin/login", {
        emailId: email,
        adminName: adminName,
        password: password,
      });

      if(response.data == "Invalid"){ 
        alert("Invalid credentials");
        return;
      }

      console.log("Response:", response.data);
      await localStorage.setItem("adminId", response.data.adminId);
      await localStorage.setItem("email", email);
      await localStorage.setItem("adminName", adminName);

      // Redirect to admin dashboard
      window.location.href = "/admin/dashboard";
    } catch (error) {
      console.error("Error sending login request:", error);
      alert("There was an error trying to log in. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="stundetLoginMainCont">
          <div className="loginContainer">
            <h1 className="studentLoginTitle">Admin Login</h1>
            <form className="loginFormContainer">
              {isLoading ? (
                <TailSpin />
              ) : (
                <>
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
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="studentLoginInputContainer">
                    <label
                      htmlFor="adminName"
                      className="studentLoginInputLabel"
                    >
                      Admin name
                    </label>
                    <input
                      type="text"
                      className="studentLoginInput"
                      id="adminName"
                      aria-describedby="emailHelp"
                      placeholder="Enter admin name"
                      onChange={(e) => setAdminName(e.target.value)}
                    />
                  </div>
                  <div className="studentLoginInputContainer">
                    <label
                      htmlFor="password"
                      className="studentLoginInputLabel"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="studentLoginInput"
                      id="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleLogin}
                    className="adminSubmitBtn btn btn-primary"
                  >
                    Submit
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLoginPage;
