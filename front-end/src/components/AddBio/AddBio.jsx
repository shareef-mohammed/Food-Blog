import React from "react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Register_style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  width: "30rem",
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

const AddBio = ({ open, onClose, id }) => {
  const [bio, setBio] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate()

  const user = useSelector(selectCurrentToken);
  const updateBio = (e) => {
    e.preventDefault();
    if (!bio) {
      setErrMsg("Fields cannot be empty");
      return;
    }
    if (bio.length < 20) {
      return setErrMsg("Your Bio must have atleast 20 letters");
    }
    fetch(`${process.env.REACT_APP_BASEURL}/user/updateBio/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Custom-Header": `${user}`,
      },
      body: JSON.stringify({
        bio,
      }),
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
            toast.success("Bio added successfully", {
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
          setErrMsg("Changes are not saved");
        }
      })
      .catch((err) => {
        navigate('/PageNotFound')
      });
  };

  if (loader) return <Loader />;
  if (!open) return null;
  return (
    <>
      <div style={overlay_style} onClick={onClose} />
      <div style={Register_style} className="grid content-center rounded-md">
        <AiOutlineClose
          className="ml-auto w-5 h-5 cursor-pointer"
          onClick={onClose}
        />
        <h3 className="text-center py-4 text-[24px] font-bold">Update Bio</h3>
        <form>
          <div className="text-center z-10 text-[#dc2626]">{errMsg}</div>
          <label className="py-1 ">
            Add your bio
            <br />
            <textarea
              className="w-[100%] border-2 mt-2 pl-1"
              type="text"
              onChange={(e) => setBio(e.target.value)}
            />
          </label>
          <br />
        </form>
        <button
          className=" px-3 py-2 mt-3 bg-[#fbcfe8] hover:bg-[#db2777] hover:text-white"
          onClick={updateBio}
        >
          Upload
        </button>
      </div>
    </>
  );
};

export default AddBio;
