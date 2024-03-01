import React, { useEffect } from "react";
import StudentNavBar from "../components/StudentNavBar.tsx";
import "../App.css";
import { Link } from "react-router-dom";
// import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

// student Document Service Dashboard
const StudentDSD = () => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [selectedItems, setSelectedItems] = React.useState([]); // Use this to store the selected items
  const [numberOfCopies, setNumberOfCopies] = React.useState({});
  const [studentId, setStudentId] = React.useState<number>(0);
  const [email, setEmail] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [data, setDocs] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [nextPressed, setNextPressed] = React.useState<boolean>(false);
  const [totalCost, setTotalCost] = React.useState<number>(0);
  const [modeOfDelivery, setModeOfDelivery] = React.useState<string>("");
  const [deliveryCharges, setDeliveryCharges] = React.useState<number>(0);
  const [contactNo, setContactNo] = React.useState<string>("");
  const [address, setAddress] = React.useState<string>("");
  var totalAmountPaid = 0;

  const handleCheckboxChange = (index) => {
    setSelectedRows((prevRows) =>
      prevRows.includes(index)
        ? prevRows.filter((row) => row !== index)
        : [...prevRows, index]
    );
  };

  const handleInputChange = (index, value) => {
    setNumberOfCopies((prevCopies) => ({ ...prevCopies, [index]: value }));
  };

  const getSelectedDocuments = () => {
    const selectedDocs = [];
    var cost = 0;
    for (let i = 0; i < data.length; i++) {
      if (selectedRows.includes(i)) {
        const doc = {
          documentId: data[i].documentId, // assuming there's a documentId property
          documentName: data[i].documentName,
          documentCost: data[i].documentCost,
          noOfCopies: numberOfCopies[i] || 0, // handle missing values
        };
        cost += doc.noOfCopies * doc.documentCost;
        selectedDocs.push(doc);
      }
    }
    totalAmountPaid = cost;
    console.log("Total amount paid:", totalAmountPaid);

    setTotalCost(totalAmountPaid);

    setSelectedItems(selectedDocs);
    // window.location.href = `/student/dsd/${selectedItems}`;
    setNextPressed(true);

    // return selectedDocs;
  };

  const retriveData = async () => {
    const studentId = localStorage.getItem("studentId");
    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name");
    if (studentId && email && name) {
      setStudentId(parseInt(studentId));
      setEmail(email);
      setName(name);
    }
    console.log("Student ID:", studentId);
    console.log("Email:", email);
    console.log("Name:", name);
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://10.100.56.153:8080/document/getall",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      console.log("Response:", response.data);
      await setDocs(response.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
      alert(
        "There was an error trying to fetch documents. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const studentId = localStorage.getItem("studentId");
    if (!studentId) {
      window.location.href = "/student/login";
    }
    retriveData();
  }, []);

  const handleModeOfDeliveryChange = async (value) => {
    var cost = -1;
    totalAmountPaid = totalCost;
    if (value === "On Campus") {
      document.getElementById("address").disabled = true;
      if (modeOfDelivery === "Inside India") {
        // If mode of delivery was previously inside India
        totalAmountPaid -= 130;
        // await setTotalCost(TotalCost);
        console.log(totalCost);
      } else if (modeOfDelivery === "Outside India") {
        // If mode of delivery was previously outside India
        totalAmountPaid -= 2500;
        // await setTotalCost(TotalCost);
        console.log(totalAmountPaid);
      }

      cost = 0;
    } else if (value === "Inside India") {
      document.getElementById("address").disabled = false;
      if (modeOfDelivery === "On Campus") {
        // If mode of delivery was previously on campus
        totalAmountPaid -= 0;
        // await setTotalCost(totalCost - 0);
        console.log(totalAmountPaid);
      } else if (modeOfDelivery === "Outside India") {
        // If mode of delivery was previously outside India
        totalAmountPaid -= 2500;
        // const TotalCost = totalCost - 2500;
        // await setTotalCost(tota);
        console.log(totalAmountPaid);
      }

      cost = 130;
    } else if (value === "Outside India") {
      document.getElementById("address").disabled = false;
      if (modeOfDelivery === "On Campus") {
        // If mode of delivery was previously on campus
        // await setTotalCost(totalCost - 0);
        console.log(totalCost);
      } else if (modeOfDelivery === "Inside India") {
        // If mode of delivery was previously inside India
        totalAmountPaid -= 130;
        /// const TotalCost = totalCost - 130;
        // await setTotalCost(TotalCost);
        console.log(totalAmountPaid);
      }
      cost = 2500;
    }
    if (cost === -1) {
      if (modeOfDelivery === "Inside India") {
        await setTotalCost(totalCost - 130);
      } else if (modeOfDelivery === "Outside India") {
        await setTotalCost(totalCost - 2500);
      }
      await setModeOfDelivery("");
      return;
    }
    // await setTotalCost(totalCost + cost);
    totalAmountPaid += cost;
    setTotalCost(totalAmountPaid);
    await setModeOfDelivery(value);
    if(value === "On Campus"){
      setDeliveryCharges(0);
    } else if(value === "Inside India"){
      setDeliveryCharges(130);
    } else if(value === "Outside India"){
      setDeliveryCharges(2500);
    }
    console.log("Mode of delivery:", value);
  };

  const handlePayment = async () => {
    if (modeOfDelivery === "" || modeOfDelivery === "Select") {
      alert("Please select mode of delivery");
      return;
    } else if (contactNo === "") {
      alert("Please enter contact number");
      return;
    } else if (contactNo.length !== 10) {
      alert("Please enter a valid contact number");
      return;
    } else if (
      modeOfDelivery !== "On Campus" &&
      document.getElementById("address").value === ""
    ) {
      alert("Please enter address");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post("http://10.100.56.153:8080/request/add", {
        studentId: studentId,
        deliveryMod: modeOfDelivery,
        contactNo: contactNo,
        amountPaid: totalCost,
      });
      for(let i = 0; i < selectedItems.length; i++){
        const response1 = await axios.post(
          "http://10.100.56.153:8080/requestedDocuments/add",
          {
            requestId: response.data.requestId,
            documentId: selectedItems[i].documentId,
            no_of_copies: selectedItems[i].noOfCopies,
          }
        );
      }
      if(modeOfDelivery === "On Campus"){
        alert("Request placed successfully. You can collect the documents from the college office.");
      } else {
        const response2 = await axios.post("http://10.100.56.153:8080/post/add", {
          requestId: response.data.requestId,
          address: address,
        });
        alert("Request placed successfully. You will receive the documents at the given address.");
      }
      window.location.href = "/student/dsd";
    } catch (error) {
      console.error("Error sending payment request:", error);
      alert(
        "There was an error trying to make payment. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  //  console.log(localStorage.getItem("name"));

  return (
    <>
      <StudentNavBar />
      <div className="container">
        <div className="studentDSDContainer">
          <div className="studentDetailsContainer">
            <p>
              <b>Student name:</b> {name}
            </p>
            <p>
              <b>Student ID: </b>
              {studentId}
            </p>
          </div>

          {nextPressed && !isLoading ? (
            <>
              <div className="deliveryContainer">
                <div className="deliverySelectModeOfDelivery">
                  <label htmlFor="modeOfDelivery">Mode of Delivery: </label>
                  <select
                    name="modeOfDelivery"
                    id="modeOfDelivery"
                    className="modeofDeliverySelect"
                    onChange={(e) => handleModeOfDeliveryChange(e.target.value)}
                  >
                    <option value="Select">Select</option>
                    <option value="On Campus">On Campus (0 INR)</option>
                    <option value="Inside India">Inside India (130 INR)</option>
                    <option value="Outside India">
                      Outside India (2500 INR)
                    </option>
                  </select>
                </div>
                <div className="deliveryAddress">
                  <label htmlFor="address">Address: </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="deliveryAddressInputBar"
                    placeholder="Enter Address"
                    disabled={true}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="deliveryAddress">
                  <label htmlFor="contact">Contact number: </label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    className="deliveryAddressInputBar"
                    placeholder="Enter Contact Number"
                    onChange={(e) => setContactNo(e.target.value)}
                  />
                </div>
              </div>
              <div className="selectedDocumentDetails">
                <div className="selectedDocumentDetailsTitle">
                  Selected Documents
                </div>
                <div className="selectedDocumentsTable">
                  <table style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        <th>
                          Name
                          <hr style={{ margin: "5px 0 10px 0" }} />
                        </th>
                        <th>
                          Cost
                          <hr style={{ margin: "5px 0 10px 0" }} />
                        </th>
                        <th>
                          No of Copies
                          <hr style={{ margin: "5px 0 10px 0" }} />
                        </th>
                        <th>
                          Total Cost
                          <hr style={{ margin: "5px 0 10px 0" }} />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedItems.map((row, index) => (
                        <tr key={row.documentId || index}>
                          <td>
                            <p style={{ marginBottom: "10px" }}>
                              {row.documentName}
                            </p>
                          </td>
                          <td>
                            <p style={{ marginBottom: "10px" }}>
                              {row.documentCost}
                            </p>
                          </td>
                          <td>
                            <p style={{ marginBottom: "10px" }}>
                              {row.noOfCopies}
                            </p>
                          </td>
                          <td>
                            <p style={{ marginBottom: "10px" }}>
                              {row.noOfCopies * row.documentCost} INR
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="selectedDocumentTotalCost">
                  (Including {modeOfDelivery}({deliveryCharges}))Total Cost: {totalCost} INR
                </div>
              </div>
              <div className="studentDocumentSubmit">
                <button
                  type="button"
                  className="studentSelectedDocsBackBtn"
                  onClick={() => {
                    setNextPressed(false);
                  }}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="studentSelectedDocsPayBtn"
                  onClick={() => handlePayment()}
                >
                  Pay
                </button>
              </div>
            </>
          ) : null}

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
          {
            !isLoading && !nextPressed ? (
              <>
                <div className="studentDocumentDetails">
                  <div className="studentDocument">
                    <table style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          <th>
                            Select
                            <hr style={{ margin: "5px 0 10px 0" }} />
                          </th>
                          <th>
                            Name
                            <hr style={{ margin: "5px 0 10px 0" }} />
                          </th>
                          <th>
                            Cost
                            <hr style={{ margin: "5px 0 10px 0" }} />
                          </th>
                          <th>
                            No. of copies
                            <hr style={{ margin: "5px 0 10px 0" }} />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((row, index) => (
                          <tr key={row.uniqueId || index}>
                            <td>
                              <input
                                type="checkbox"
                                style={{ marginBottom: "10px" }}
                                checked={selectedRows.includes(index)} // Use uniqueId if applicable
                                onChange={() => handleCheckboxChange(index)}
                              />
                            </td>
                            <td>
                              <p style={{ marginBottom: "10px" }}>
                                {row.documentName}
                              </p>
                            </td>
                            <td>
                              <p style={{ marginBottom: "10px" }}>
                                {row.documentCost}
                              </p>
                            </td>
                            <td>
                              <input
                                className="tableInputField"
                                type="number"
                                placeholder="0"
                                value={numberOfCopies[index]}
                                style={{
                                  width: "1.5rem",
                                  marginBottom: "10px",
                                }}
                                // value={} // Use uniqueId if applicable
                                onChange={(e) =>
                                  handleInputChange(index, e.target.value)
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="studentDocumentSubmit">
                  <button
                    type="button"
                    className="studentDSDBtn"
                    onClick={() => getSelectedDocuments()}
                  >
                    Next
                  </button>
                </div>
              </>
            ) : null // Add a spinner here
          }
        </div>
      </div>
    </>
  );
};

export default StudentDSD;
