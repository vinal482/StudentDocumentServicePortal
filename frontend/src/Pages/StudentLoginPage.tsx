import React, { useEffect } from "react";
import "../App.css";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
// import { Link } from "react-router-dom";

const StudentLoginPage = () => {
  useEffect(() => {
    const studentId = localStorage.getItem("studentId");
    if (studentId) {
      window.location.href = "./student/dsd";
    }
  }, []);

  const [studentId, setStudentId] = React.useState<number>(0);
  const [email, setEmail] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [isLoding, setIsLoading] = React.useState<boolean>(false);

  const handleSubmit = async () => {
    // await localStorage.setItem("name" , "Karan");
    if (studentId === 0 || email === "" || name === "") {
      alert("Please fill all fields.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:8080/login", {
        studentId: studentId, // Send as number
        emailId: email, // Send as string
        name: name, // Send as string
      });

      console.log("Response:", response.data);
      await localStorage.setItem("studentId", studentId.toString());
      await localStorage.setItem("email", email);
      await localStorage.setItem("name", name);

      // Redirect to student dashboard
      window.location.href = "/student/dsd";
    } catch (error) {
      console.error("Error sending login request:", error);
      alert("There was an error trying to log in. Please try again later.");
    } finally {
      setIsLoading(false);
    }

    console.log("Form Submitted");
  };

  return (
    <>
      <div className="container">
        <div className="stundetLoginMainCont">
          <div className="loginContainer">
            <h1 className="studentLoginTitle">Student Login</h1>
            <form className="loginFormContainer">
              {isLoding ? (
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
                  <div className="studentLoginInputContainer">
                    <label
                      htmlFor="studentId"
                      className="studentLoginInputLabel"
                    >
                      Student ID
                    </label>
                    <input
                      type="text"
                      className="studentLoginInput"
                      id="studentId"
                      aria-describedby="studentId"
                      placeholder="Enter Student Id"
                      onChange={(e) => setStudentId(parseInt(e.target.value))}
                    />
                  </div>
                  <div className="studentLoginInputContainer">
                    <label htmlFor="email" className="studentLoginInputLabel">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="studentLoginInput"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="studentLoginInputContainer">
                    <label htmlFor="name" className="studentLoginInputLabel">
                      Name
                    </label>
                    <input
                      type="text"
                      className="studentLoginInput"
                      id="name"
                      aria-describedby="nameHelp"
                      placeholder="Enter your name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="sudentSubmitBtn btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentLoginPage;
