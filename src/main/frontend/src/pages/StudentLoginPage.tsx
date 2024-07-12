import React, { useEffect } from "react";
import "../App.css";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
// import { Link } from "react-router-dom";

const StudentLoginPage = () => {
  useEffect(() => {
    document.title = "Student Login";
    const studentId = localStorage.getItem("studentId");
    if (studentId) {
      window.location.href = "../";
    }
  }, []);

  const [studentId, setStudentId] = React.useState<number>(0);
  const [email, setEmail] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [isLoding, setIsLoading] = React.useState<boolean>(false);
  const [selectedValue, setSelectedValue] = React.useState<string>("Current");
  const [isSelectedValueError, setSelectedValueError] =React.useState<boolean>(false);
  const [isStudentIdError, setStudentIdError] =React.useState<boolean>(false);
  const [isEmailError, setEmailError] =React.useState<boolean>(false);
  const [isNameError, setNameError] =React.useState<boolean>(false);


  const handleSubmit = async () => {
    // await localStorage.setItem("name" , "Karan");
    // if(selectedValue === "") {
    //   await setSelectedValueError(true);
    //   return;
    // } else {
    //   await setSelectedValueError(false);
    // }
    if(studentId === 0) {
      await setStudentIdError(true);
      return;
    } else {
      await setStudentIdError(false);
    }
    if(email === "") {
      await setEmailError(true);
      return;
    } else {
      await setEmailError(false);
    }
    if(name === "") {
      await setNameError(true);
      return;
    } else {
      await setNameError(false);
    }
    if (studentId === 0 || email === "" || name === "") {
      alert("Please fill all fields.");
      return;
    }

    // check student ID is valid (9 digits)
    // if(studentId.length() !== 9) {
    //     alert("Please enter valid (9 digits) student ID!");
    //     return;
    // }

    try {
      setIsLoading(true);
      const response = await axios.post("https://documents.daiict.ac.in/login", {
        studentId: studentId, // Send as number
        emailId: email, // Send as string
        name: name, // Send as string
      });

      console.log("Response:", response.data);
      await localStorage.setItem("studentId", studentId.toString());
      await localStorage.setItem("email", email);
      await localStorage.setItem("name", name);
      // await localStorage.setItem("studentType", selectedValue);


      if(selectedValue === 'Current') {
        // console.log("1");
        await localStorage.setItem("studentType", "0");
        // console.log("2");
      } else if(selectedValue === "Alumni") {
        // console.log("3");
        await localStorage.setItem("studentType", "2");
      }

      // Redirect to student dashboard
      window.location.href = "../";
    } catch (error) {
      console.error("Error sending login request:", error);
      alert("There was an error trying to log in. Please try again later.");
    } finally {
      setIsLoading(false);
    }

    console.log("Form Submitted");
  };

  // const handleRadioChange = async (option) => {
  //   await setSelectedValue(option);
  // }

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
                  {/* <div className="studentLoginInputContainer">
                    Student type:
                    <div className="chooseStudentLoginInputContainer">
                      <div className="chooseStudentInput">
                        <input
                          type="radio"
                          id="Current"
                          value="Current"
                          checked={
                            selectedValue ===
                            "Current"
                          }
                          onChange={() =>
                            handleRadioChange(
                              "Current"
                            )
                          }
                        />
                        <label
                          htmlFor="Current"
                          className="chooseStudentInputRadioButton"
                        >
                          Current
                        </label>
                      </div>
                      <div className="chooseStudentInput">
                        <input
                          type="radio"
                          id="Alumni"
                          value="Alumni"
                          checked={
                            selectedValue ===
                            "Alumni"
                          }
                          onChange={() =>
                            handleRadioChange(
                              "Alumni"
                            )
                          }
                        />
                        <label
                          htmlFor="Alumni"
                          className="chooseStudentInputRadioButton"
                        >
                          Alumni
                        </label>
                      </div>
                    </div>
                    {isSelectedValueError ? (<div className="errorTextInStudentLogin">Please choose student type!</div>) : null}
                  </div> */}
                  <div className="studentLoginInputContainer">
                    <label
                      htmlFor="studentId"
                      className="studentLoginInputLabel"
                    >
                      Student ID
                    </label>
                    <input
                      type="number"
                      className="studentLoginInput"
                      id="studentId"
                      aria-describedby="studentId"
                      placeholder="Enter Student Id"
                      onChange={(e) => setStudentId(parseInt(e.target.value))}
                    />
                    {isStudentIdError ? (<div className="errorTextInStudentLogin">Please enter valid student id!</div>) : null}
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
                    {isEmailError ? (<div className="errorTextInStudentLogin">Please enter valid email address!</div>) : null}
                  </div>
                  <div className="studentLoginInputContainer">
                    <label htmlFor="name" className="studentLoginInputLabel">
                      Full name
                    </label>
                    <input
                      type="text"
                      className="studentLoginInput"
                      id="name"
                      aria-describedby="nameHelp"
                      placeholder="Enter your name"
                      onChange={(e) => setName(e.target.value)}
                    />
                    {isNameError ? (<div className="errorTextInStudentLogin">Please enter your full name!</div>) : null}
                  </div>
                  <button
                    type="button"
                    className="sudentSubmitBtn btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                  <p>If you're an Alumnus, <a style={{textDecoration: "none"}} href="https://documents.daiict.ac.in/alumni/login">Login here</a></p>
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

// <!doctype html><html lang="en"><head><meta charset="utf-8"/><link rel="icon" href="./favicon.ico"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="theme-color" content="#000000"/><meta name="description" content="Web site created using create-react-app"/><link rel="apple-touch-icon" href="./logo192.png"/><link rel="manifest" href="./manifest.json"/><title>React App</title><script defer="defer" src="./static/js/main.07ac3d1f.js"></script><link href="./static/css/main.5fd5d527.css" rel="stylesheet"></head><body><noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div></body></html>
