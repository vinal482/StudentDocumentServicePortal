import React from "react";
import AdminNavBar from "../components/AdminNavBar.tsx";
import MasterTable from "../components/MasterTable.tsx";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { MdClose } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { TailSpin } from "react-loader-spinner";

const AdminMasterPage = () => {
  const [options, setOptions] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const [costs, setCosts] = React.useState([]);
  const [names, setNames] = React.useState([]);
  const [selectedDoc, setSelectedDoc] = React.useState(0);
  const [newCost, setNewCost] = React.useState(0);
  const [newName, setNewName] = React.useState("");
  const [adminName, setAdminName] = React.useState("");
  const [costLog, setCostLog] = React.useState([]); // Replace with actual data
  const [forAddingDoc, setForAddingDoc] = React.useState(false);
  const [forViewingDoc, setForViewingDoc] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [docData, setDocData] = React.useState([]);
  const [newDocName, setNewDocName] = React.useState("");
  const [newDocCost, setNewDocCost] = React.useState("");
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [selectedDocs, setSelectedDocs] = React.useState([]);
  const [docNameInputEnabled, setDocNameInputEnabled] = React.useState(0);

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
      var temp = new Object();
      var temp1 = new Object();
      for (let i = 0; i < data.length; i++) {
        temp[data[i].documentId] = data[i].documentCost;
        temp1[data[i].documentId] = data[i].documentName;
      }
      await setCosts(temp);
      await setNames(temp1);
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
    } else if (docNameInputEnabled == 1 && newName === "") {
      alert("Please enter a new name");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/document/update`,
        {
          documentId: selectedDoc,
          documentCost: newCost,
          documentName: newName,
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
          documentOldCost: costs[selectedDoc],
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

  // const handleCheckboxChange = (index) => {
  //   setSelectedRows((prevRows) =>
  //     prevRows.includes(index)
  //       ? prevRows.filter((row) => row !== index)
  //       : [...prevRows, index]
  //   );
  // };

  const handleCheckboxChange = (index) => {
    const newSelectedRows = [...selectedRows];
    if (newSelectedRows.includes(index)) {
      const removedIndex = newSelectedRows.indexOf(index);
      newSelectedRows.splice(removedIndex, 1);
    } else {
      newSelectedRows.push(index);
    }
    setSelectedRows(newSelectedRows);
  };

  // const getSelectedDocuments =  () => {
  //   const selectedDocs = [];
  //   var cost = 0;
  //   for (let i = 0; i < docData.length; i++) {
  //     if (selectedRows.includes(i)) {
  //       const doc = {
  //         documentId: docData[i].documentId, // assuming there's a documentId property
  //         documentName: docData[i].documentName,
  //         documentCost: docData[i].documentCost
  //       };
  //       selectedDocs.push(doc);
  //     }
  //   }
  //    setSelectedItems(selectedDocs);
  //   // console.log("Selected items:", selectedItems);

  //    setForViewingDoc(false);
  //    setModalVisibility(false);
  //   console.log("Selected items:", selectedItems);

  // };

  const handleEnableNameInput = async (value) => {
    await setDocNameInputEnabled(!docNameInputEnabled);
  };

  const getSelectedDocuments = () => {
    // Implement your logic to handle selected documents using selectedRows
    // Example:

    const selectedDocIds = [];
    for (const i in docData) {
      if (selectedRows.includes(docData[i].documentId)) {
        selectedDocIds.push(docData[i].documentId);
      }
    }
    console.log("Selected document IDs:", selectedDocIds);
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
              <div
                style={{
                  marginBottom: "20px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
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
                <label
                  htmlFor="costMasterPageInput"
                  style={{ marginTop: "10px" }}
                >
                  Cost:{" "}
                </label>
                <input
                  type="text"
                  defaultValue={costs[selectedDoc]}
                  className="masterPageInput"
                  name="costMasterPageInput"
                  onChange={(e) => {
                    setNewCost(e.target.value);
                  }}
                />
                <button
                  type="button"
                  className="studentDSDBtn"
                  style={{ margin: "10px 0" }}
                  onClick={() => {
                    handleEnableNameInput();
                  }}
                >
                  <MdModeEdit
                    style={{ marginRight: "5px", fontSize: "17px" }}
                  />{" "}
                  Edit document name
                </button>
                {
                  docNameInputEnabled == 1 ? (
                    <>
                      <label
                        htmlFor="nameMasterPageInput"
                        style={{ marginTop: "10px" }}
                      >
                        Document name:{" "}
                      </label>
                      <input
                        type="text"
                        defaultValue={names[selectedDoc]}
                        className="masterPageInput"
                        name="nameMasterPageInput"
                        onChange={(e) => {
                          setNewName(e.target.value);
                        }}
                      />
                    </>
                  ) : null // Add your logic here
                }
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
                handleDisplayAddDoc(docNameInputEnabled);
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
                <tbody>
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
                </tbody>
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
                  <>
                    <table style={{ width: "100%" }}>
                      <tr>
                        <th>
                          Enable
                          <hr style={{ margin: "5px 0 10px 0" }} />
                        </th>
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
                        <tr key={doc.decumentId}>
                          <td>
                            <input
                              type="checkbox"
                              style={{ marginBottom: "10px" }}
                              checked={selectedRows.includes(doc.documentId)} // Use uniqueId if applicable
                              onChange={() =>
                                handleCheckboxChange(doc.documentId)
                              }
                            />
                          </td>
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
                    <button
                      type="button"
                      className="studentDSDBtn"
                      onClick={() => getSelectedDocuments()}
                    >
                      Next
                    </button>
                  </>
                ) : null}
                {forAddingDoc && !isLoading ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "15px",
                      paddingLeft: "10px",
                    }}
                  >
                    <label htmlFor="docName">Document Name: </label>
                    <input
                      type="text"
                      id="docName"
                      name="docName"
                      className="docNameInputBar"
                      placeholder="Enter name"
                      onChange={(e) => {
                        setNewDocName(e.target.value);
                      }}
                    />
                    <label htmlFor="docCost">Document Cost: </label>
                    <input
                      type="text"
                      id="docCost"
                      name="docCost"
                      className="docCostInputBar"
                      placeholder="Enter cost"
                      onChange={(e) => {
                        setNewDocCost(e.target.value);
                      }}
                    />
                    <button
                      type="button"
                      className="adminMasterAddDocBtn"
                      onClick={() => {
                        handleAddDoc();
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
