import React, { useState, useEffect } from "react";
import { classNames } from "primereact/utils";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Tag } from "primereact/tag";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { MdClose } from "react-icons/md";
import "../App.css";
import axios from "axios";

import "primereact/resources/themes/lara-light-cyan/theme.css";

// Data provided by you
// const data = [
//     {
//         "requestId": "240302203601062",
//         "studentId": "202001062",
//         "contactNo": "9876543210",
//         "time": "2024-03-03T04:36:45.000+00:00",
//         "amountPaid": 190.0,
//         "deliveryMod": "On Campus",
//         "transactionId": null,
//         "status": "Pending"
//     },
//     {
//         "requestId": "240302211122333",
//         "studentId": "111222333",
//         "contactNo": "6970717273",
//         "time": "2024-03-03T05:11:32.000+00:00",
//         "amountPaid": 70000.0,
//         "deliveryMod": "On Campus",
//         "transactionId": null,
//         "status": "Pending"
//     },
//     {
//         "requestId": "240302211496969",
//         "studentId": "696969",
//         "contactNo": "9898278981",
//         "time": "2024-03-03T05:14:24.000+00:00",
//         "amountPaid": 702500.0,
//         "deliveryMod": "Outside India",
//         "transactionId": null,
//         "status": "Pending"
//     }
// ];

