import React from "react";
import StudentNavBar from "../components/StudentNavBar.tsx";
import "../App.css";
import { Link } from "react-router-dom";

const StudentSelectedDocs = () => {
  return (
    <>
      <StudentNavBar />
      <div className="container">
        <div className="studentDSDContainer">
          <div className="deliveryContainer">
            <div className="deliverySelectModeOfDelivery">
              <label htmlFor="modeOfDelivery">Mode of Delivery: </label>
              <select
                name="modeOfDelivery"
                id="modeOfDelivery"
                className="modeofDeliverySelect"
              >
                <option value="1">On Campus</option>
                <option value="2">Inside India</option>
                <option value="3">Outside India</option>
              </select>
            </div>
            <div className="deliveryAddress">
              <label htmlFor="address">Address: </label>
              <input
                type="text"
                id="address"
                name="address"
                className="deliveryAddressInputBar"
              />
            </div>
          </div>
          <div className="selectedDocumentDetails">
            <div className="selectedDocumentDetailsTitle">
              Selected Documents
            </div>
          </div>
          <div className="studentDocumentSubmit">
            <Link to="/student/dsd">
              <button type="submit" className="studentSelectedDocsBackBtn">
                Back
              </button>
            </Link>
              <button type="button" className="studentSelectedDocsPayBtn" onClick={() => {handlePay()}}
              >
                Pay
              </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentSelectedDocs;
