import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { MdClose } from "react-icons/md";

const Table = ({ data }) => {
  // const [modalVisibility, setModalVisibility] = useState(false);
  const [documentData, setDocumentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [forDocument, setForDocument] = useState(false);
  const [forStatus, setForStatus] = useState(false);
  const [postData, setPostData] = useState([]);
  const [status, setStatus] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [statusRequestId, setStatusRequestId] = useState("");
  const [modeOfDelivery, setModeOfDelivery] = useState("");
  const [adminName, setAdminName] = useState("");
  const [requestUpdateLogData, setRequestUpdateLogData] = useState([]);
  const [DATA, setData] = useState([]);

  const retriveAdminData = async () => {
    await setData(data);
  };

  React.useEffect(() => {
    retriveAdminData();
    const adminName = localStorage.getItem("adminName");
    setAdminName(adminName);
  }, []);
  // First, handle the empty data case outside the component, to prevent the hook from being called conditionally
  if (!data || !Array.isArray(data) || !data.length) {
    return <p>No data to display.</p>;
  }

  const handleDisplayDocs = async (requestId) => {
    setModalVisibility(true);
    setIsLoading(true);
    setForDocument(true);
    try {
      const documentResponse = await axios.get(
        `http://localhost:8080/requestedDocuments/get?requestId=${requestId}`
      );

      const documentData = await documentResponse.data;
      await setDocumentData(documentData);
      console.log("Document Data:", documentData);
    } catch (error) {
      console.error("Error fetching documents:", error);
      alert(
        "There was an error trying to fetch documents. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const setModalVisibility = (value) => {
    // setModalVisibility(value);
    document.getElementById("modal").style.display = value ? "flex" : "none";
  };

  const handleDisplayPost = async (requestId) => {
    setIsLoading(true);
    setForDocument(false);
    setModalVisibility(true);
    setForStatus(false);
    try {
      const response = await axios.get(
        `http://localhost:8080/post/get?requestId=${requestId}`
      );

      const data = await response.data;
      console.log("Post Data:", data);
      // setDocumentData(data);
      setPostData(data);
    } catch (error) {
      console.error("Error fetching post details:", error);
      alert(
        "There was an error trying to fetch post details. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdateDisplay = async (Status, requestId, deliveryMode) => {
    setForDocument(false);
    setModalVisibility(true);
    setForStatus(true);
    await setStatusRequestId(requestId);
    await setModeOfDelivery(deliveryMode);
    console.log("Status:", requestId);
    setStatus(Status);
    document.getElementById("statusSel").value = Status;
    try {
      const response = await axios.get(
        `http://localhost:8080/requestUpdate/get?requestId=${requestId}`
      );

      const requestUpdateLogData = await response.data;
      console.log("Request Log Data:", requestUpdateLogData);
      await setRequestUpdateLogData(requestUpdateLogData);
    } catch (error) {
      console.error("Error fetching request log details:", error);
      alert(
        "There was an error trying to fetch request log details. Please try again later."
      );
    }
  };

  const handleSelectChange = async (e) => {
    console.log("Selected:", e.target.value);
    setSelectedStatus(e.target.value);
  };

  const handleUpdateBtn = async () => {
    console.log("Selected status:", selectedStatus);
    console.log("Status:", status);
    try {
      if (selectedStatus === "") {
        alert("Please select a different status to update");
        return;
      }
      const response = await axios.put(
        `http://localhost:8080/request/status/update`,
        {
          requestId: statusRequestId,
          status: selectedStatus,
        }
      );
      const data = await response.data;
      console.log("Data:", data);
      alert("Status updated successfully");
      const response1 = await axios.post(
        `http://localhost:8080/requestUpdate/add`,
        {
          requestId: statusRequestId,
          oldStatus: status,
          newStatus: selectedStatus,
          adminName: adminName,
        }
      );
      window.location = "/admin/dashboard";
    } catch (error) {
      console.error("Error updating status:", error);
      alert(
        "There was an error trying to update status. Please try again later."
      );
    }
  };

  const handleOptionRequests = async (id) => {
    const allRequests = document.getElementById("allRequests");
    const pendingRequests = document.getElementById("pendingRequests");
    const issuedRequests = document.getElementById("issuedRequests");
    const completedRequests = document.getElementById("completedRequests");
    allRequests.style.color = "#5d5d5d";
    pendingRequests.style.color = "#5d5d5d";
    issuedRequests.style.color = "#5d5d5d";
    completedRequests.style.color = "#5d5d5d";
    if (id === "allRequests") {
      allRequests.style.color = "#007bff";
      try {
        setIsLoading(true);
        const response1 = await axios.get(
          `http://localhost:8080/request/getAll`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const Data = await response1.data;
        await setData(Data);
      } catch (error) {
        console.error("Error retrieving admin data:", error);
        alert(
          "There was an error retrieving admin data. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    } else if (id === "pendingRequests") {
      pendingRequests.style.color = "#007bff";
      try {
        setIsLoading(true);
        const response1 = await axios.get(
          `http://localhost:8080/request/getbystatus?status=Pending`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const Data = await response1.data;
        await setData(Data);
      } catch (error) {
        console.error("Error retrieving admin data:", error);
        alert(
          "There was an error retrieving admin data. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    } else if (id === "issuedRequests") {
      issuedRequests.style.color = "#007bff";
      try {
        setIsLoading(true);
        const response1 = await axios.get(
          `http://localhost:8080/request/getbystatus?status=Issued`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const Data = await response1.data;
        await setData(Data);
      } catch (error) {
        console.error("Error retrieving admin data:", error);
        alert(
          "There was an error retrieving admin data. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    } else if (id === "completedRequests") {
      completedRequests.style.color = "#007bff";
      try {
        setIsLoading(true);
        const response1 = await axios.get(
          `http://localhost:8080/request/getbystatus?status=Posted`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const reponse2 = await axios.get(
          `http://localhost:8080/request/getbystatus?status=Collected`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const response = response1.data.concat(reponse2.data);
        await setData(response);
      } catch (error) {
        console.error("Error retrieving admin data:", error);
        alert(
          "There was an error retrieving admin data. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Now, call the useState hook outside any conditional blocks
  //   const [selectedItems, setSelectedItems] = useState({});

  //   const handleCheckboxChange = (id, checked) => {
  //     setSelectedItems({ ...selectedItems, [id]: checked });
  //   };

  //   const handleInputChange = (id, value) => {
  //     setSelectedItems({ ...selectedItems, [id]: value });
  //   };

  return (
    <>
      <div className="adminNavigationOption">
        <button
          style={{
            textDecoration: "none",
            color: "#007bff",
          }}
          activeClassName="active-nav-link"
          className="nav-links"
          id="allRequests"
          onClick={() => {
            handleOptionRequests("allRequests");
          }}
        >
          <p style={{ fontSize: "17px", marginLeft: "2px" }}>All Requests</p>
        </button>
        <button
          activeClassName="active-nav-link"
          className="nav-links"
          id="pendingRequests"
          onClick={() => {
            handleOptionRequests("pendingRequests");
          }}
        >
          <p style={{ fontSize: "17px", marginLeft: "2px" }}>
            Pending Requests
          </p>
        </button>
        <button
          activeClassName="active-nav-link"
          className="nav-links"
          id="issuedRequests"
          onClick={() => {
            handleOptionRequests("issuedRequests");
          }}
        >
          <p style={{ fontSize: "17px", marginLeft: "2px" }}>Issued Requests</p>
        </button>
        <button
          activeClassName="active-nav-link"
          className="nav-links"
          id="completedRequests"
          onClick={() => {
            handleOptionRequests("completedRequests");
          }}
        >
          <p style={{ fontSize: "17px", marginLeft: "2px" }}>
            Completed Requests
          </p>
        </button>
      </div>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>
              Request ID
              <hr style={{ margin: "5px 0 10px 0" }} />
            </th>
            <th>
              Time
              <hr style={{ margin: "5px 0 10px 0" }} />
            </th>
            <th>
              Student ID
              <hr style={{ margin: "5px 0 10px 0" }} />
            </th>
            <th>
              Amount Paid
              <hr style={{ margin: "5px 0 10px 0" }} />
            </th>
            <th>
              Mode of Delivery
              <hr style={{ margin: "5px 0 10px 0" }} />
            </th>
            <th>
              Contact no.
              <hr style={{ margin: "5px 0 10px 0" }} />
            </th>
            <th>
              Transaction ID
              <hr style={{ margin: "5px 0 10px 0" }} />
            </th>
            <th>
              Status
              <hr style={{ margin: "5px 0 10px 0" }} />
            </th>
            <th>
              Documents
              <hr style={{ margin: "5px 0 10px 0" }} />
            </th>
            <th>
              Post details
              <hr style={{ margin: "5px 0 10px 0" }} />
            </th>
          </tr>
        </thead>
        <tbody>
          {DATA.length > 0 ? (
            <>
              {DATA.map((row, index) => (
                <tr key={row.uniqueId || index}>
                  <td>
                    {row.requestId}
                    <div style={{ marginBottom: "10px" }} />
                  </td>
                  <td>
                    {new Date(row.time).toLocaleDateString()}{" "}
                    {new Date(row.time).toLocaleTimeString()}{" "}
                    <div style={{ marginBottom: "10px" }} />
                  </td>
                  <td>
                    {row.studentId}
                    <div style={{ marginBottom: "10px" }} />
                  </td>
                  <td>
                    {row.amountPaid}
                    <div style={{ marginBottom: "10px" }} />
                  </td>
                  <td>
                    {row.deliveryMod}
                    <div style={{ marginBottom: "10px" }} />
                  </td>
                  <td>
                    {row.contactNo}
                    <div style={{ marginBottom: "10px" }} />
                  </td>
                  <td>
                    {row.transactionId}
                    <div style={{ marginBottom: "10px" }} />
                  </td>
                  <td>
                    <button
                      className="adminDocsBtn"
                      onClick={() => {
                        handleStatusUpdateDisplay(
                          row.status,
                          row.requestId,
                          row.deliveryMod
                        );
                      }}
                    >
                      {row.status}
                    </button>
                  </td>
                  <td>
                    <button
                      className="adminDocsBtn"
                      onClick={() => {
                        handleDisplayDocs(row.requestId);
                      }}
                    >
                      Docs
                    </button>
                  </td>
                  <td>
                    {row.deliveryMod !== "On Campus" ? (
                      <button
                        className="adminDocsBtn"
                        onClick={() => {
                          handleDisplayPost(row.requestId);
                        }}
                      >
                        Post
                      </button>
                    ) : (
                      <p> </p>
                    )}
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <>
              {data.map((row, index) => (
                <tr key={row.uniqueId || index}>
                  <td>
                    {row.requestId}
                    <div style={{ marginBottom: "10px" }} />
                  </td>
                  <td>
                    {new Date(row.time).toLocaleDateString()}{" "}
                    {new Date(row.time).toLocaleTimeString()}{" "}
                    <div style={{ marginBottom: "10px" }} />
                  </td>
                  <td>
                    {row.studentId}
                    <div style={{ marginBottom: "10px" }} />
                  </td>
                  <td>
                    {row.amountPaid}
                    <div style={{ marginBottom: "10px" }} />
                  </td>
                  <td>
                    {row.deliveryMod}
                    <div style={{ marginBottom: "10px" }} />
                  </td>
                  <td>
                    {row.contactNo}
                    <div style={{ marginBottom: "10px" }} />
                  </td>
                  <td>
                    {row.transactionId}
                    <div style={{ marginBottom: "10px" }} />
                  </td>
                  <td>
                    <button
                      className="adminDocsBtn"
                      onClick={() => {
                        handleStatusUpdateDisplay(
                          row.status,
                          row.requestId,
                          row.deliveryMod
                        );
                      }}
                    >
                      {row.status}
                    </button>
                  </td>
                  <td>
                    <button
                      className="adminDocsBtn"
                      onClick={() => {
                        handleDisplayDocs(row.requestId);
                      }}
                    >
                      Docs
                    </button>
                  </td>
                  <td>
                    {row.deliveryMod !== "On Campus" ? (
                      <button
                        className="adminDocsBtn"
                        onClick={() => {
                          handleDisplayPost(row.requestId);
                        }}
                      >
                        Post
                      </button>
                    ) : (
                      <p> </p>
                    )}
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
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
            {forDocument ? <h3>Document Details</h3> : null}
            {forStatus ? <h3>Update Status</h3> : null}
            {!forDocument && !forStatus ? <h3>Post Details</h3> : null}
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  {forDocument ? (
                    <>
                      <th>
                        Document ID
                        <hr style={{ margin: "5px 0 10px 0" }} />
                      </th>
                      <th>
                        No. of Copies
                        <hr style={{ margin: "5px 0 10px 0" }} />
                      </th>
                    </>
                  ) : null}
                  {!forStatus && !forDocument ? (
                    <>
                      <th>
                        Address
                        <hr style={{ margin: "5px 0 10px 0" }} />
                      </th>
                      <th>
                        Date
                        <hr style={{ margin: "5px 0 10px 0" }} />
                      </th>
                      <th>
                        Agency Name
                        <hr style={{ margin: "5px 0 10px 0" }} />
                      </th>
                    </>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {forDocument ? (
                  <>
                    {documentData.map((row, index) => (
                      <tr key={row.documentId || index}>
                        <td>
                          {row.documentId}
                          <div style={{ marginBottom: "10px" }} />
                        </td>
                        <td>
                          {row.no_of_copies}
                          <div style={{ marginBottom: "10px" }} />
                        </td>
                      </tr>
                    ))}
                  </>
                ) : null}
                {!forStatus && !forDocument ? (
                  <>
                    <tr key={postData.requestId}>
                      <td>
                        {postData.address}
                        <div style={{ marginBottom: "10px" }} />
                      </td>
                      <td>
                        {new Date(postData.date).toLocaleDateString()}
                        <div style={{ marginBottom: "10px" }} />
                      </td>
                      <td>
                        {postData.agencyName}
                        <div style={{ marginBottom: "10px" }} />
                      </td>
                    </tr>
                  </>
                ) : null}
                {!forDocument && forStatus ? (
                  <>
                    <tr>
                      <td>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <label
                            htmlFor="statusSelection"
                            style={{ marginBottom: "10px" }}
                          >
                            {" "}
                            Select status{" "}
                          </label>
                          <select
                            name="statusSelection"
                            id="statusSel"
                            className="modeofDeliverySelect"
                            onChange={(e) => {
                              handleSelectChange(e);
                            }}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Issued">Issued</option>
                            {modeOfDelivery !== "On Campus" ? (
                              <option value="Posted">Posted</option>
                            ) : (
                              <option value="Collected">Collected</option>
                            )}
                          </select>
                          <button
                            style={{
                              marginTop: "10px",
                              padding: "7px 20px",
                              width: "min-content",
                              backgroundColor: "#007bff",
                              color: "white",
                              borderRadius: "5px",
                              border: "none",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              handleUpdateBtn();
                            }}
                          >
                            Update
                          </button>
                          {requestUpdateLogData.length > 0 ? (
                            <table style={{ width: "100%", marginTop: "20px" }}>
                              <thead>
                                <tr>
                                  <th>
                                    Admin Name
                                    <hr style={{ margin: "5px 0 10px 0" }} />
                                  </th>
                                  <th>
                                    OldStatus
                                    <hr style={{ margin: "5px 0 10px 0" }} />
                                  </th>
                                  <th>
                                    NewStatus
                                    <hr style={{ margin: "5px 0 10px 0" }} />
                                  </th>
                                  <th>
                                    Time
                                    <hr style={{ margin: "5px 0 10px 0" }} />
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {requestUpdateLogData.map((row, index) => (
                                  <tr key={row.uniqueId || index}>
                                    <td>
                                      {row.adminName}
                                      <div style={{ marginBottom: "10px" }} />
                                    </td>
                                    <td>
                                      {row.oldStatus}
                                      <div style={{ marginBottom: "10px" }} />
                                    </td>
                                    <td>
                                      {row.newStatus}
                                      <div style={{ marginBottom: "10px" }} />
                                    </td>
                                    <td>
                                      {new Date(row.time).toLocaleDateString()}{" "}
                                      {new Date(row.time).toLocaleTimeString()}
                                      <div style={{ marginBottom: "10px" }} />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  </>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
