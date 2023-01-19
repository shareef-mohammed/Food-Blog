import React, { useState } from "react";
import { useEffect } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { IoMdShareAlt } from "react-icons/io";
import { RWebShare } from "react-web-share";
import { TbMessageReport } from "react-icons/tb";
import ReportOnPost from "../ReportOnPost/ReportOnPost";

const LikeAndShare = ({ id, user, user1, postedUser }) => {
  const [like, setLike] = useState(false);
  const [report, setReport] = useState(false);
  const userId = user._id
  useEffect(() => {
    if (user) {
      const userId = user._id;
      fetch(`${process.env.REACT_APP_BASEURL}/user/getLikeDetails/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": `${userId}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const like = data.likes;
          if (like.length > 0) {
            setLike(true);
          } else {
            setLike(false);
          }
        })
        .catch(err => {
          console.log(err)
        });
    }
  }, [like]);

  const likePost = () => {
    if (user) {
      const userId = user._id;
      fetch(`${process.env.REACT_APP_BASEURL}/user/likePost/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === true) {
            setLike(true);
          } else {
            setLike(false);
          }
        })
        .catch(err => {
          console.log(err)
        });
    } else {
      console.log("not logged in ");
    }
  };

  

  return (
    <div className="flex pr-5">
      {like ? (
        <AiFillLike
          className="w-6 ml-2  h-6 cursor-pointer"
          onClick={likePost}
        />
      ) : (
        <AiOutlineLike
          className="w-6 ml-2  h-6 cursor-pointer"
          onClick={likePost}
        />
      )}
      {userId !== user1 ? <TbMessageReport
        onClick={() => setReport(true)}
        className="w-6 ml-2 h-6 cursor-pointer"
      /> : ''}
      <ReportOnPost
        id={id}
        postedUser={postedUser}
        user={user}
        userId={userId}
        open={report}
        onClose={() => setReport(false)}
      />
      <RWebShare
        data={{
          text: "Share the post...",
          url: `http://localhost:3000/singlePost/${id}`,
          title: "Share Post",
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <IoMdShareAlt className="w-6 ml-2  h-6 cursor-pointer" />
      </RWebShare>
    </div>
  );
};

export default LikeAndShare;
