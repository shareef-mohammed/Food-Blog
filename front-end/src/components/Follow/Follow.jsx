import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu, AiFillMessage } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentToken } from "../../features/auth/authSlice";
import Loader from "../Loader/Loader";
import UserDetails from "./UserDetails";

const Follow = ({ user, pos }) => {
  const [follow, setFollow] = useState(false);
  const [count, setCount] = useState(0);
  const [hide, setHide] = useState(true);
  const [details, setDetails] = useState(false);
  const [loader, setLoader] = useState(false);
  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate()

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BASEURL}/user/followersDetails/${user._id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": `${pos.details[0]._id}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setLoader(true);
        if(data.err) {
          setLoader(false)
          return navigate('/PageNotFound')
        }
        if (data.status) {
          // setTimeout(() => {
          setFollow(true);
          setCount(data.count);
          setLoader(false);
          // }, 500);
        } else {
          // setTimeout(() => {
          setFollow(false);
          setCount(data.count);
          setLoader(false);
          // }, 500);
        }
      })
      .catch((err) => {
        navigate('/PageNotFound')
      });
  }, [count, follow]);
  const handleHide = () => {
    setHide(!hide);
  };

  const followUser = (id) => {
    const userId = user._id;
    fetch(`${process.env.REACT_APP_BASEURL}/user/followUser/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Custom-Header": `${token}`,
      },
      body: JSON.stringify({
        userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.err) {
          setLoader(false)
          return navigate('/PageNotFound')
        }
        if (follow) {
          setFollow(false);
        } else {
          setFollow(true);
        }
      })
      .catch((err) => {
        navigate('/PageNotFound')
      });
  };

  const hidebar = () => {
    setHide(!hide);
  };

  const addToChat = async(receiverId) => {
    try {
      await fetch(`${process.env.REACT_APP_BASEURL}/chat`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": `${token}`,
        },
        body: JSON.stringify({
          senderId: user._id,
          receiverId
        }),
      })
      .then(res => res.json())
      .then(data => {
        if(data.status === 'ok') {
          navigate('/Chat')
        }
      })
    } catch(err) {
      console.log(err)
    }
  }

  if (loader) return <Loader />;
  return (
    <div className="sm:w-[5%] md:w-[40%]  mb-auto px-3  pt-3 sticky top-36 right-0 md:border-l-2">
      <div className="hidden md:block ">
        <img
          className="h-28 w-28 rounded-full my-3"
          src={
            pos.details[0].profilePic
              ? pos.details[0].profilePic
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
        />
        <UserDetails
          open={details}
          user={pos}
          onClose={() => setDetails(false)}
        />
        <h5
          className="text-lg font-semibold ml-3 cursor-pointer"
          onClick={() => setDetails(true)}
        >
          {pos.details[0].userName}
        </h5>
        <p className="text-lg font-semibold ml-3">{count} followers</p>
        <p className="ml-3">{pos.details[0].bio ? pos.details[0].bio : ""}</p>
        {user._id === pos.details[0]._id ? (
          ""
        ) : (
          <div className="flex">
            <button
            onClick={() => followUser(pos.details[0]._id)}
            className={
              follow
                ? " px-4 ml-2 py-2 my-2 text-[#ef4444] rounded-3xl border-2"
                : " px-4 ml-3 py-2 my-2 text-white rounded-3xl bg-[#ef4444]"
            }
          >
            {follow ? "Unfollow" : "Follow"}
          </button>
            {
              follow && <AiFillMessage onClick={() => addToChat(pos.details[0]._id)} className="ml-4 w-8 mt-3 text-pink-400 cursor-pointer h-8" />
            }
          </div>
        )}
      </div>
      <div onClick={handleHide} className="block md:hidden">
        {hide && <AiOutlineMenu size={20} className="" />}
      </div>
      <div
        className={
          !hide
            ? "fixed right-0 top-20 w-[50%] border-l-2 h-screen bg-white ease-in-out duration-700"
            : "hidden"
        }
      >
        <div className="pt-8 pl-4">
          <AiOutlineClose size={20} onClick={hidebar} />
          <img
            className="h-28 w-28 rounded-full my-3 "
            src={
              pos.details[0].profilePic
                ? pos.details[0].profilePic
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
          />
          <h5 className="text-lg font-semibold">{pos.details[0].userName}</h5>
          <p className="text-lg font-semibold">{count} followers</p>
          <p className="">{pos.details[0].bio ? pos.details[0].bio : ""}</p>
          {user._id === pos.details[0]._id ? (
            ""
          ) : follow ? (
            <button
              onClick={() => followUser(pos.details[0]._id)}
              className=" px-4 py-2 my-2 text-[#ef4444] rounded-3xl border-2"
            >
              {" "}
              Unfollow
            </button>
          ) : (
            <button
              onClick={() => followUser(pos.details[0]._id)}
              className=" px-4 py-2 my-2 text-white rounded-3xl bg-[#ef4444]"
            >
              {" "}
              Follow
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Follow;
