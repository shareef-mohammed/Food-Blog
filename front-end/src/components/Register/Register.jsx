import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import OtpVerify from "../OtpVerify/OtpVerify";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";

const Register_style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  width: "30rem",
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

const Register = ({ open, onClose }) => {
  const [otp, setOtp] = useState(false);
  const [userName, setUsername] = useState("");
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  function RegitserUser(e) {
    const regx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!userName || !fullName || !email || !phone || !password || !password2) {
      setErrMsg("Empty values are not allowed");
    } else if (userName.length < 6) {
      setErrMsg("User name should be contain more than 5 letters");
    } else if (!email.match(regx)) {
      setErrMsg("Enter a valid email id");
    } else if (phone.length !== 10 || isNaN(phone)) {
      setErrMsg("Enter a valid phone number");
    } else if (password.length < 6 || password.length > 15) {
      setErrMsg("Password must be with in 6 to 15 letters");
    } else if (password !== password2) {
      setErrMsg("Entered passwords are not matching");
    } else {
      setLoader(true);

      document.getElementById("error").innerHTML = "";
      fetch(`${process.env.REACT_APP_BASEURL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          fullName,
          email,
          phone,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.err) {
            setLoader(false)
            return navigate('/PageNotFound')
          }
          if (data.status === "emailExist") {
            setLoader(false);
            setErrMsg("Email is already exist !!! Try with another");
          } else if (data.status === "userExist") {
            setLoader(false);
            setErrMsg("Email is already exist !!! Try with another");
          } else if (data.status === "err") {
            setLoader(false);
            setErrMsg("something went wrong !!!");
          } else {
            setLoader(false);
            setOtp(true);
            toast.success(
              "An OTP has sended to your Email. Please check it ..!",
              {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              }
            );
          }
        })
        .catch((err) => {
          navigate('/PageNotFound')
        });
    }
  }

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
        <h3 className="text-center py-4 text-[24px] font-bold ">Register</h3>
        <form className="w-[100%]">
          <div id="error" className="text-center  text-[#dc2626] ">
            {errMsg}
          </div>
          <label className="py-1 w-[100%]">
            User Name <br />
            <input
              className="w-[100%] border-2"
              type="text"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label className="py-1 w-[100%]">
            Full Name <br />
            <input
              className="w-[100%] border-2"
              type="text"
              value={fullName}
              onChange={(e) => setFullname(e.target.value)}
            />
          </label>
          <br />
          <label className="py-1 w-[100%]">
            Email <br />
            <input
              className="w-[100%] border-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label className="py-1 w-[100%]">
            Phone <br />
            <input
              className="w-[100%] border-2"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
          <br />
          <label className="py-1 w-[100%]">
            Password <br />
            <input
              className="w-[100%] border-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <label className="py-1 w-[100%]">
            Re-enter Password <br />
            <input
              className="w-[100%] border-2 "
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </label>
        </form>
        <button
          className=" px-3 py-2 mt-3 bg-[#fbcfe8] hover:bg-[#db2777] hover:text-white"
          onClick={RegitserUser}
        >
          Submit
        </button>
        <OtpVerify
          open={otp}
          email={email}
          onClose={() => {
            setOtp(false);
            onClose();
          }}
        />
      </div>
    </>
  );
};

export default Register;
