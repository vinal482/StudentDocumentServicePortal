import React from "react";
import { MdOutlineLogout } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";

const StudentNavBar = () => {
  return (
    <div className="studentNavBar">
      <div className="studentNavBarContainer">
        <div className="studentNavBarTitle">
          <h3 style={{ color: "#007bff" }}>Student Document Service</h3>
        </div>
        <div className="studentNavBarLinks">
          <>
            <a
              href="#"
              style={{
                textDecoration: "none",
                color: "#007bff",
                display: "flex",
                alignItems: "center",
                marginRight: "15px",
              }}
            >
                <RxDashboard />
              <p style={{fontSize: '17px', marginLeft: '2px'}}>DASHBOARD</p>
            </a>
          </>
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

export default StudentNavBar;
