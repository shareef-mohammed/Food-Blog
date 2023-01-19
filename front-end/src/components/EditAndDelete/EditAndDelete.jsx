import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";
import EditPost from "../EditPost/EditPost";
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const EditAndDelete = ({ post, user, load }) => {
  const [del, setDel] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const singleCategory = (id) => {
    setLoader(true);
    setTimeout(() => {
      navigate(`/Posts/SingleCategory/${id}`);
      setLoader(false);
    }, 1000);
  };
  if (loader) return <Loader />;
  return (
    <>
      {user && <EditPost
        open={edit}
        onClose={() => setEdit(false)}
        load={load}
        id={post._id}
      />}
      <ConfirmDelete
        open={del}
        onClose={() => setDel(false)}
        load={load}
        id={post._id}
      />
      {user ? (
        <div className="mt-20 w-24 h-10 absolute rounded-lg ml-28 justify-center flex bg-[#d1fae5] opacity-5 hover:opacity-100 scale-110 ease-in-out duration-300">
          <FaEdit
            className="w-8 h-8 mr-2 mt-1 cursor-pointer "
            onClick={() => setEdit(true)}
          />
          <MdDelete
            className="w-8 h-8 mt-1 cursor-pointer"
            onClick={() => setDel(true)}
          />
        </div>
      ) : (
        <div className="mt-20 w-12 h-10 absolute rounded-lg ml-32 justify-center flex bg-[#d1fae5] opacity-5 hover:opacity-100 scale-110 ease-in-out duration-300">
          <AiFillEye
            className="w-8 h-8 mt-1 cursor-pointer "
            onClick={() => singleCategory(post._id)}
          />
        </div>
      )}
    </>
  );
};

export default EditAndDelete;
