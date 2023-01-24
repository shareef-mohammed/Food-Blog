import React, { useState } from "react";
import { useEffect } from "react";
import { format } from "timeago.js";
import { BsArrowRightCircleFill } from "react-icons/bs";
import ContentLoader from "../Loader/ContentLoader";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Comments = ({ user, pos, id }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isEnd, setIsEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const token = useSelector(selectCurrentToken)
  const navigate = useNavigate()

  useEffect(() => {
    fetchPost();
  }, [skip, comment]);

  const userI = user._id;

  const read = async (skip) => {
    const res = await fetch(
      `${process.env.REACT_APP_BASEURL}/user/postComments/${id}?skip=${skip}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": `${token}`,
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

      setComments([...comments, ...data]);
    } catch (error) {
      navigate('/PageNotFound')
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
        setSkip(skip + 4);
        setLoading(false);
      }, 1500);
    }
  };

  const postComment = (id) => {
    fetch(`${process.env.REACT_APP_BASEURL}/user/commentPost/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Custom-Header": `${token}`,
      },
      body: JSON.stringify({
        userI,
        comment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setComment("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="w-100 flex justify-center pt-4">
        <input
          className="bg-[#f3f4f6] w-[80%] h-12 rounded-2xl pl-3"
          placeholder="Comment on this post"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <BsArrowRightCircleFill
          className="w-10 ml-2 mt-1 h-10"
          onClick={() => postComment(pos._id)}
        />
      </div>
      <div
        className="max-h-96 w-[90%] overflow-scroll scrollbar-hide"
        onScroll={handleScroll}
      >
        {comments.map((comment, index) => {
          return (
            <div className="" key={index}>
              <div className="flex m-5">
                <img
                  className="h-5 w-5 rounded-full"
                  src={
                    comment.details[0].profilePic
                      ? comment.details[0].profilePic
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                />
                <p className="pl-2">{comment.details[0].userName}</p>
              </div>
              {comment.comment.map((comm, i) => {
                return (
                  <div className="mb-3" key={i}>
                    <p className="text-lg pl-5">{comm}</p>
                    <p className="text-xs pl-5 pt-1">
                      {format(comment.createdAt)}
                    </p>
                  </div>
                );
              })}
            </div>
          );
        })}
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

export default Comments;
