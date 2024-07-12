import React from "react";
import TableForAdminNew from "../components/TableForAdminNew.tsx";
import AdminNavBar from "../components/AdminNavBar.tsx";
// import SearchBar from "../components/SearchBar.jsx";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const AdminDashboardNew = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [adminName, setAdminName] = React.useState<string>("");
  const [adminId, setAdminId] = React.useState<string>("");
  const [data, setData] = React.useState([]); // Replace with actual data
  const [search, setSearch] = React.useState("");

  function parseDate(dateStr) {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day); // Month is zero-based in JavaScript Date object
  }

  // Function to sort data by date
  function sortByDate(data) {
    return data.sort((b, a) => parseDate(a.newDate) - parseDate(b.newDate));
  }

  const retriveAdminData = async () => {
    try {
      setIsLoading(true);
      const adminId = await localStorage.getItem("adminId");
      const email = await localStorage.getItem("adminEmail");
      const adminName = await localStorage.getItem("adminName");

      if (adminId === null || email === null || adminName === null) {
        localStorage.clear();
        window.location = "../admin/login";
      }

      setAdminId(adminId);
      setEmail(email);
      setAdminName(adminName);

      let response1 = await axios.get(
        `https://documents.daiict.ac.in/request/getAll`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let Data = await response1.data;
      for (let i = 0; i < response1.data.length; i++) {
        let tempDate = new Date(response1.data[i].time).toLocaleDateString();
        // Split the date string into parts
        const dateParts = tempDate.split('/');

        // Get the day, month, and year parts
        const month = dateParts[0].padStart(2, '0');
        const day = dateParts[1].padStart(2, '0');
        const year = dateParts[2];
        console.log("Log", "${}");
        response1.data[i].newDate = `${day}/${month}/${year}`;
      }
      const sortedData = sortByDate(response1.data);
      await setData(sortedData);
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
    document.title = "Admin Dashboard";
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
      <div className="container">
        <div className="adminDashboardMainContainer">
          {
            isLoading ? (
              <p>Loading</p>
            ) : (
              <div className="adminDashboardContainer">
                <TableForAdminNew data={data} />
              </div>
            )
          }
        </div>
      </div>
    </>
  );
};

export default AdminDashboardNew;
