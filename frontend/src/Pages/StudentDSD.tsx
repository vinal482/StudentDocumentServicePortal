import React, { useState, useEffect } from "react";
import StudentNavBar from "../components/StudentNavBar.tsx";
import "../App.css";
import Table from "../components/Table.tsx";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import {TailSpin} from "react-loader-spinner";

// student Document Service Dashboard
const StudentDSD = () => {
  const [studentId, setStudentId] = React.useState<number>(0);
  const [email, setEmail] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [docs, setDocs] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

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
        "http://localhost:8080/document/getallwithoutdate",
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

  //  console.log(localStorage.getItem("name"));

  const [checked, setChecked] = React.useState(false);
  function handleChange(e) {
    setChecked(e.target.checked);
  }

  const data = [
    { "Document name": "Bonafide Student Certificate", Cost: "50 INR" },
    { "Document name": "Combined Grade Report", Cost: "70 INR" },
    { "Document name": "Duplicate Transcript", Cost: "150 INR" },
    { "Document name": "Document In Sealed DA-IICT envelope", Cost: "70 INR" },
    { "Document name": "Migration Certificate", Cost: "50 INR" },
    {
      "Document name": "CPI to Percentage conversion certificate",
      Cost: "50 INR",
    },
    { "Document name": "Expected date of result certificate", Cost: "50 INR" },
    { "Document name": "Medium of instruction certificate", Cost: "50 INR" },
    { "Document name": "Duplicate Provisional certificate", Cost: "70 INR" },
    { "Document name": "Duplicate Degree Certificate", Cost: "300 INR" },
    { "Document name": "Other Miscellaneous Certificate", Cost: "50 INR" },
  ];

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
              <div className="studentDocumentDetails">
                <div className="studentDocument">
                  <Table data={docs} />
                </div>
              </div>
              <div className="studentDocumentSubmit">
                <Link to="/student/selected-docs">
                  <button type="submit" className="studentDSDBtn">
                    Next
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentDSD;
