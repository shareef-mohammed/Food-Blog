import React from "react";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import Footer from "../../components/Footer/Footer";
import ReportManContent from "../../components/ReportManContent/ReportManContent";
import Sidebar from "../../components/Sidebar/Sidebar";

const ReportManagement = () => {
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
