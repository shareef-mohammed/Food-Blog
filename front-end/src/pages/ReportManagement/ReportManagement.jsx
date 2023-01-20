import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import Footer from "../../components/Footer/Footer";
import ReportManContent from "../../components/ReportManContent/ReportManContent";
import Sidebar from "../../components/Sidebar/Sidebar";

const ReportManagement = () => {

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
        <Sidebar reports={true} />
        <ReportManContent />
      </div>
      <Footer />
    </div>
  );
};

export default ReportManagement;
