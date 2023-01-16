import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import DashboardContent from "../../components/DashboardContent/DashboardContent";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <AdminNavbar />
      <div className="flex">
        <Sidebar dashboard={true} />
        <DashboardContent />
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
