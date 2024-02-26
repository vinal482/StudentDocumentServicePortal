import React, { useState } from "react";
import "../App.css";
import axios from "axios";

const Table = ({ data }) => {
  // const [modalVisibility, setModalVisibility] = useState(false);
  const [documentData, setDocumentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [forDocument, setForDocument] = useState(false);
  const [postData, setPostData] = useState([]);
  // First, handle the empty data case outside the component, to prevent the hook from being called conditionally
  if (!data || !Array.isArray(data) || !data.length) {
    return <p>No data to display.</p>;
  }

  const columnNames = Object.keys(data[0]);

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
    try {
      const response = await axios.get(
        `http://localhost:8080/post/get?requestId=${requestId}`
      );

      const data = await response.data;
      console.log("Post Data:", data);
      setDocumentData(data);
    } catch (error) {
      console.error("Error fetching post details:", error);
      alert(
        "There was an error trying to fetch post details. Please try again later."
      );
    } finally {
      setIsLoading(false);
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
        </tbody>
      </table>
      <div
        className="modalCont"
        id="modal"
        onClick={() => {
          setModalVisibility(0);
        }}
      >
        <div
          className="modal"
          onClick={() => {
            setModalVisibility(1);
          }}
        >
          <div className="modalContent">
            <span
              className="close"
              onClick={() => {
                setModalVisibility(false);
              }}
            >
              &times;
            </span>
            <h2>Documents</h2>
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
                  ) : (
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
                  )}
                </tr>
              </thead>
              <tbody>
                {documentData.map((row, index) => (
                  <tr key={row.documentId || index}>
                    {forDocument ? (
                      <>
                        <td>
                          {row.documentId}
                          <div style={{ marginBottom: "10px" }} />
                        </td>
                        <td>
                          {row.no_of_copies}
                          <div style={{ marginBottom: "10px" }} />
                        </td>
                      </>
                    ) : (
                      <>
                        <td>
                          {row.Address}
                          <div style={{ marginBottom: "10px" }} />
                        </td>
                        <td>
                          {row.postTime}
                          <div style={{ marginBottom: "10px" }} />
                        </td>
                        <td>
                          {row.agencyName}
                          <div style={{ marginBottom: "10px" }} />
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
