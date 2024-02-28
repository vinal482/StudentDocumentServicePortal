import React from "react";
import AdminNavBar from "../components/AdminNavBar.tsx";
import MasterTable from "../components/MasterTable.tsx";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { MdClose } from "react-icons/md";
import { TailSpin } from "react-loader-spinner";

const AdminMasterPage = () => {
  const [options, setOptions] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const [costs, setCosts] = React.useState([]);
  const [selectedDoc, setSelectedDoc] = React.useState(0);
  const [newCost, setNewCost] = React.useState(0);
  const [adminName, setAdminName] = React.useState("");
  const [costLog, setCostLog] = React.useState([]); // Replace with actual data
  const [forAddingDoc, setForAddingDoc] = React.useState(false);
  const [forViewingDoc, setForViewingDoc] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [docData, setDocData] = React.useState([]);
  const [newDocName, setNewDocName] = React.useState("");
  const [newDocCost, setNewDocCost] = React.useState("");

  const setModalVisibility = async (value) => {
    // setModalVisibility(value);
    document.getElementById("modal").style.display = value ? "flex" : "none";
  };

  function handleChange(e) {
    setChecked(e.target.checked);
  }

  const retriveData = async () => {
    try {
      const adminName = await localStorage.getItem("adminName");
      setAdminName(adminName);
      const response = await axios.get(`http://localhost:8080/document/getall`);
      const data = await response.data;
      console.log("Data:", data);
      const temp = [];
      for (let i = 0; i < data.length; i++) {
        temp.push(data[i].documentCost);
      }
      setCosts(temp);
      await setOptions(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditDocument = async () => {
    if (selectedDoc === 0) {
      alert("Please select a document");
      return;
    } else if (newCost === 0 || newCost === null || newCost === "") {
      alert("Please enter a new cost");
      return;
    }
    console.log("Selected doc:", selectedDoc);
    try {
      const response = await axios.put(
        `http://localhost:8080/document/update`,
        {
          documentId: selectedDoc,
          documentCost: newCost,
        }
      );
      const data = await response.data;
      // console.log("Data:", data);
      alert("Document updated successfully");
      const response1 = await axios.post(
        `http://localhost:8080/documentCostLog/add`,
        {
          documentId: selectedDoc,
          documentNewCost: newCost,
          documentOldCost: costs[selectedDoc - 1],
          adminName: adminName,
        }
      );
      window.location = "/admin/dashboard";
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    retriveData();
  }, []);

  const handleSelectedDoc = async (docId) => {
    setSelectedDoc(docId);
    const response = await axios.get(
      `http://localhost:8080/documentCostLog/get?documentId=${docId}`
    );
    const data = response.data;
    // console.log("Data:", data);
    await setCostLog(data);
    console.log("Selected doc:", docId);
  };

  const handleDisplayAddDoc = () => {
    setForViewingDoc(false);
    setForAddingDoc(true);
    // setIsLoading(true);
    setModalVisibility(true);
  };

  const handleDisplayViewDoc = async () => {
    setForAddingDoc(false);
    setForViewingDoc(true);
    setIsLoading(true);

    try {
      const response = await axios.get(`http://localhost:8080/document/getall`);
      // console.log("Data:", response.data);
      await setDocData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }

    setModalVisibility(true);
  };

  const handleAddDoc = async () => {
    if (newDocName === "" || newDocCost === "") {
      alert("Please enter all details");
      return;
    }
    try {
      const response = await axios.post(`http://localhost:8080/document/add`, {
        documentName: newDocName,
        documentCost: newDocCost,
      });
      const data = await response.data;
      // console.log("Data:", data);
      alert("Document added successfully");
      window.location = "/admin/dashboard";
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <AdminNavBar />
      <div className="container">
        <div className="adminMasterContainer">
          <div className="studentDocumentDetails">
            <div
              className="studentDocument"
              style={{ flexDirection: "column" }}
            >
              <h4 style={{ marginBottom: "10px" }}>Select Document:</h4>
              {/* <MasterTable data={data} /> */}
              <div style={{ marginBottom: "20px" }}>
                <select
                  className="masterPageSelectInput"
                  onChange={(e) => handleSelectedDoc(e.target.value)}
                >
                  <option value="0">Select</option>
                  {options.map((option) => (
                    <option value={option.documentId}>
                      {option.documentName}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder={costs[selectedDoc - 1]}
                  className="masterPageInput"
                  onChange={(e) => {
                    setNewCost(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="studentDocumentSubmit">
            <button
              type="button"
              className="studentDSDBtn"
              onClick={() => handleEditDocument()}
            >
              Save
            </button>
          </div>
          <div className="studentDocumentSubmit">
            <button
              type="button"
              className="studentDSDBtn"
              style={{ backgroundColor: "#5d5d5d" }}
              onClick={() => {
                handleDisplayAddDoc();
              }}
            >
              <FaPlus />
              <p style={{ marginLeft: "10px" }}>Add a new document</p>
            </button>
          </div>
          <div className="studentDocumentSubmit">
            <button
              type="button"
              className="studentDSDBtn"
              style={{ backgroundColor: "#5d5d5d" }}
              onClick={() => {
                handleDisplayViewDoc();
              }}
            >
              <p style={{ marginLeft: "10px" }}>View documents</p>
            </button>
          </div>
          <div className="costLogTable">
            {costLog.length > 0 ? (
              <table style={{ width: "100%" }}>
                <tr>
                  <th>
                    Admin Name
                    <hr style={{ margin: "5px 0 10px 0" }} />
                  </th>
                  <th>
                    Old Cost
                    <hr style={{ margin: "5px 0 10px 0" }} />
                  </th>
                  <th>
                    New Cost
                    <hr style={{ margin: "5px 0 10px 0" }} />
                  </th>
                  <th>
                    Time
                    <hr style={{ margin: "5px 0 10px 0" }} />
                  </th>
                </tr>
                {costLog.map((log) => (
                  <tr>
                    <td>
                      {log.adminName} <div style={{ marginBottom: "10px" }} />
                    </td>
                    <td>
                      {log.documentOldCost}
                      <div style={{ marginBottom: "10px" }} />
                    </td>
                    <td>
                      {log.documentNewCost}
                      <div style={{ marginBottom: "10px" }} />
                    </td>
                    <td>
                      {new Date(log.time).toLocaleDateString()}{" "}
                      {new Date(log.time).toLocaleTimeString()}{" "}
                      <div style={{ marginBottom: "10px" }} />
                    </td>
                  </tr>
                ))}
              </table>
            ) : null}
          </div>

          <div className="modalCont" id="modal">
            <div className="modal">
              <div className="modalContent">
                <span
                  className="close"
                  onClick={() => {
                    setModalVisibility(false);
                  }}
                >
                  <MdClose />
                </span>
                {forAddingDoc ? <h3>Add a document</h3> : null}
                {forViewingDoc ? <h3>View documents</h3> : null}
                {isLoading ? (
                  <TailSpin // Type of spinner
                    height="40"
                    width="40"
                    color="#007bff"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                ) : null}
                {forViewingDoc && !isLoading ? (
                  <table style={{ width: "100%" }}>
                    <tr>
                      <th>
                        Document Name
                        <hr style={{ margin: "5px 0 10px 0" }} />
                      </th>
                      <th>
                        Document Cost
                        <hr style={{ margin: "5px 0 10px 0" }} />
                      </th>
                    </tr>
                    {docData.map((doc) => (
                      <tr>
                        <td>
                          {doc.documentName}{" "}
                          <div style={{ marginBottom: "10px" }} />
                        </td>
                        <td>
                          {doc.documentCost}
                          <div style={{ marginBottom: "10px" }} />
                        </td>
                      </tr>
                    ))}
                  </table>
                ) : null}
                {forAddingDoc && !isLoading ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "15px",
                      paddingLeft: "10px"
                    }}
                  >
                    <label htmlFor="docName">Document Name: </label>
                    <input
                      type="text"
                      id="docName"
                      name="docName"
                      className="docNameInputBar"
                      placeholder="Enter name"
                      onChange={(e) => {setNewDocName(e.target.value)}}
                    />
                    <label htmlFor="docCost">Document Cost: </label>
                    <input
                      type="text"
                      id="docCost"
                      name="docCost"
                      className="docCostInputBar"
                      placeholder="Enter cost"
                      onChange={(e) => {setNewDocCost(e.target.value)}}
                    />
                    <button
                      type="button"
                      className="adminMasterAddDocBtn"
                      onClick={() => {
                        handleAddDoc()
                      }}
                    >
                      Add
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMasterPage;
