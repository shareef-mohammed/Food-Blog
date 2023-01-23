import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../../features/auth/authSlice";
import AddPost from "../AddPost/AddPost";
import Location from "./Location";

const LocateButton = ({ page }) => {
  const [location, setLocation] = useState(false);
  const [user, setUser] = useState("");
  const name = useSelector(selectCurrentUser);
  const [isPost, setIsPost] = useState(false)
  const token = useSelector(selectCurrentToken)

  useEffect(() => {
    if (name) {
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
    }
  }, []);

  if (location)
    return (
      <Location
        button={true}
        opened={location}
        user={user}
        onClose={() => {
          setLocation(false);
        }}
      />
    );
  return (
    <div className="flex justify-between">
      <div
        className={
          page
            ? "top-0 left-0 right-0 pt-4 text-center max-w-[900px] ml-32 border-2 rounded-xl m-1"
            : "top-0 left-0 right-0 pt-4 text-center max-w-[1255px] mx-auto px-4 border-2 rounded-xl mt-3"
        }
      >
        <AddPost
          open={isPost}
          id={user._id}
          onClose={() => {
            setIsPost(false);
          }}
        />
        <button
          onClick={() => setLocation(true)}
          class="relative  inline-flex items-center justify-center p-0.5 mb-2 mx-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
        >
          {user.location ?<span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
             <span className="uppercase font-semibold">{user.location}</span> (Change your location)</span> : 
             <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">'Add location' 
          </span>}
        </button>
        <p className="hidden md:block px-8 ">
          This will helps you to find your favourite foods that nearest you.
        </p>
      </div>
      {
        page && <div onClick={() => setIsPost(true)} className="top-0 left-0 right-0 pt-8 text-center max-w-[300px] mr-48">
        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Add a Post
        </span>
      </button>
        </div>
      }
      
    </div>
  );
};

export default LocateButton;
