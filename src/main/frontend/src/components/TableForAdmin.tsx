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
  const [studentId, setStudentId] = useState("");
  const [DATA, setData] = useState([]);
  const [trackingId, setTrackingId] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [postalDate, setPostalDate] = useState("");
  const [forAllRequests, setForAllRequests] = useState(true);
  const [rejectedReasonVisibility, setRejectedReasonVisibility] =
    useState(false);
  const [postAddress, setPostAddress] = useState("");

  const retriveAdminData = async () => {
    setIsLoading(true);
    try {
      await setData(data);
    } catch (error) {
      console.error("Error retrieving admin data:", error);
      alert("Please try again later.");
    } finally {
      setIsLoading(false);
    }
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

  const handleDisplayDocs = async (requestId, studentId) => {
    setModalVisibility(true);
    setIsLoading(false);
    setForDocument(true);
    setForStatus(false);
    await setStudentId(studentId);
    try {
      const documentResponse = await axios.get(
        `https://documents.daiict.ac.in/requestedDocuments/get?requestId=${requestId}`
      );

      const documentData = await documentResponse.data;

      for (let i = 0; i < documentData.length; i++) {
        const response = await axios.get(
          `https://documents.daiict.ac.in/document/get?documentId=${documentData[i].documentId}`
        );
        const data = await response.data;
        documentData[i].documentName = data.documentName;
      }

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

  const handleEnableAddressEdit = () => {
    const addressInput = document.getElementById("address");
    if (addressInput.disabled === false) {
      addressInput.disabled = true;
    } else {
      addressInput.disabled = false;
    }
  };

  const setModalVisibility = (value) => {
    // setModalVisibility(value);
    document.getElementById("modal").style.display = value ? "flex" : "none";
  };

  const handleDisplayPost = async (requestId, studentId) => {
    await setStudentId(studentId);
    setIsLoading(true);
    setForDocument(false);
    setModalVisibility(true);
    setForStatus(false);
    try {
      const response = await axios.get(
        `https://documents.daiict.ac.in/post/get?requestId=${requestId}`
      );

      const data = await response.data;
      console.log("Post Data:", data);
      setTrackingId(data.trackingId);
      setAgencyName(data.agencyName);
      setPostalDate(data.postTime);
      setPostAddress(data.address);
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

  const handleStatusUpdateDisplay = async (
    Status,
    requestId,
    deliveryMode,
    studentId
  ) => {
    console.log("Status:", Status);
    console.log("Request ID:", requestId);
    console.log("Delivery Mode:", deliveryMode);
    console.log("Student ID:", studentId);
    if (Status === "Rejected" || Status === "Pending") {
      setRejectedReasonVisibility(true);
    } else {
      setRejectedReasonVisibility(false);
    }
    setForDocument(false);
    setModalVisibility(true);
    setForStatus(true);
    await setStudentId(studentId);
    await setStatusRequestId(requestId);
    await setModeOfDelivery(deliveryMode);
    console.log("Status:", requestId);
    await setStatus(Status);
    document.getElementById("statusSel").value = Status;
    try {
      const response = await axios.get(
        `https://documents.daiict.ac.in/requestUpdate/get?requestId=${requestId}`
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

  // const setRejectedReasonVisibility = (value) => {
  //   const rejectedReasonInput = document.getElementById(
  //     "updateStatusInputCont"
  //   );
  //   if (value) {
  //     rejectedReasonInput.style.display = "flex";
  //   } else {
  //     rejectedReasonInput.style.display = "none";
  //   }
  // };

  const handleSelectChange = async (e) => {
    console.log("Selected:", e.target.value);
    if (e.target.value === "Rejected" || e.target.value === "Pending") {
      await setRejectedReasonVisibility(true);
    } else {
      await setRejectedReasonVisibility(false);
    }
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
        `https://documents.daiict.ac.in/request/status/update`,
        {
          requestId: statusRequestId,
          status: selectedStatus,
        }
      );
      const data = await response.data;
      console.log("Data:", data);
      alert("Status updated successfully");
      const response1 = await axios.post(
        `https://documents.daiict.ac.in/requestUpdate/add`,
        {
          requestId: statusRequestId,
          oldStatus: status,
          newStatus: selectedStatus,
          adminName: adminName,
        }
      );
      window.location = "../admin/dashboard";
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
          `https://documents.daiict.ac.in/request/getAll`,
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
      setForAllRequests(false);
      pendingRequests.style.color = "#007bff";
      try {
        setIsLoading(true);
        const response1 = await axios.get(
          `https://documents.daiict.ac.in/request/getbystatus?status=Pending`,
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
      setForAllRequests(false);
      issuedRequests.style.color = "#007bff";
      try {
        setIsLoading(true);
        const response1 = await axios.get(
          `https://documents.daiict.ac.in/request/getbystatus?status=Issued`,
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
      setForAllRequests(false);
      completedRequests.style.color = "#007bff";
      try {
        setIsLoading(true);
        const response1 = await axios.get(
          `https://documents.daiict.ac.in/request/getbystatus?status=Posted`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const reponse2 = await axios.get(
          `https://documents.daiict.ac.in/request/getbystatus?status=Collected`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const response = response1.data.concat(reponse2.data);
        if (response.length === 0) {
          await setData([
            {
              requestId: " ",
              time: " ",
              studentId: " ",
              amountPaid: " ",
              deliveryMod: " ",
              contactNo: " ",
              transactionId: " ",
              status: " ",
            },
          ]);
        } else {
          await setData(response);
        }
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
  const handlePostedSubmitBtn = async () => {
    console.log("Tracking ID:", trackingId);
    console.log("Agency Name:", agencyName);
    console.log("Posted Date:", postalDate);
    console.log("Address:", postAddress);

    // const date = new Date(postalDate);
    // console.log("Date:", date);

    if (trackingId === "" || agencyName === "" || postalDate === "") {
      alert("Please fill all the details");
      return;
    }

    try {
      const response = await axios.put(`https://documents.daiict.ac.in/post/update`, {
        requestId: postData.requestId,
        trackingId: trackingId,
        agencyName: agencyName,
        postTime: postalDate,
        address: postAddress,
      });
      const data = await response.data;
      console.log("Data:", data);
      alert("Post details added successfully");
      window.location = "../admin/dashboard";
    } catch (error) {
      console.error("Error adding post details:", error);
      alert(
        "There was an error trying to add post details. Please try again later."
      );
    }
  };

  return (
    <>
      <div className="adminNavigationOption">
        <button
          style={{
            textDecoration: "none",
            color: "#007bff",
          }}
          className="nav-links"
          id="allRequests"
          onClick={() => {
            handleOptionRequests("allRequests");
          }}
        >
          <p style={{ fontSize: "17px", marginLeft: "2px" }}>All Requests</p>
        </button>
        <button
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
          className="nav-links"
          id="issuedRequests"
          onClick={() => {
            handleOptionRequests("issuedRequests");
          }}
        >
          <p style={{ fontSize: "17px", marginLeft: "2px" }}>Issued Requests</p>
        </button>
        <button
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
              Requested time
              <hr style={{ margin: "5px 0 10px 0" }} />
            </th>
            <th>
              Student ID
              <hr style={{ margin: "5px 0 10px 0" }} />
            </th>
            <th>
              Charges
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
              Transaction time
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
                          row.deliveryMod,
                          row.studentId
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
                        handleDisplayDocs(row.requestId, row.studentId);
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
                          handleDisplayPost(row.requestId, row.studentId);
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
              {forAllRequests ? (
                <>
                  {data.map((row, index) => (
                    <tr key={row.uniqueId || index}>
                      <td>
                        {row.requestId}
                        <div style={{ marginBottom: "10px" }} />
                      </td>
                      <td>
                        {new Date(row.time).toLocaleDateString()}{" "}
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
                              row.deliveryMod,
                              row.studentId
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
                            handleDisplayDocs(row.requestId, row.studentId);
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
                              handleDisplayPost(row.requestId, row.studentId);
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
              ) : null}
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
            {forDocument ? <h3>Documents appilied for</h3> : null}
            {forStatus ? <h3>Update Status</h3> : null}
            {!forDocument && !forStatus ? <h3>Postal Details</h3> : null}
            StudentID: {studentId}
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  {forDocument ? (
                    <>
                      <th>
                        Document Name
                        <hr style={{ margin: "5px 0 10px 0" }} />
                      </th>
                      <th>
                        No. of Copies
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
                          {row.documentName}
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
                    <div
                      className="postDetailsBelowStatusUpdate"
                      id="postDetailsBelowStatusUpdate"
                    >
                      <hr style={{ width: "100%", marginBottom: "10px" }} />
                      <label
                        htmlFor="address"
                        className="labelForPostDetailsUpdatation"
                      >
                        Address:{" "}
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        className="postDetailsInput"
                        defaultValue={postData.address}
                        onChange={(e) => {
                          setPostAddress(e.target.value);
                        }}
                        disabled
                      />
                      <button
                        className="adminAddressEditBtn"
                        onClick={() => {
                          handleEnableAddressEdit();
                        }}
                      >
                        Edit Address
                      </button>
                      <label
                        htmlFor="trackingId"
                        className="labelForPostDetailsUpdatation"
                      >
                        Tracking ID:{" "}
                      </label>
                      <input
                        type="text"
                        name="trackingId"
                        id="trackingId"
                        className="postDetailsInput"
                        defaultValue={postData.trackingId}
                        onChange={(e) => {
                          setTrackingId(e.target.value);
                        }}
                      />
                      <label
                        htmlFor="agencyName"
                        className="labelForPostDetailsUpdatation"
                      >
                        Agency name:{" "}
                      </label>
                      <input
                        type="text"
                        className="postDetailsInput"
                        id="agencyName"
                        name="agencyName"
                        defaultValue={postData.agencyName}
                        onChange={(e) => {
                          setAgencyName(e.target.value);
                        }}
                      />
                      <label
                        htmlFor="postedDate"
                        className="labelForPostDetailsUpdatation"
                      >
                        Date:{" "}
                      </label>
                      <input
                        type="date"
                        className="postDetailsInput"
                        id="postedDate"
                        name="postedDate"
                        defaultValue={postData.postTime}
                        onChange={(e) => {
                          setPostalDate(e.target.value);
                        }}
                      />
                      <button
                        className="postedSubmitBtn"
                        onClick={() => {
                          handlePostedSubmitBtn();
                        }}
                      >
                        Add Post details
                      </button>
                    </div>
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
                            <option value="Rejected">Rejected</option>
                          </select>
                          <div style={{ marginBottom: "10px" }} />
                          {rejectedReasonVisibility ? (
                            <div id="updateStatusInputCont">
                              <label
                                htmlFor="updateStatusInput"
                                style={{ marginRight: "10px" }}
                              >
                                Enter remarks for rejection:
                              </label>
                              <input
                                type="text"
                                placeholder="Enter reason"
                                className="updateStatusInput"
                                name="updateStatusInput"
                                id="updateStatusInput"
                              />
                            </div>
                          ) : null}
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
