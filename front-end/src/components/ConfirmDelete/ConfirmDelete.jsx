import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register_style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  backgroundColor: "#FFF",
  padding: "50px",
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

const ConfirmDelete = ({ open, onClose, id, photo, load }) => {
  const [loader, setLoader] = useState(false);
  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate()
  const deletePost = () => {
    if (!photo) {
      fetch(`${process.env.REACT_APP_BASEURL}/user/deletePost/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": `${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setLoader(true);
          if(data.err) {
            setLoader(false)
            return navigate('/PageNotFound')
          }
          if (data.status === "ok") {
            setTimeout(() => {
              setLoader(false);
              onClose();
              window.location.reload();
              toast.success("Post has removed", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            }, 1000);
          } else {
            setLoader(false);
          }
        })
        .catch((err) => {
          navigate('/PageNotFound')
        });
    } else {
      fetch(`${process.env.REACT_APP_BASEURL}/user/deletePhoto/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": `${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setLoader(true);
          if(data.err) {
            setLoader(false)
            return navigate('/PageNotFound')
          }
          if (data.status === "ok") {
            setTimeout(() => {
              setLoader(false);
              onClose();
              load();
              toast.success("Profile pictrue removed", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            }, 1000);
          } else {
            setLoader(false);
          }
        })
        .catch((err) => {
          navigate('/PageNotFound')
        });
    }
  };

  if (!open) return null;
  if (loader) return <Loader />;
  return (
    <>
      <div style={overlay_style} onClick={onClose} />
      <div style={Register_style} className="grid content-center rounded-md">
        <AiOutlineClose
          className="ml-auto w-5 h-5 cursor-pointer"
          onClick={onClose}
        />
        <h3 className="text-center py-4 text-[24px] font-bold">
          {photo ? "Delete Profile Picture" : "Delete Post"}
        </h3>
        <div className="flex justify-center">
          Are you sure to <p className="px-2 text-[#dc2626]"> DELETE </p> this{" "}
          {!photo ? "Post" : "Picture"} ..?
        </div>

        <div className="flex mx-auto">
          <button
            className="bg-[#22c55e] px-3 rounded-md py-1 mt-3 mx-1 text-white"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-[#dc2626] rounded-md px-6 py-1 mt-3 mx-1 text-white"
            onClick={deletePost}
          >
            Sure
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmDelete;
