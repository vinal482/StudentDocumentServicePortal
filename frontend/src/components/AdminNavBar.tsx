import React from "react";
import { MdOutlineLogout } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";

const AdminNavBar = () => {
  return (
    <div className="studentNavBar">
      <div className="studentNavBarContainer">
        <div className="studentNavBarTitle">
          <h3 style={{ color: "#007bff" }}>Student Document Service</h3>
        </div>
        <div className="adminNavigationOption">
          <a href="#" style={{ textDecoration: "none", color: "#007bff", marginRight: '15px' }}>
            All Requests
          </a>
          <a href="#" style={{ textDecoration: "none", color: "#5d5d5d", marginRight: '15px' }}>
            Pending Requests
          </a>
          <a href="#" style={{ textDecoration: "none", color: "#5d5d5d"}}>
            Completed Requests
          </a>
        </div>
        <div className="studentNavBarLinks">
          <>
            <a
              href="#"
              style={{
                textDecoration: "none",
                color: "red",
                display: "flex",
                alignItems: "center",
              }}
            >
              <MdOutlineLogout
                style={{ fill: "red", transform: "rotate(180deg)" }}
              />
              <p style={{ marginLeft: "3px" }}>LOGOUT</p>
            </a>
          </>
        </div>
      </div>
    </div>
  );
};

export default AdminNavBar;
