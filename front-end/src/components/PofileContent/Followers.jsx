import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import FollowList from "./FollowList";

const Followers = () => {
  const [count, setCount] = useState("");
  const [followers, setFollowers] = useState([]);
  const [open, setOpen] = useState(false);
  const token = useSelector(selectCurrentUser);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASEURL}/user/followers`, {
      headers: {
        "Content-Type": "application/json",
        "X-Custom-Header": `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setFollowers(data.followers);
      })
      .catch(err => {
        console.log(err)
      });
  }, []);
  return (
    <>
      {count ? (
        <p className="font-semibold text-xl">{count[0].totFollowers}</p>
      ) : (
        0
      )}
      <p className="text-lg font-semibold cursor-pointer" onClick={() => setOpen(true)}>
        followers{" "}
      </p>
      <FollowList
        open={open}
        onClose={() => setOpen(false)}
        followers={followers}
      />
    </>
  );
};

export default Followers;
