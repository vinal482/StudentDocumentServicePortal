import React from "react";
import { MdOutlineLogout } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import Logo from "../Assets/DA_logo.png";

const StudentNavBar = () => {
  const logoutHandler = async () => {
    localStorage.removeItem("studentId");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    window.location.href = "/student/login";
  };
  return (
    <div className="studentNavBar">
      <div className="studentNavBarContainer">
        <div className="studentNavBarTitle">
          <Link style={{ textDecoration: "none" }} to="/student/DSD">
            <img src={Logo} alt="" style={{ height: "40px" }} />
          </Link>
        </div>
        <div className="studentNavBarLinks">
          <>
            <Link
              to="/student/status"
              style={{
                textDecoration: "none",
                color: "#007bff",
                display: "flex",
                alignItems: "center",
                marginRight: "15px",
              }}
            >
              <RxDashboard />
              <p style={{ fontSize: "17px", marginLeft: "2px" }}>DASHBOARD</p>
            </Link>
          </>
          <>
            <button
              onClick={logoutHandler}
              style={{
                textDecoration: "none",
                color: "red",
                background: "none",
                cursor: "pointer",
                border: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <MdOutlineLogout
                style={{ fill: "red", transform: "rotate(180deg)" }}
              />
              <p style={{ marginLeft: "3px" }}>LOGOUT</p>
            </button>
          </>
        </div>
      </div>
    </div>
  );
};

export default StudentNavBar;
