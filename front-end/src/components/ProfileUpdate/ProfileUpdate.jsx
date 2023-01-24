import React, { useState } from "react";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut, selectCurrentToken, selectCurrentUser } from "../../features/auth/authSlice";
import Loader from "../Loader/Loader";
import OtpVerify from "../OtpVerify/OtpVerify";
import { toast } from "react-toastify";

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

const ProfileUpdate = ({
  open,
  onClose,
  user,
  userName,
  fullName,
  email,
  phone,
}) => {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken)

  const navigate = useNavigate();

  function userLogout() {
    dispatch(logOut());
    navigate("/");
  }

  const updateProfile = (id) => {
    if (!input) {
      setErrMsg("empty values are not allowed");
    }

    if (userName) {
      if (input.length < 5) {
        setErrMsg("User name should by greater than 4 letters");
      } else {
        fetch(`${process.env.REACT_APP_BASEURL}/user/updateProfile/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Custom-Header": `${token}`,
          },
          body: JSON.stringify({
            input,
            userName,
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
                userLogout();
                toast.success("User name has changed successfully. Login again.", {
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
              setErrMsg("changes are not done");
            }
          })
          .catch((err) => {
            navigate('/PageNotFound')
          });
      }
    }
    if (fullName) {
      if (fullName.length < 6) {
        setErrMsg("Full name should greater than 5 letter");
      } else {
        fetch(`${process.env.REACT_APP_BASEURL}/user/updateProfile/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Custom-Header": `${token}`,
          },
          body: JSON.stringify({
            input,
            fullName,
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
                setInput("");
                toast.success("Full name has changed successfully", {
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
              setErrMsg("changes are not done.");
            }
          })
          .catch((err) => {
            navigate('/PageNotFound')
          });
      }
    }
    if (email) {
      const regx =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!input.match(regx)) {
        setErrMsg("Invalid Email id");
      } else {
        fetch(`${process.env.REACT_APP_BASEURL}/user/resetEmail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Custom-Header": `${token}`,
          },
          body: JSON.stringify({
            input,
            id,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            setLoader(true);
            if(data.err) {
              setLoader(false)
              return navigate('/PageNotFound')
            }
            if (data.status === "notFound") {
              setErrMsg("Email is not found !!! Try with another or Signup");
            } else {
              setTimeout(() => {
                setLoader(false);
                setIsOpen(true);
                setInput("");
                toast.success("An otp has sended to your Email. Check it", {
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
            }
          })
          .catch((err) => {
            navigate('/PageNotFound')
          });
      }
    }
    if (phone) {
      if (input.length !== 10 || isNaN(input)) {
        setErrMsg("Invalid Phone number");
      } else {
        fetch(`${process.env.REACT_APP_BASEURL}/user/updateProfile/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Custom-Header": `${token}`,
          },
          body: JSON.stringify({
            input,
            phone,
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
                setInput("");
                toast.success("Phone number changed successfully", {
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
              setErrMsg("Changes are not done.");
            }
          })
          .catch((err) => {
            navigate('/PageNotFound')
          });
      }
    }
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
        <h3 className="text-center py-4 text-[24px] font-bold">Edit Profile</h3>
        <form>
          <div
            id="errr"
            className="text-center z-10 text-white bg-[#fca5a5]"
          ></div>
          <label className="py-1 ">
            Do you want to change{" "}
            <p className="text-[#ef4444]">
              {userName
                ? user.userName
                : fullName
                ? user.fullName
                : email
                ? user.email
                : phone
                ? user.phone
                : ""}
            </p>{" "}
            <br />
            <input
              className="w-[100%] border-2 pl-1"
              type="text"
              placeholder="New value"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </label>
          <br />
        </form>
        <button
          className=" px-3 py-2 mt-3 bg-[#fbcfe8] hover:bg-[#db2777] hover:text-white"
          onClick={() => updateProfile(user._id)}
        >
          Change
        </button>
        <OtpVerify
          open={isOpen}
          forgot={true}
          id={user._id}
          email={true}
          input={input}
          changeEmail={true}
          onClose={() => {
            setIsOpen(false);
            onClose();
          }}
        />
      </div>
    </>
  );
};

export default ProfileUpdate;
