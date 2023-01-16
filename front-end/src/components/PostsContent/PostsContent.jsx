import React, { useEffect, useState } from "react";
import { BsArrowRightCircleFill, BsFillStarFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../features/auth/authSlice";

import ContentLoader from "../Loader/ContentLoader";
import Loader from "../Loader/Loader";
import Posts from "./Posts";

const PostsContent = ({ home }) => {
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    fetchPost();
    // afterFetch();
  }, [skip, query]);

  const [user, setUser] = useState("");

  const token = useSelector(selectCurrentUser);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASEURL}/user/details`, {
      headers: {
        "Content-Type": "application/json",
        "X-Custom-Header": `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.details);
      })
      .catch(err => {
        console.log(err)
      });
  }, [token]);

  const read = async (skip) => {
    const res = await fetch(
      `${process.env.REACT_APP_BASEURL}/user/allPosts?skip=${skip}&q=${query}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await res.json();
  };

  const fetchPost = async () => {
    try {
      const { data, error } = await read(skip);
      if (error) {
        console.log(error);
        return;
      }

      if (data?.length === 0) {
        setIsEnd(true);
        return;
      }

      if (!query) {
        setPosts([...posts, ...data]);
      } else {
        setPosts([...data]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;
    if (offsetHeight + scrollTop >= scrollHeight) {
      if (isEnd) {
        setLoading(false);
      } else {
        setLoading(true);
      }
      setTimeout(() => {
        setSkip(skip + 8);
        setLoading(false);
      }, 1500);
    }
  };

  const keys = ["foodName", "resName"];

  const search = (data) => {
    return data.filter((item) => {
      return keys.some((key) => item[key].toLowerCase().includes(query));
    });
  };

  return (
    <>
      {home ? (
        ""
      ) : (
        <div className="max-w-[1280px] mx-auto px-4 my-4 relative flex  items-center">
          <input
            className="mx-auto border-2 md:w-[50%] sm:w-[90%] py-2 pl-2 text-xl rounded-xl"
            type="text"
            placeholder="Search here for posts..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      )}
      <div
        className="max-h-screen overflow-scroll scrollbar-hide"
        onScroll={handleScroll}
      >
        <Posts user={user} data={search(posts)} />

        {loading && <ContentLoader />}
        {isEnd && (
          <h1 className="text-center py-4 text-[#16a34a]">
            You have reached the end ...
          </h1>
        )}
      </div>
    </>
  );
};

export default PostsContent;
