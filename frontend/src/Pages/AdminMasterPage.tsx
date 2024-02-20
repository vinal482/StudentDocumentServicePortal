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
        <div className="adminMasterContainer">
          <div className="studentDocumentDetails">
            <div className="studentDocument" style={{flexDirection: 'column'}}>
              <h4 style={{marginBottom: "10px"}}>Select Document:</h4>
              {/* <MasterTable data={data} /> */}
              <div style={{marginBottom: '20px'}}>
                <select className="masterPageSelectInput">
                  <option value="Select">Select</option>
                  <option value="Bonafide Student Certificate">
                    Bonafide Student Certificate
                  </option>
                  <option value="Combined Grade Report">
                    Combined Grade Report
                  </option>
                  <option value="Duplicate Transcript">
                    Duplicate Transcript
                  </option>
                  <option value="Document In Sealed DA-IICT envelope">
                    Document In Sealed DA-IICT envelope
                  </option>
                  <option value="Migration Certificate">
                    Migration Certificate
                  </option>
                  <option value="Expected date of result certificate">
                    Expected date of result certificate
                  </option>
                  <option value="Medium of instruction certificate">
                    Medium of instruction certificate
                  </option>
                  <option value="Duplicate Provisional certificate">
                    Duplicate Provisional certificate
                  </option>
                  <option value="Duplicate Degree Certificate">
                    Duplicate Degree Certificate
                  </option>
                </select>
                <input
                  type="text"
                  placeholder="Cost"
                  className="masterPageInput"
                />
              </div>
            </div>
          </div>
          <div className="studentDocumentSubmit">
            <button
              type="submit"
              className="studentDSDBtn"
              style={{ backgroundColor: "#5d5d5d" }}
            >
              <FaPlus />
              <p style={{ marginLeft: "10px" }}>Add a new document</p>
            </button>
          </div>
          <div className="studentDocumentSubmit">
            <Link to="/admin/dashboard">
              <button type="submit" className="studentDSDBtn">
                Submit
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMasterPage;
