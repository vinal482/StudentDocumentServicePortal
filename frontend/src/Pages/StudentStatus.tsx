import React from "react";
import StudentNavBar from "../components/StudentNavBar.tsx";
import "../App.css";
import { TailSpin } from "react-loader-spinner";
import { MdClose } from "react-icons/md";
import axios from "axios";

const StudentStatus = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState([]); // Replace with actual data
  const [studentId, setStudentId] = React.useState(""); // Replace with actual data
  const [documentData, setDocumentData] = React.useState([]); // Replace with actual data
  const [postalDetails, setPostalDetails] = React.useState([]); // Replace with actual data
  const [forDocs, setForDocs] = React.useState<boolean>(false); // Replace with actual data
  const [forPostal, setForPostal] = React.useState<boolean>(false); // Replace with actual data
  const [forPayment, setForPayment] = React.useState<boolean>(false); // Replace with actual data
  const [transactionId, setTransactionId] = React.useState(""); // Replace with actual data
  const [amountPaid, setAmountPaid] = React.useState(""); // Replace with actual data

  const setModalVisibility = (value) => {
    // setModalVisibility(value);
    document.getElementById("modal").style.display = value ? "flex" : "none";
  };

  const retriveData = async () => {
    setIsLoading(true);
    const studentId = localStorage.getItem("studentId");
    if (!studentId) {
      window.location.href = "/student/login";
    }

    try {
      const response = await fetch(
        `http://localhost:8080/request/getByStudentId?studentId=${studentId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("Response:", response);
      const data = await response.json();
      await setData(data);
      console.log("Data:", data);

      // console.log("Data:", data);
    } catch (error) {
      console.error("Error fetching student data:", error);
      alert(
        "There was an error trying to fetch student data. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisplayDocuments = async (requestId) => {
    setForDocs(true);
    setForPostal(false);
    setIsLoading(true);
    setForPayment(false);
    try {
      const documentResponse = await axios.get(
        `http://localhost:8080/requestedDocuments/get?requestId=${requestId}`
      );
      const documentData = await documentResponse.data;

      for (let i = 0; i < documentData.length; i++) {
        const response = await axios.get(
          `http://localhost:8080/document/get?documentId=${documentData[i].documentId}`
        );
        const data = await response.data;
        documentData[i].documentName = data.documentName;
      }

      await setDocumentData(documentData);
      console.log("Document Data:", documentData);
    } catch (error) {
      console.error("Error fetching student data:", error);
      alert(
        "There was an error trying to fetch student data. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
    setModalVisibility(true);
  };

  const handleDisplayPost = async (requestId) => {
    setIsLoading(true);
    setForDocs(false);
    setForPostal(true);
    setForPayment(false);
    try {
      const response = await axios.get(
        `http://localhost:8080/post/get?requestId=${requestId}`
      );

      const data = await response.data;
      console.log("Post Data:", data);
      // setDocumentData(data);
      await setPostalDetails(data);
    } catch (error) {
      console.error("Error fetching post details:", error);
      alert(
        "There was an error trying to fetch post details. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
    setModalVisibility(true);
  };

  const handleDisplayPayment = async (requestId, transactionId, amountPaid) => {
    setIsLoading(true);
    setForDocs(false);
    setForPostal(false);
    setForPayment(false);
    try {
      await setTransactionId(transactionId);
      await setAmountPaid(amountPaid);
    } catch (error) {
      console.error("Error fetching payment details:", error);
      alert(
        "There was an error trying to fetch payment details. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
    setModalVisibility(true);
    setForPayment(true);
  };

  React.useEffect(() => {
    retriveData();
  }, []);
  return (
    <>
      <StudentNavBar />
      <div className="container">
        <div className="studentStatusContainer">
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
          ) : (
            <>
              <div className="studentDashboardTableContainer">
                <table className="studentDashboardTable">
                  <thead>
                    <tr>
                      <th>
                        Request ID
                        <hr
                          style={{ marginBottom: "10px", marginTop: "5px" }}
                        />
                      </th>
                      <th>
                        Requested Date
                        <hr
                          style={{ marginBottom: "10px", marginTop: "5px" }}
                        />
                      </th>
                      <th>
                        Mode of Delivery
                        <hr
                          style={{ marginBottom: "10px", marginTop: "5px" }}
                        />
                      </th>
                      <th>
                        Contact no.
                        <hr
                          style={{ marginBottom: "10px", marginTop: "5px" }}
                        />
                      </th>
                      <th>
                        Document Status
                        <hr
                          style={{ marginBottom: "10px", marginTop: "5px" }}
                        />
                      </th>
                      <th>
                        Payment details
                        <hr
                          style={{ marginBottom: "10px", marginTop: "5px" }}
                        />
                      </th>
                      <th>
                        Documents
                        <hr
                          style={{ marginBottom: "10px", marginTop: "5px" }}
                        />
                      </th>
                      <th>
                        Post
                        <hr
                          style={{ marginBottom: "10px", marginTop: "5px" }}
                        />
                      </th>
                    </tr>
                    {data.map((req) => {
                      return (
                        <tr>
                          <td>
                            {req.requestId}
                            <div style={{ marginBottom: "10px" }} />
                          </td>
                          <td>
                            {new Date(req.time).toLocaleDateString()}{" "}
                            <div style={{ marginBottom: "10px" }} />
                          </td>
                          <td>
                            {req.deliveryMod}
                            <div style={{ marginBottom: "10px" }} />
                          </td>
                          <td>
                            {req.contactNo}
                            <div style={{ marginBottom: "10px" }} />
                          </td>
                          <td>
                            {req.status === "Pending" ? (
                              <p style={{ color: "#E77C40" }}>{req.status}</p>
                            ) : null}
                            {req.status === "Issued" ? (
                              <p style={{ color: "#1E63BB" }}>{req.status}</p>
                            ) : null}
                            {req.status === "Posted" ||
                            req.status === "Collected" ? (
                              <p style={{ color: "#197F2F" }}>{req.status}</p>
                            ) : null}
                            {req.status === "Rejected" ? (
                              <p style={{ color: "red" }}>{req.status}</p>
                            ) : null}
                            <div style={{ marginBottom: "10px" }} />
                          </td>
                          <td>
                            <button
                              className="studentDashboardBtn"
                              onClick={() => {
                                handleDisplayPayment(
                                  req.requestId,
                                  req.transactionId,
                                  req.amountPaid
                                );
                              }}
                            >
                              Payment details
                            </button>
                          </td>
                          <td>
                            <button
                              className="studentDashboardBtn"
                              onClick={() => {
                                handleDisplayDocuments(req.requestId);
                              }}
                            >
                              Docs
                            </button>
                          </td>
                          {req.deliveryMod !== "On Campus" ? (
                            <td>
                              <button
                                className="studentDashboardBtn"
                                onClick={() => {
                                  handleDisplayPost(req.requestId);
                                }}
                              >
                                Post
                              </button>
                            </td>
                          ) : (
                            <td></td>
                          )}
                        </tr>
                      );
                    })}
                  </thead>
                </table>
              </div>
            </>
          )}
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
                {forDocs ? <h3>Documents appilied for: </h3> : null}
                {forPostal ? <h3>Postal Details</h3> : null}
                {forPayment ? <h3>Payment Details</h3> : null}
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
                {!isLoading && forDocs ? (
                  <table className="modalTable">
                    <thead>
                      <tr>
                        <th>
                          Document Name
                          <hr
                            style={{
                              marginBottom: "10px",
                              marginTop: "5px",
                            }}
                          />
                        </th>
                        <th>
                          No of Copies
                          <hr
                            style={{
                              marginBottom: "10px",
                              marginTop: "5px",
                            }}
                          />
                        </th>
                      </tr>
                      {documentData.map((doc) => {
                        return (
                          <tr>
                            <td>
                              {doc.documentName}
                              <div style={{ marginBottom: "10px" }} />
                            </td>
                            <td>
                              {doc.no_of_copies}
                              <div style={{ marginBottom: "10px" }} />
                            </td>
                          </tr>
                        );
                      })}
                    </thead>
                  </table>
                ) : null}
                {!isLoading && forPostal ? (
                  <>
                    <hr style={{ marginBottom: "10px", background: "black" }} />
                    <div
                      className="postDetailsBelowStatusUpdate"
                      id="postDetailsBelowStatusUpdate"
                    >
                      <p>
                        <b>Tracking ID:</b> {postalDetails.trackingId}
                      </p>
                      <p>
                        <b>Address:</b> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
                        {postalDetails.address}
                      </p>
                      <p>
                        <b>Agency name:</b> {postalDetails.agencyName}
                      </p>
                      <p>
                        <b>Posted date:</b> {postalDetails.postTime}
                      </p>
                    </div>
                  </>
                ) : null}
                {!isLoading && forPayment ? (
                  <>
                    <div
                      className="postDetailsBelowStatusUpdate"
                      id="postDetailsBelowStatusUpdate"
                    >
                      <hr
                        style={{
                          marginBottom: "10px",
                          background: "black",
                          width: "100%",
                        }}
                      />
                      <p>
                        <b>Transaction ID:</b> {transactionId}
                      </p>
                      <p>
                        <b>Time:</b> 
                      </p>
                      <p>
                        <b>Charges:</b> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        &nbsp; {amountPaid} INR
                      </p>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentStatus;
