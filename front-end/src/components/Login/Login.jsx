import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";

const Register_style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  width: "30rem",
  transform: "translate(-50%,-50%)",
  backgroundColor: "#FFF",
  padding: "5rem",
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

const Login = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const [login, { isLogin }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    setErrMsg("");
  }, [name, password]);

  const userLogin = async (e) => {
    setLoader(true);
    e.preventDefault();

    try {
      const userData = await login({ name, password }).unwrap();
      dispatch(setCredentials({ ...userData, name }));
      setLoader(false);
      setName("");
      setPassword("");
      onClose();
      toast.success("Successfully Logged in", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (err) {
      if (!err?.originalStatus) {
        setLoader(false);
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setLoader(false);
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setLoader(false);
        setErrMsg("Unauthorized");
      } else if (err.originalStatus === 402) {
        setLoader(false);
        setErrMsg("You are not verified user !!!");
      } else if (err.originalStatus === 403) {
        setLoader(false);
        setErrMsg("You are restricted to access the website !!!");
      } else {
        setLoader(false);
        setErrMsg("Login Failed");
      }
    }
  };

  const forgetPassword = () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      navigate("/User/ForgotPassword");
    }, 1000);
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
        <h3 className="text-center py-4 text-[24px] font-bold">Log in</h3>
        <form>
          <div className="text-center z-10 text-[#dc2626]">{errMsg}</div>
          <label className="py-1">
            User Name or Email Id <br />
            <input
              className="w-[100%] border-2"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <br />

          <label className="py-1">
            Password <br />
            <input
              className="w-[100%] border-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <p
            className="text-[#dc2626] text-center cursor-pointer "
            onClick={forgetPassword}
          >
            Forgot Password ?
          </p>
        </form>
        <button
          className="bg-[#fbcfe8] hover:bg-[#db2777] hover:text-white px-3 py-2 mt-3 "
          onClick={userLogin}
        >
          Login
        </button>
      </div>
    </>
  );
};

export default Login;
