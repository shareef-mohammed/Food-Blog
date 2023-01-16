import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectCurrentToken,
} from "../../features/auth/authSlice";
import Footer from "../../components/Footer/Footer";
import Navba from "../../components/Navbar/Navbar";
import PostsContent from "../../components/PostsContent/PostsContent";

const Posts = () => {
  const [user, setUser] = useState("");
  const token = useSelector(selectCurrentUser);
  useEffect(() => {
    if (token) {
      fetch(`http://localhost:7000/user/details/${token}`, {
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": `${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data.details);
        });
    }
  }, []);

  return (
    <div>
      <Navba user={user} posts={true} />
      <PostsContent user={user} />
      <Footer />
    </div>
  );
};

export default Posts;
