import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import Footer from "../../components/Footer/Footer";
import Navba from "../../components/Navbar/Navbar";
import ProfileContent from "../../components/PofileContent/ProfileContent";
import RowPost from "../../components/RowPost/RowPost";

const Profile = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <div>
      <Navba profile={true} />
      <ProfileContent />
      <RowPost user={user} />
      <Footer />
    </div>
  );
};

export default Profile;
