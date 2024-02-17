import React from "react";
import StudentNavBar from "../components/StudentNavBar.tsx";
import "../App.css";
import Table from "../components/Table.tsx";

// student Document Service Dashboard
const StudentDSD = () => {
  const [checked, setChecked] = React.useState(false);
  function handleChange(e) {
    setChecked(e.target.checked);
  }

  const data = [
    { "Document name": "Bonafide Student Certificate", Cost: "50 INR" },
    { "Document name": "Combined Grade Report", Cost: "70 INR" },
    { "Document name": "Duplicate Transcript", Cost: "150 INR" },
    { "Document name": "Document In Sealed DA-IICT envelope", Cost: "70 INR" },
    { "Document name": "Migration Certificate", Cost: "50 INR" },
    { "Document name": "CPI to Percentage conversion certificate", Cost: "50 INR" },
    { "Document name": "Expected date of result certificate", Cost: "50 INR" },
    { "Document name": "Medium of instruction certificate", Cost: "50 INR" },
    { "Document name": "Duplicate Provisional certificate", Cost: "70 INR" },
    { "Document name": "Duplicate Degree Certificate", Cost: "300 INR" },
    { "Document name": "Other Miscellaneous Certificate", Cost: "50 INR" },
  ];

  return (
    <>
      <StudentNavBar />
      <div className="container">
        <div className="studentDSDContainer">
          <div className="studentDetailsContainer">
            <h4>Student name: Vinal Boricha</h4>
            <h4>Student ID: 202001062</h4>
          </div>
          <div className="studentDocumentDetails">
            <div className="studentDocument">
              <Table data={data} />
            </div>
          </div>
          <div className="studentDocumentSubmit">
            <button type="submit" className="studentDSDBtn">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDSD;
