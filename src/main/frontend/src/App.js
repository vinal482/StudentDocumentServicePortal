import StudentLoginPage from "./pages/StudentLoginPage.tsx";
import StudentDashboard from "./pages/StudentDashboard.tsx";
import StudentDashboardNew from "./pages/StudentDashboardNew.tsx";

// import StudentSelectedDocs from "./pages/StudentSelectedDocs.jsx";
import StudentStatus from "./pages/StudentStatus.tsx";
import AdminLoginPage from "./pages/AdminLoginPage.tsx";
// import AdminNavBar from "./components/AdminNavBar.jsx";
// import SearchBar from "./components/SearchBar.jsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import AdminDashboardNew from "./pages/AdminDashboardNew.tsx";
import AdminMasterPage from "./pages/AdminMasterPage.tsx";
import AlumniLogin from "./pages/AlumniLogin.tsx";
import DocumentView from "./pages/DocumentView.tsx";
import DownloadPDF from "./pages/DownloadPDF.tsx";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from 'react';

function App() {
  return (
    <>
      <BrowserRouter basename={''}>
        <Routes>
          {/* <Route path="/student/login" element={<StudentLoginPage />} /> */}
          <Route path="/student/login" element={<StudentLoginPage />} />
          <Route path="/" element={<StudentDashboard />} />
          <Route path="/new" element={<StudentDashboardNew />} />
          <Route path="/alumni/login" element={<AlumniLogin/>} />
          <Route path="/viewdocument" element={<DocumentView/>} />
          <Route path="/downloadpdf" element={<DownloadPDF/>} />

          {/* <Route
            path="/student/selected-docs"
            element={<StudentSelectedDocs />}
          /> */}
          <Route path="/student/status" element={<StudentStatus />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardNew />} />
          <Route path="/admin/masterpage" element={<AdminMasterPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
