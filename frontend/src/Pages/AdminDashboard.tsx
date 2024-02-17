import React from "react";
import TableForAdmin from "../components/TableForAdmin.tsx";
import AdminNavBar from "../components/AdminNavBar.tsx";
import SearchBar from "../components/SearchBar.tsx";
const AdminDashboard = () => {
  const data = [
    {
      "Tracking ID": "0123456789",
      Time: "20:03 12/02/24",
      "Student ID": "202001062",
      Cost: "50 INR",
      Status: "Collected",
      Delivery: "On campus",
      "Contact details": "9876543210",
      "Transaction ID": "1234567890",
    },
    {
      "Tracking ID": "0123456789",
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
