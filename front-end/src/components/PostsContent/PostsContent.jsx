import React, { useEffect, useState } from "react";
import { BsArrowRightCircleFill, BsFillStarFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../../features/auth/authSlice";

import ContentLoader from "../Loader/ContentLoader";
import Loader from "../Loader/Loader";
import Posts from "./Posts";
import Filter from "./Filter";
import { useCallback } from "react";
import LocateButton from "../Location/LocateButton";

const PostsContent = ({ home, category, page }) => {
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(false);
  const [query, setQuery] = useState("");
  const [loader, setLoader] = useState(false);

  const params = useParams();
  const cate = params.id;
  const navigate = useNavigate();

  const [user, setUser] = useState("");

  const name = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASEURL}/user/details/${name}`, {
      headers: {
        "Content-Type": "application/json",
        "X-Custom-Header": `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.details);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  const locationFilter = useCallback(async (location) => {
    setLoader(true);
    await fetch(
      `${process.env.REACT_APP_BASEURL}/posts/filteredPosts?skip=${skip}&q=${query}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": `${location}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setLoader(false);
          setPosts([...data.data, ...posts]);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  useEffect(() => {
    if (!filter) {
      fetchPost();
    }
  }, [skip, query]);

  const read = async (skip) => {
    if (category) {
      const res = await fetch(
        `${process.env.REACT_APP_BASEURL}/posts/singleCategory/${cate}?skip=${skip}&q=${query}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return await res.json();
    } else if (home) {
      if (token) {
        const res = await fetch(
          `${process.env.REACT_APP_BASEURL}/user/homePosts?skip=${skip}&q=${query}`,
          {
            headers: {
              "Content-Type": "application/json",
              "X-Custom-Header": `${name}`,
            },
          }
        );
        return await res.json();
      } else {
        const res = await fetch(
          `${process.env.REACT_APP_BASEURL}/user/allPosts?skip=${skip}&q=${query}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        return await res.json();
      }
    } else {
      const res = await fetch(
        `${process.env.REACT_APP_BASEURL}/user/allPosts?skip=${skip}&q=${query}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Custom-Header": `${name}`,
          },
        }
      );

      return await res.json();
    }
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
      navigate('/PageNotFound')
    }
  };

  const handleScroll = (e) => {
    
    const { offsetHeight, scrollTop, scrollHeight } = e.target;
    if (offsetHeight + scrollTop >= scrollHeight-500) {
      console.log('jjjj')
      if (isEnd) {
        setLoading(false);
      } else {
        setLoading(true);
      }
      setTimeout(() => {        
        setSkip(skip + 6);
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

  if (loader) return <Loader />;
  return (
    <>
      {home ? (
        ""
      ) : (
        <>
          <div className="max-w-[1280px] mx-auto px-4 my-4 relative flex  items-center">
            <input
              className="mx-auto border-2 md:w-[50%] sm:w-[90%] py-1 pl-2 text-lg rounded-xl"
              type="text"
              placeholder="Search here for posts"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          {user && <LocateButton page={page} />}
          <Filter
            locationFilter={locationFilter}
            onFilter={() => setFilter(true)}
            offFilter={() => setFilter(false)}
            handleScroll={handleScroll}
          />
        </>
      )}
      <div
        className="max-h-screen overflow-scroll scrollbar-hide "
        onScroll={handleScroll}
      >
        <Posts user={user} data={search(posts)} />

        {loading && <ContentLoader />}
        {isEnd && (
          <h1 className="text-center py-4 text-[#16a34a]">
            You have reached the end
          </h1>
        )}
      </div>
    </>
  );
};

export default PostsContent;
