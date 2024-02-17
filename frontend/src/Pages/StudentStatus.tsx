import React from "react";
import StudentNavBar from "../components/StudentNavBar.tsx";
import "../App.css";

const StudentStatus = () => {
  return (
    <>
      <StudentNavBar />
      <div className="container">
        <div className="studentStatusContainer">
          <div className="studentStatusSubContainer pandingStatusColorSubContainer">
            <p className="studentStatusTimeContainer">
              <b>Date: </b>12/02/24 <b>Time: </b>20:03
            </p>
            <p className="studentStatusStatusContainer paddingStatusColor">
              <b>Status: </b>Processing
            </p>
            <p> Document details</p>
          </div>
          <div className="studentStatusSubContainer completedStatusColorSubContainer">
            <p className="studentStatusTimeContainer">
              <b>Date: </b>12/02/24 <b>Time: </b>20:03
            </p>
            <p className="studentStatusStatusContainer completedStatusColor">
              <b>Status: </b>Delivered
            </p>
            <p> Document details</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentStatus;
