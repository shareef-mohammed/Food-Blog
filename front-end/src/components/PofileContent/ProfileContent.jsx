import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../features/auth/authSlice";
import { FcCameraAddon } from "react-icons/fc";
import { BiEdit } from "react-icons/bi";
import { FiEdit2 } from "react-icons/fi";
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { AiFillDelete } from "react-icons/ai";
import AddPost from "../AddPost/AddPost";

import ProfileUpdate from "../ProfileUpdate/ProfileUpdate";
import AddPhoto from "../AddPhoto/AddPhoto";
import AddBio from "../AddBio/AddBio";
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete";
import Followers from "./Followers";

const ProfileContent = () => {
  const [isPost, setIsPost] = useState(false);
  const [profile, setProfile] = useState(false);
  const [addPhoto, setAddPhoto] = useState(false);
  const [bio, setBio] = useState(false);
  const [user, setUser] = useState("");
  const [userName, setUserName] = useState(false);
  const [fullName, setFullName] = useState(false);
  const [email, setEmail] = useState(false);
  const [phone, setPhone] = useState(false);
  const [del, setDel] = useState(false);
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
      .catch(err => {
        console.log(err)
      })
  }, [fullName, email, phone, addPhoto, del, isPost, bio]);

  return (
    <div className="max-w-[1280px] mx-auto px-4 pt-3 relative lg:flex justify-between items-center ">
      <AddPhoto
        open={addPhoto}
        id={user._id}
        onClose={() => setAddPhoto(false)}
      />
      <AddBio open={bio} onClose={() => setBio(false)} id={user._id} />
      <ConfirmDelete
        open={del}
        onClose={() => setDel(false)}
        id={user._id}
        photo={true}
      />
      <div className="text-center md:w-[50%] lg:ml-24  mx-auto sm:w-[100%] ">
         
        <FiEdit2
          onClick={() => setAddPhoto(true)}
          className="absolute cursor-pointer bg-[#fecaca] p-1 w-6 h-6 rounded-md ml-28 mt-3"
          id="my-element8" 
          data-tooltip-content="Add profile image"
        />
        <ReactTooltip anchorId="my-element8" place="" />
        {user.profilePic || user.profilePic !== "" ? (
          <>
          <AiFillDelete
            data-tooltip-content="Remove profile image"
            id="my-element9" 
            onClick={() => setDel(true)}
            className="absolute cursor-pointer w-8 h-8 rounded-md opacity-0 mt-12 ml-16 hover:opacity-100 scale-110 ease-in-out duration-300 p-1 bg-[#fecaca]"
          />
          <ReactTooltip anchorId="my-element9" place="" />
          </>
        ) : (
          ""
        )}
        <img
          className="h-28 w-28 ml-6 my-3 rounded-full "
          src={
            user.profilePic
              ? user.profilePic
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
        />
        <div className="text-left flex">
          <div>
            <h5 className="flex text-lg font-medium">
              {user.userName}{" "}
              <BiEdit
                data-tooltip-content="Edit user name"
                id="my-element10" 
                onClick={() => {
                  setUserName(true);
                  setProfile(true);
                }}
                className="w-5 h-5 m-1 cursor-pointer opacity-20 hover:opacity-100"
              />
            </h5>
            <ReactTooltip anchorId="my-element10" place="" />
            <h5 className="flex">
              {user.fullName}{" "}
              <BiEdit
               data-tooltip-content="Edit full name"
               id="my-element11" 
                onClick={() => {
                  setFullName(true);
                  setProfile(true);
                }}
                className="w-5 h-5 m-1 cursor-pointer opacity-20 hover:opacity-100"
              />
            </h5>
            <ReactTooltip anchorId="my-element11" place="" />
            <h6 className="flex">
              {user.email}{" "}
              <BiEdit
               data-tooltip-content="Edit email id"
               id="my-element12" 
                onClick={() => {
                  setEmail(true);
                  setProfile(true);
                }}
                className="w-5 h-5 m-1 cursor-pointer opacity-20 hover:opacity-100"
              />
            </h6>
            <ReactTooltip anchorId="my-element12" place="" />
            <h6 className="flex mb-2">
              {user.phone}{" "}
              <BiEdit
               data-tooltip-content="Edit phone number"
               id="my-element13" 
                onClick={() => {
                  setPhone(true);
                  setProfile(true);
                }}
                className="w-5 h-5 m-1 cursor-pointer  opacity-20 hover:opacity-100"
              />
            </h6>
            <ReactTooltip anchorId="my-element13" place="" />
            <p className="text-lg font-bold">Bio</p>
            {user.bio ? (
              <div className=" w-[60%] break-all flex mt-1">
                {user.bio}{" "}
                <BiEdit
                 data-tooltip-content="Edit Bio"
                 id="my-element14" 
                  onClick={() => setBio(true)}
                  className="lg:w-16 lg:h-16  m-1 cursor-pointer  opacity-20 hover:opacity-100"
                />
                <ReactTooltip anchorId="my-element14" place="" />
              </div>
            ) : (
              <>
              <button
                data-tooltip-content="Add bio"
                id="my-element15" 
                onClick={() => setBio(true)}
                className="bg-[#fecaca] px-2 py-1 rounded-md cursor-pointer mt-2"
              >
                Add Bio
              </button>
              <ReactTooltip anchorId="my-element15" place="" />
              </>
              
            )}
          </div>
          <div className="text-center mx-5">
            <Followers />
          </div>
        </div>
        <ProfileUpdate
          user={user}
          userName={userName}
          fullName={fullName}
          email={email}
          phone={phone}
          open={profile}
          onClose={() => {
            setUserName(false);
            setFullName(false);
            setEmail(false);
            setPhone(false);
            setProfile(false);
          }}
        />

        {/* <button className='bg-[#fca5a5] w-44 h-8 mt-2 rounded-md' onClick={() => setProfile(true)}>Update Profile</button> */}
        {/* <UpdateProfile open={profile} onClose={() => setProfile(false)}/> */}
      </div>
      <div className="text-center mx-auto sm:mt-5 lg:mt-0 sm:w-[100%] md:w-[50%]">
        <FcCameraAddon
          onClick={() => setIsPost(true)}
          className="w-24 h-24 mx-auto cursor-pointer"
        />

        <h6 className="mt-2">NEW POST</h6>
        <AddPost
          open={isPost}
          id={user._id}
          onClose={() => {
            setIsPost(false);
          }}
        />
      </div>
    </div>
  );
};

export default ProfileContent;
