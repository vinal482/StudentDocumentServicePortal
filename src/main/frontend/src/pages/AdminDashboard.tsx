import React from "react";
import TableForAdmin from "../components/TableForAdmin.tsx";
import AdminNavBar from "../components/AdminNavBar.tsx";
// import SearchBar from "../components/SearchBar.jsx";
import axios from "axios";
const AdminDashboard = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [adminName, setAdminName] = React.useState<string>("");
  const [adminId, setAdminId] = React.useState<string>("");
  const [data, setData] = React.useState([]); // Replace with actual data
  const [search, setSearch] = React.useState("");

  const retriveAdminData = async () => {
    try {
      setIsLoading(true);
      const adminId = await localStorage.getItem("adminId");
      const email = await localStorage.getItem("adminEmail");
      const adminName = await localStorage.getItem("adminName");

      if (adminId === null || email === null || adminName === null) {
        localStorage.clear();
        window.location = "/student-documents-project/admin/login";
      }

      setAdminId(adminId);
      setEmail(email);
      setAdminName(adminName);

      const response1 = await axios.get(
        `https://documents.daiict.ac.in/request/getAll`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const Data = await response1.data;
      await setData(Data);
      console.log("Data:", Data);
      
    } catch (error) {
      console.error("Error retrieving admin data:", error);
      alert(
        "There was an error retrieving admin data. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    retriveAdminData();
  }, []);


  const handleSearchSubmit = () => {
    console.log("Search:", search);
  };

  function Search(formData) {
    const query = formData.get("query");
    alert(`You searched for '${query}'`);
  }

  

  return (
    <>
      <AdminNavBar />
      <div className="searchBarContainer">
      <form className="searchInputForm">
        <input
          className="searchInput"
          type="text"
          placeholder="Search"
          name="query"
          onChange={(e) => setSearch(e)}
        />
      </form>
    </div>
      <div className="container">
        <div className="adminDashboardMainContainer">
          <div className="adminDashboardContainer">
            <TableForAdmin data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;