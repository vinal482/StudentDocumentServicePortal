import React from "react";
import StudentNavBar from "../components/StudentNavBar.tsx";
import "../App.css";
import { TailSpin } from "react-loader-spinner";

const StudentStatus = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState([]); // Replace with actual data
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
      for(let i = 0; i < data.length; i++){
        const documentResponse = await fetch(
          `http://localhost:8080/requestedDocuments/get?requestId=${data[i].requestId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const documentData = await documentResponse.json();
        data[i].documents = documentData;
      }

      const Data = data;
      await setData(Data);
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
            {data.map((request) => (
              <div key={request.requestId} className="studentStatusSubContainer pandingStatusColorSubContainer">
                <p className="studentStatusTimeContainer">
                  <b>Date: </b>{new Date(request.time).toLocaleDateString()} <b>Time: </b>{new Date(request.time).toLocaleTimeString()}
                </p>
                <p className="studentStatusStatusContainer paddingStatusColor">
                  <b>Status: </b>{request.status}
                </p>
                <p>
                  <b>Amount Paid:</b> {request.amountPaid}
                  <br />
                  <b>Delivery Mode:</b> {request.deliveryMod || "N/A"}
                  <br />
                  <b>Transaction ID:</b> {request.transactionId || "N/A"}
                </p>
                <p style={{fontSize: "18px", color: "#6d6d6d", fontWeight: "bold"}}> Document details</p>
                {request.documents.map((document) => (
                  <div key={document.id} className="studentStatusDocumentContainer">
                    <p>
                      <b>Document Name:</b> {document.documentId} {" "}
                      <b>No. of Copies:</b> {document.no_of_copies}
                    </p>
                  </div>
                ))}
              </div>
            ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentStatus;
