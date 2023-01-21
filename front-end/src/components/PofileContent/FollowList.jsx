import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Register_style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  width: "20rem",
  transform: "translate(-50%,-50%)",
  backgroundColor: "#FFF",
  padding: "3rem",
  zIndex: 1000,
};

const overlay_style = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgb( 0, 0, 0, .7 )",
  zIndex: 1000,
};

const FollowList = ({ open, onClose, followers }) => {
  if (!open) return null;
  return (
    <>
      <div style={overlay_style} onClick={onClose} />
      <div style={Register_style}>
        <AiOutlineClose className="ml-auto cursor-pointer" onClick={onClose} />
        <p className="text-lg font-semibold">Followers</p>
        <div className="max-h-96 overflow-scroll scrollbar-hide rounded-lg">
          {followers ? (
            <>
              {followers.map((follower) => {
                return follower.followers.map((follow) => {
                  return (
                    <div className="flex justify-left ml-3 my-3">
                      <img
                        className="rounded-full w-12 h-12 "
                        src={
                          follow.profilePic
                            ? follow.profilePic
                            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        }
                      />
                      <div className="text-left ml-2 ">
                        <p className="font-semibold">{follow.userName}</p>
                        <p className="text-sm">{follow.fullName}</p>
                      </div>
                    </div>
                  );
                });
              })}
            </>
          ) : (
            <>
              <p className="text-sm mt-2 text-[#dc2626]">
                Your followers shown will here
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FollowList;
