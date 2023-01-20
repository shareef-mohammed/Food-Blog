import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import DashboardContent from "../../components/DashboardContent/DashboardContent";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
const AdminDashboard = () => {
  const token = localStorage.getItem('adminToken')
  const navigate = useNavigate()
  useEffect(() => {
    if(token) {
      fetch(`${process.env.REACT_APP_BASEURL}/admin/details`, {
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": `${token}`,
        },
      })
      .then(res => res.json())
      .then(data => {
        if(data.status == 'err') {
          navigate('/Admin/Login')
        } 
      })
    } else {
      navigate('/Admin/Login')
    }
  },[])

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
