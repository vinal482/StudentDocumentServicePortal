import React from "react";
import { MdOutlineLogout } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import Logo from "../Assets/DA_logo_new.png";

const StudentNavBar = () => {
  const logoutHandler = async () => {
    let temp = "";
    let tmp = localStorage.getItem("studentType");
    localStorage.clear();
    if(tmp == "2") {
      window.location.href = "/alumni/login";
    } else {
      window.location.href = "/student/login";
    }
    // localStorage.clear();
  };
  return (
    <div className="studentNavBar">
      <div className="studentNavBarContainer">
        <div className="studentNavBarTitle">
          <Link style={{ textDecoration: "none" }} to="/">
            <img src={Logo} alt="" style={{ height: "45px" }} />
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
              <RxDashboard style={{ fontSize: "16px" }} />
              <p style={{ fontSize: "16px", marginLeft: "2px" }}>DASHBOARD</p>
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
                style={{ fill: "red", fontSize: "16px", transform: "rotate(180deg)" }}
              />
              <p style={{ fontSize: "16px", marginLeft: "3px" }}>LOGOUT</p>
            </button>
          </>
        </div>
      </div>
    </div>
  );
};

export default StudentNavBar;