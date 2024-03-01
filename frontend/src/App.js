import StudentLoginPage from "./pages/StudentLoginPage.tsx";
import StudentDSD from "./pages/StudentDSD.tsx";
import StudentSelectedDocs from "./pages/StudentSelectedDocs.tsx";
import StudentStatus from "./pages/StudentStatus.tsx";
import AdminLoginPage from "./pages/AdminLoginPage.tsx";
import AdminNavBar from "./components/AdminNavBar.tsx";
import SearchBar from "./components/SearchBar.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import AdminMasterPage from "./pages/AdminMasterPage.tsx";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/student/login" element={<StudentLoginPage />} />
          <Route path="/" element={<StudentLoginPage />} />
          <Route path="/student/dsd" element={<StudentDSD />} />
          <Route
            path="/student/selected-docs"
            element={<StudentSelectedDocs />}
          />
          <Route path="/student/status" element={<StudentStatus />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/masterpage" element={<AdminMasterPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
