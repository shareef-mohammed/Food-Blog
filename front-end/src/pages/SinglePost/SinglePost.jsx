import React from "react";

import Footer from "../../components/Footer/Footer";
import Navba from "../../components/Navbar/Navbar";
import SinglePostContent from "../../components/SinglePostContent/SinglePostContent";

const SinglePost = () => {
  return (
    <div>
      <Navba />
      <SinglePostContent />
      <Footer />
    </div>
  );
};

export default SinglePost;
