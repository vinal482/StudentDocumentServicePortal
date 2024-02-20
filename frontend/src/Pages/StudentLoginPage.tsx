import React from "react";
import "../App.css";
// import { Link } from "react-router-dom";

const StudentLoginPage = () => {
  const [studentId, setStudentId] = React.useState<number>(0);
  const [email, setEmail] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log(studentId, email, name);
  //   console.log("Form Submitted");

  //   if(studentId === 0 || email === "" || name === "") {
  //     alert("Please fill all the fields");
  //     return;
  //   }

  //   // Post request to the server
  //   fetch("http://localhost:8080/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       studentId: studentId,
  //       emailId: email,
  //       name: name,
  //     }),
  //     mode: "no-cors",
  //   });
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // ... other code

    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId: studentId,
        emailId: email,
        name: name,
      }),
      mode: "no-cors", // Disable CORS checks
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text(); // handle response body as text
      })
      .then((text) => console.log(text)) // process text response
      .catch((error) => console.error(error)); // handle errors

    e.preventDefault();

    // navigate to student dashboard
    console.log("Form Submitted");
    

  };

  return (
    <>
      <div className="container">
        <div className="stundetLoginMainCont">
          <div className="loginContainer">
            <h1 className="studentLoginTitle">Student Login</h1>
            <form className="loginFormContainer" onSubmit={handleSubmit}>
              <div className="studentLoginInputContainer">
                <label htmlFor="studentId" className="studentLoginInputLabel">
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
              <button type="submit" className="sudentSubmitBtn btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentLoginPage;
