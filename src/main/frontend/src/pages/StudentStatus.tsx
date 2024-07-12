import React from "react";
import StudentNavBar from "../components/StudentNavBar.tsx";
import "../App.css";
import { TailSpin } from "react-loader-spinner";
import { MdClose } from "react-icons/md";
import axios from "axios";
import MyDocument from "../components/Document.tsx";
import { PDFDownloadLink } from '@react-pdf/renderer';

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
  const [transactionTime, setTransactionTime] = React.useState("");
  const [transactionDate, setTransactionDate] = React.useState("");
  const [name, setName] = React.useState("");
  const [id, setId] = React.useState("");

  const setModalVisibility = (value) => {
    // setModalVisibility(value);
    document.getElementById("modal").style.display = value ? "flex" : "none";
  };

  const retriveData = async () => {
    setIsLoading(true);
    const studentId = localStorage.getItem("studentId");
    setId(studentId);
    const name = localStorage.getItem("name");
    setName(name);
    if (!studentId) {
      window.location.href = "../student/login";
    }

    try {
      const response = await fetch(
        `https://documents.daiict.ac.in/request/getByStudentId?studentId=${studentId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("Response:", response);
      let data = await response.json();
      data = data.reverse();
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
        `https://documents.daiict.ac.in/post/get?requestId=${requestId}`
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

  const handleDisplayPayment = async (requestId, transactionId, amountPaid, transactionTime) => {
    setIsLoading(true);
    setForDocs(false);
    setForPostal(false);
    setForPayment(false);
    try {
      await setTransactionId(transactionId);
      await setAmountPaid(amountPaid);
      const date = new Date(transactionTime);
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
      await setTransactionTime(formattedTime);
      await setTransactionDate(formattedDate);
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
    document.title = "Statusboard";
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
                        <p style={{ margin: "5px 5px 10px 5px" }} >
                          Request ID
                        </p>
                      </th>
                      <th>
                        <p style={{ margin: "5px 5px 10px 5px" }} >
                          Requested Date
                        </p>
                      </th>
                      <th>
                        <p style={{ margin: "5px 5px 10px 5px" }} >
                          Mode of Delivery
                        </p>
                      </th>
                      <th>
                        <p style={{ margin: "5px 5px 10px 5px" }} >
                          Contact no.
                        </p>
                      </th>
                      <th>
                        <p style={{ margin: "5px 5px 10px 5px" }} >
                          Document Status
                        </p>
                      </th>
                      <th>
                        <p style={{ margin: "5px 5px 10px 5px" }} >
                          Remarks
                        </p>
                      </th>
                      <th>
                        <p style={{ margin: "5px 5px 10px 5px" }} >
                          Payment details
                        </p>
                      </th>
                      <th>
                        <p style={{ margin: "5px 5px 10px 5px" }} >
                          Documents
                        </p>
                      </th>
                      <th>
                        <p style={{ margin: "5px 5px 10px 5px" }} >
                          Post
                        </p>
                      </th>
                    </tr>
                    {data.map((req) => {
                      return (
                        <tr>
                          <td>
                            <p style={{ margin: "5px 5px 10px 5px" }} >
                              {req.requestId}
                            </p>
                            <div style={{ marginBottom: "10px" }} />
                          </td>
                          <td>
                            <p style={{ margin: "5px 5px 10px 5px" }} >
                              {new Date(req.time).toLocaleDateString()}{" "}
                            </p>
                            <div style={{ marginBottom: "10px" }} />
                          </td>
                          <td>
                            <p style={{ margin: "5px 5px 10px 5px" }} >
                              {req.deliveryMod}
                            </p>
                            <div style={{ marginBottom: "10px" }} />
                          </td>
                          <td>
                            <p style={{ margin: "5px 5px 10px 5px" }} >
                              {req.contactNo}
                            </p>
                            <div style={{ marginBottom: "10px" }} />
                          </td>
                          <td>
                            <p style={{ margin: "5px 5px 10px 5px" }} >
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
                            </p>
                            <div style={{ marginBottom: "10px" }} />
                          </td>
                          <td>
                            <button
                              className="studentDashboardBtn"
                              onClick={() => {
                                alert("Remarks: " + req.remarks);
                              }}
                              style={{ margin: "5px 5px 10px 5px" }}
                            >
                              Remarks
                            </button>
                          </td>
                          <td>
                            <button
                              style={{ margin: "5px 5px 10px 5px" }}
                              className="studentDashboardBtn"
                              onClick={() => {
                                handleDisplayPayment(
                                  req.requestId,
                                  req.transactionId,
                                  req.amountPaid,
                                  req.transactionTime
                                );
                              }}
                            >
                              Details
                            </button>
                          </td>
                          <td>
                            <button
                              style={{ margin: "5px 5px 10px 5px" }}
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
                                style={{ margin: "5px 5px 10px 5px" }}
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
                        <th>
                          Download
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
                            <td>
                              {
                                doc.documentName === "Bonafide Student Certificate" ?
                                  (<PDFDownloadLink document={<MyDocument data={{ name: `${name}`, id: `${id}` }} />} fileName="fee_acceptance.pdf">
                                    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
                                  </PDFDownloadLink>) : null
                              }
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
                        <b>Date: </b> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {" "}{transactionDate}
                      </p>
                      <p>
                        <b>Time:</b> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {transactionTime}
                      </p>
                      <p>
                        <b>Transaction ID:</b> &nbsp; {transactionId}
                      </p>
                      <p>
                        <b>Charges:</b> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
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
