import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import UserManContent from "../../components/UserManContent/UserManContent";

const AdminUserMan = () => {
  const navigate = useNavigate();

  return (
    <div>
      <AdminNavbar />
      <div className="flex">
        <Sidebar users={true} />
        <UserManContent />
      </div>
      <Footer />
    </div>
  );
};

export default AdminUserMan;