const BasicFilterDemo = ({ data }) => {
  // const [customers, setCustomers] = useState(null);
  const [Data, setData] = useState(data);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    studentId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    contactNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    // representative: { value: null, matchMode: FilterMatchMode.IN },
    // g: { value: null, matchMode: FilterMatchMode.EQUALS },
    status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    deliveryMod: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    transactionId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });
  const [rejectedReasonVisibility, setRejectedReasonVisibility] =
    useState(false);
  const [loading, setLoading] = useState(true);
  const [forDocument, setForDocument] = useState(false);
  const [forStatus, setForStatus] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [studentId, setStudentId] = useState("");
  const [statusRequestId, setStatusRequestId] = useState("");
  const [modeOfDelivery, setModeOfDelivery] = useState("");
  const [status, setStatus] = useState("");
  const [requestUpdateLogData, setRequestUpdateLogData] = useState([]);
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [adminName, setAdminName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [documentData, setDocumentData] = useState([]);
  const [trackingId, setTrackingId] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [postalDate, setPostalDate] = useState("");
  const [postAddress, setPostAddress] = useState("");
  const [postData, setPostData] = useState([]);
  const [email, setEmail] = useState("");
  const [remarks, setRemarks] = useState("");

  // const [representatives] = useState([

  //     { name: 'Amy Elsner', image: 'amyelsner.png' },
  //     { name: 'Anna Fali', image: 'annafali.png' },
  //     { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
  //     { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
  //     { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
  //     { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
  //     { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
  //     { name: 'Onyama Limba', image: 'onyamalimba.png' },
  //     { name: 'Stephen Shaw', image: 'stephenshaw.png' },
  //     { name: 'XuXue Feng', image: 'xuxuefeng.png' }
  // ]);
  const [statuses] = useState([
    "unqualified",
    "qualified",
    "new",
    "negotiation",
    "renewal",
  ]);

  const handleSelectChange = async (e) => {
    console.log("Selected:", e.target.value);
    if (e.target.value === "Rejected" || e.target.value === "Pending") {
      await setRejectedReasonVisibility(true);
    } else {
      await setRejectedReasonVisibility(false);
    }
    setSelectedStatus(e.target.value);
  };

  const setModalVisibility = (value) => {
    // setModalVisibility(value);
    document.getElementById("modal").style.display = value ? "flex" : "none";
  };

  const handleUpdateBtn = async () => {
    console.log("Selected status:", selectedStatus);
    console.log("Status:", status);
    try {
      if (selectedStatus === "") {
        // alert("Please select a different status to update");
        // return;
        await setSelectedStatus(status);
      }
      const response = await axios.put(
        `https://documents.daiict.ac.in/request/status/update`,
        {
          requestId: statusRequestId,
          status: selectedStatus,
          remarks: remarks,
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

  const retriveData = async () => {
    const adminName = await localStorage.getItem("adminName");
    setAdminName(adminName);
    setLoading(false);
  };

  useEffect(() => {
    // Simulating API call to fetch data
    // setCustomers(customersData);
    retriveData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getSeverity = (status) => {
    switch (status) {
      case "unqualified":
        return "danger";

      case "qualified":
        return "success";

      case "new":
        return "info";

      case "negotiation":
        return "warning";

      case "renewal":
        return null;
      default:
        return null;
    }
  };

  const handleStatusUpdateDisplay = async (
    Status,
    requestId,
    deliveryMode,
    studentId, email, remarks
  ) => {
    console.log("Status:", Status);
    console.log("Request ID:", requestId);
    console.log("Delivery Mode:", deliveryMode);
    console.log("Student ID:", studentId);
    console.log(remarks);

    if (Status === "Rejected" || Status === "Pending") {
      setRejectedReasonVisibility(true);
    } else {
      setRejectedReasonVisibility(false);
    }
    setForDocument(false);
    setModalVisibility(true);
    setForStatus(true);
    await setRemarks(remarks);
    await setStudentId(studentId);
    await setStatusRequestId(requestId);
    await setModeOfDelivery(deliveryMode);
    console.log("Status:", requestId);
    await setStatus(Status);
    await setSelectedStatus(Status);
    await setEmail(email);
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

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
    );
  };

  const timeTodateBody = (row) => {
    return <>{new Date(row.time).toLocaleDateString()}</>;
  };

  const header = renderHeader();

  const StatusBody = (rowdata) => {
    if (rowdata.status == "Pending") {
      return (
        <button
          className="adminDocsBtn pendingColor"
          onClick={() => {
            handleStatusUpdateDisplay(
              rowdata.status,
              rowdata.requestId,
              rowdata.deliveryMod,
              rowdata.studentId,
              rowdata.email,
              rowdata.remarks
            );
          }}
        >
          {rowdata.status}
        </button>
      );
    } else if (rowdata.status == "Issued") {
      return (
        <button
          className="adminDocsBtn issuedColor"
          onClick={() => {
            handleStatusUpdateDisplay(
              rowdata.status,
              rowdata.requestId,
              rowdata.deliveryMod,
              rowdata.studentId,
              rowdata.email,
              rowdata.remarks
            );
          }}
        >
          {rowdata.status}
        </button>
      );
    } else if (rowdata.status == "Collected" || rowdata.status == "Posted") {
      return (
        <button
          className="adminDocsBtn completedColor"
          onClick={() => {
            handleStatusUpdateDisplay(
              rowdata.status,
              rowdata.requestId,
              rowdata.deliveryMod,
              rowdata.studentId,
              rowdata.email,
              rowdata.remarks
            );
          }}
        >
          {rowdata.status}
        </button>
      );
    } else {
      return (
        <button
          className="adminDocsBtn rejectedColor"
          onClick={() => {
            handleStatusUpdateDisplay(
              rowdata.status,
              rowdata.requestId,
              rowdata.deliveryMod,
              rowdata.studentId,
              rowdata.email,
              rowdata.remarks
            );
          }}
        >
          {rowdata.status}
        </button>
      );
    }
  };

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

  const DocumentBody = (rowdata) => {
    return (
      <button
        className="adminDocsBtn"
        onClick={() => {
          handleDisplayDocs(rowdata.requestId, rowdata.studentId);
        }}
      >
        Docs
      </button>
    );
  };

  const handleEnableAddressEdit = () => {
    const addressInput = document.getElementById("address");
    if (addressInput.disabled === false) {
      addressInput.disabled = true;
    } else {
      addressInput.disabled = false;
    }
  };

  const handlePostedSubmitBtn = async () => {
    console.log("Tracking ID:", trackingId);
    console.log("Agency Name:", agencyName);
    console.log("Posted Date:", postalDate);
    console.log("Address:", postAddress);
    console.log("RequestId", postData.requestId);

    // const date = new Date(postalDate);
    // console.log("Date:", date);

    if (trackingId === "" || agencyName === "" || postalDate === "") {
      alert("Please fill all the details");
      return;
    }

    try {
      const response = await axios.put(
        `https://documents.daiict.ac.in/post/update`,
        {
          requestId: postData.requestId,
          trackingId: trackingId,
          agencyName: agencyName,
          postTime: postalDate,
          address: postAddress,
        }
      );
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

  const handleDisplayPost = async (requestId, studentId, email) => {
    await setStudentId(studentId);
    await setEmail(email);
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

  const PostBody = (row) => {
    return (
      <>
        {row.deliveryMod !== "On Campus" ? (
          <button
            className="adminDocsBtn"
            onClick={() => {
              handleDisplayPost(row.requestId, row.studentId, row.email);
            }}
          >
            Post
          </button>
        ) : (
          <p> </p>
        )}
      </>
    );
  };

  return (
    <>
      <div className="card">
        <DataTable
          value={data}
          paginator
          rows={50}
          dataKey="requestId"
          filters={filters}
          filterDisplay="row"
          loading={loading}
          rowsPerPageOptions={[50, 100, 150, 200]}
          showGridlines
          globalFilterFields={[
            "studentId",
            "contactNo",
            "amountPaid",
            "deliveryMod",
            "status",
            "transactionId"
          ]}
          emptyMessage="No Data found."
        >
          <Column
            sortable
            field="requestId"
            header="Request ID"
            // filter
            // filterPlaceholder="Search by student ID"
            style={{ minWidth: "7rem", padding: "5px", paddingRight: "5px" }}
          />
          <Column
            sortable
            field="studentId"
            header="Student ID"
            filter
            filterPlaceholder="Search by student ID"
            style={{ minWidth: "7rem", padding: "5px", paddingRight: "5px" }}
          />
          <Column
            sortable
            field="email"
            header="Email"
            style={{ minWidth: "7rem", padding: "5px", paddingRight: "5px" }}
          />
          <Column
            sortable
            field="contactNo"
            header="Contact No"
            filter
            filterPlaceholder="Search by contact No"
            style={{ minWidth: "7rem", padding: "5px", paddingRight: "5px" }}
          />
          <Column
            sortable
            field="transactionId"
            header="Transaction ID"
            filter
            filterPlaceholder="Search"
            style={{ minWidth: "7rem", padding: "5px", paddingRight: "5px" }}
          />
          <Column
            // body={timeTodateBody}
            field="newDate"
            header="Requested time"
            // sortable
            // filter
            style={{ minWidth: "7rem", padding: "5px", paddingRight: "5px" }}
          />
          <Column
            field="amountPaid"
            header="Charges"
            style={{ minWidth: "5rem", padding: "5px", paddingRight: "5px" }}
          />
          <Column
            sortable
            field="deliveryMod"
            header="Delivery"
            filter
            filterPlaceholder="Search by Delivery"
            style={{ minWidth: "7rem", padding: "5px", paddingRight: "5px" }}
          />
          <Column
            sortable
            body={StatusBody}
            header="Status"
            filter
            filterPlaceholder="Search"
            style={{ minWidth: "5rem", padding: "5px", paddingRight: "5px" }}
          />
          <Column body={DocumentBody} header="Documents" style={{ minWidth: "7rem", padding: "5px", paddingRight: "5px" }} />
          <Column body={PostBody} header="Post" style={{ minWidth: "7rem", padding: "5px", paddingRight: "5px" }} />
        </DataTable>
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
            {forDocument ? <h3>Documents appilied for</h3> : null}
            {forStatus ? <h3>Update Status</h3> : null}
            {!forDocument && !forStatus ? <h3>Postal Details</h3> : null}
            StudentID: {studentId}
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  {forDocument ? (
                    <>
                      <th style={{
                        margin: "10px",
                      }}>
                        Document Name
                        {/* <hr style={{ margin: "5px 0 10px 0" }} /> */}
                      </th>
                      <th>
                        No. of Copies
                        {/* <hr style={{ margin: "5px 0 10px 0" }} /> */}
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
                                defaultValue={remarks}
                                onChange={(e) => {
                                  setRemarks(e.target.value);
                                }}
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

export default BasicFilterDemo;
