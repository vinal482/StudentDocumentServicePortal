import React from "react";
import AdminNavBar from "../components/AdminNavBar.tsx";
import MasterTable from "../components/MasterTable.tsx";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

const AdminMasterPage = () => {
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
    {
      "Document name": "CPI to Percentage conversion certificate",
      Cost: "50 INR",
    },
    { "Document name": "Expected date of result certificate", Cost: "50 INR" },
    { "Document name": "Medium of instruction certificate", Cost: "50 INR" },
    { "Document name": "Duplicate Provisional certificate", Cost: "70 INR" },
    { "Document name": "Duplicate Degree Certificate", Cost: "300 INR" },
    { "Document name": "Other Miscellaneous Certificate", Cost: "50 INR" },
  ];
  return (
    <>
      <AdminNavBar />
      <div className="container">
        <div className="studentDSDContainer">
          <div className="studentDocumentDetails">
            <div className="studentDocument">
              <MasterTable data={data} />
            </div>
          </div>
          <div className="studentDocumentSubmit">
            <button
              type="submit"
              className="studentDSDBtn"
              style={{ backgroundColor: "#5d5d5d" }}
            >
              <FaPlus />
              <p style={{ marginLeft: "10px" }}>Add a new column</p>
            </button>
          </div>
          <div className="studentDocumentSubmit">
            <Link to="/admin/dashboard">
              <button type="submit" className="studentDSDBtn">
                Next
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMasterPage;
