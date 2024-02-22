import React from "react";
import TableForAdmin from "../components/TableForAdmin.tsx";
import AdminNavBar from "../components/AdminNavBar.tsx";
import SearchBar from "../components/SearchBar.tsx";
const AdminDashboard = () => {

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [adminName, setAdminName] = React.useState<string>("");
  const [adminId, setAdminId] = React.useState<string>("");

  const retriveAdminData = async () => {
    try {
      setIsLoading(true);
      const adminId = await localStorage.getItem("adminId");
      const email = await localStorage.getItem("email");
      const adminName = await localStorage.getItem("adminName");

      if (adminId === null || email === null || adminName === null) {
        localStorage.clear();
        window.location.href = "/admin/login";
      }

      setAdminId(adminId);
      setEmail(email);
      setAdminName(adminName);
    } catch (error) {
      console.error("Error retrieving admin data:", error);
      alert("There was an error retrieving admin data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    retriveAdminData();
  }, []);

  const data = [
    {
      "Request ID": "0123456789",
      Time: "20:03 12/02/24",
      "Student ID": "202001062",
      Cost: "50 INR",
      Status: "Collected",
      Delivery: "On campus",
      "Contact details": "9876543210",
      "Transaction ID": "1234567890",
    },
    {
      "Request ID": "0123456789",
      Time: "20:03 12/02/24",
      "Student ID": "202001140",
      Cost: "50 INR",
      Status: "Delivered",
      Delivery: "Inside India",
      "Contact details": "9876543210",
      "Transaction ID": "1234567890",
    },
  ];

  return (
    <>
      <AdminNavBar />
      <SearchBar />
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
