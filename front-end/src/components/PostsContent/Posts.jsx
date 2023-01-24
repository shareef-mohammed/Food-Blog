import React, { useState } from "react";
import LikeAndShare from "../LikeAndShare/LikeAndShare";
import { BsFillStarFill } from "react-icons/bs";
import { format } from "timeago.js";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import Filter from "./Filter";
import UserDetails from "../Follow/UserDetails";

const Posts = ({ user, data }) => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  // const [details, setDetails] = useState(false)

  const singlePost = (id) => {
    setLoader(true);
    setTimeout(() => {
      navigate(`/singlePost/${id}`);
      setLoader(false);
    }, 1000);
  };
  if (loader) return <Loader />;
  return (
    <>
      {data.map((post, i) => {
        return (
          <div
            className="max-w-[100%] mx-auto px-12 py-6  relative flex  items-center "
            key={i}
          >
            <div className="sm:w-[50%] md:w-[80%] border-b-2">
              <div className="flex">
                <img
                  className="h-6 w-6 mt-1 rounded-full"
                  src={
                    post.details[0].profilePic
                      ? post.details[0].profilePic
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                />
                <h6 className="pt-1 pl-2 pb-3 text-lg font-semibold" 
                // onClick={() => setDetails(true)} 
                >
                  {post.details[0].userName}
                </h6>
                {/* <UserDetails key={i} open={details} onClose={() => setDetails(false)} user={post} /> */}
              </div>
              <h3
                className="font-medium text-lg uppercase cursor-pointer"
                onClick={() => singlePost(post._id)}
              >
                {post.foodName}
              </h3>
              <div className="flex">
                <p className="text-[24px] font-semibold">{post.resName}</p>
                <p className="border rounded-xl mx-2 my-3 text-[#dc2626] font-medium px-1 text-[10px]">
                  Restaurant
                </p>
              </div>
              <p>{post.desc}</p>
              <div className="flex justify-between mb-2">
                <div className="flex">
                  <p className="pt-1 text-sm">{format(post.updatedAt)}</p>
                  <BsFillStarFill className="ml-4 mt-2 w-3 h-3 text-[#f59e0b]" />
                  <p className="pt-1 text-sm pl-1">{post.rating}</p>
                </div>
                {user && <LikeAndShare postedUser={post.details[0].userName} id={post._id} user={user} user1={post.userId}/>}
              </div>
            </div>
            <div className="sm:w-[50%] md:w-[30%] lg:w-[20%] ml-3">
              <img
                className="w-48 sm:h-28 md:h-32 px-auto rounded-md"
                src={
                  post.images
                    ? post.images.url
                    : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                }
              />
            </div>
            
          </div>
        );
      })}
    </>
  );
};

export default Posts;
