import React from "react";
import { MdOutlineLogout } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";

const AdminNavBar = () => {

  const logoutHandler = () => {
    localStorage.clear();
    window.location.href = "/admin/login";
  }

  return (
    <div className="studentNavBar">
      <div className="studentNavBarContainer">
        <div className="studentNavBarTitle">
          <h3 style={{ color: "#007bff" }}>Student Document Service</h3>
        </div>
        <div className="adminNavigationOption">
          <a
            href="#"
            style={{
              textDecoration: "none",
              color: "#007bff",
              marginRight: "15px",
            }}
          >
            All Requests
          </a>
          <a
            href="#"
            style={{
              textDecoration: "none",
              color: "#5d5d5d",
              marginRight: "15px",
            }}
          >
            Pending Requests
          </a>
          <a href="#" style={{ textDecoration: "none", color: "#5d5d5d" }}>
            Completed Requests
          </a>
        </div>
        <div className="studentNavBarLinks">
          <>
            <Link
              to="/admin/masterpage"
              style={{
                textDecoration: "none",
                color: "#007bff",
                display: "flex",
                alignItems: "center",
                marginRight: "15px",
              }}
            >
              <RxDashboard />
              <p style={{ fontSize: "17px", marginLeft: "2px" }}>MASTERPAGE</p>
            </Link>
          </>
          <>
            <button
              onClick={logoutHandler}
              style={{
                textDecoration: "none",
                background: "none",
                border: "none",
                color: "red",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
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

export default AdminNavBar;
