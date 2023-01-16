import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import EditAndDelete from "../EditAndDelete/EditAndDelete";
import ContentLoader from "../Loader/ContentLoader";

const RowPost = ({ user, home }) => {
  const [rowPost, setRowPost] = useState([]);
  const navigate = useNavigate();
  const [skip, setSkip] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetchPost();
    if(home) {
      fetch(`${process.env.REACT_APP_BASEURL}/posts/categories`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(res => res.json())
      .then(data => {

      })
    }
  }, [skip, reload]);

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

      setRowPost([...rowPost, ...data]);
    } catch (error) {
      {
        loading && <ContentLoader />;
      }
      {
        isEnd && (
          <h1 className="text-center py-4 text-[#16a34a]">
            You have reached the end ...
          </h1>
        );
      }
      console.log(error.message);
    }
  };

  const read = async (skip) => {
    if (user) {
      const res = await fetch(
        `${process.env.REACT_APP_BASEURL}/user/posts?skip=${skip}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Custom-Header": `${user}`,
          },
        }
      );

      return await res.json();
    } else {
      const res = await fetch(
        `${process.env.REACT_APP_BASEURL}/user/homePosts?skip=${skip}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Custom-Header": `${user}`,
          },
        }
      );

      return await res.json();
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
        setSkip(skip + 6);
        setLoading(false);
      }, 1500);
    }
  };

  const slideRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const slideLeft = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  if (rowPost.length === 0) {
    return (
      <div className=" relative flex  pt-16 px-16 ">
        <p className="mx-auto text-[#dc2626]">Your Posts will shown here...</p>
      </div>
    );
  }

  return (
    <div className=" relative flex items-center pt-16 px-16 ">
      <MdChevronLeft
        className="opacity-50 cursor-pointer  hover:opacity-100"
        onClick={slideLeft}
        size={80}
      />
      <div
        onScroll={handleScroll}
        id="slider"
        className="flex scroll overflow-x-scroll  whitespace-nowrap scroll-smooth scrollbar-hide "
      >
        {rowPost.map((post, i) => {
          return (
            <div className="text-center relative" key={i}>
              <EditAndDelete
                post={post}
                user={user}
                load={() => {
                  if (reload) {
                    setReload(false);
                  } else {
                    setReload(true);
                  }
                }}
              />
              <img
                className="w-[300px] shadow rounded-3xl h-[200px] inline-block "
                src={
                  post.images
                    ? post.images.url
                    : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                }
                alt="/"
              />

              <h6 className="w-80">{post.foodName}</h6>
            </div>
          );
        })}
        <div className="my-auto">
          {loading && <ContentLoader />}
          {isEnd && (
            <h1 className="text-center py-4 text-[#16a34a]">
              You have reached the end ...
            </h1>
          )}
        </div>
      </div>
      <MdChevronRight
        className="cursor-pointer opacity-50 hover:opacity-100"
        onClick={slideRight}
        size={80}
      />
    </div>
  );
};

export default RowPost;