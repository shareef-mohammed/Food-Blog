import React from "react";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import BannerContent from "../../components/BannerContent/BannerContent";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";

const BannerMan = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="flex">
        <Sidebar banners={true} />
        <BannerContent />
      </div>
      <Footer />
    </div>
  );
};

export default BannerMan;
