import React from "react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

const ResetPassword = ({ open, email, onClose }) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function ResPassword() {
    if (!password) {
      document.getElementById("err1").innerHTML =
        "Empty values are not allowed !!!";
    } else if (password.length < 6 || password.length > 15) {
      document.getElementById("err1").innerHTML =
        "Password must be with in 6 to 15 letters";
    } else {
      fetch(`${process.env.REACT_APP_BASEURL}/user/resetPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.err) {
            
            return navigate('/PageNotFound')
          }
          if (data.status === "ok") {
            onClose();
            navigate("/");
            toast.success("Password has changed. Login again", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          } else {
            document.getElementById("err1").innerHTML =
              "Password is not changed";
          }
        })
        .catch((err) => {
          navigate('/PageNotFound')
        });
    }
  }

  if (!open) return null;
  return (
    <>
      <div style={overlay_style} onClick={onClose} />
      <div style={Register_style} className="grid content-center rounded-md">
        <AiOutlineClose
          className="ml-auto w-5 h-5 cursor-pointer"
          onClick={onClose}
        />
        <h3 className="text-center text-[24px] font-bold py-4">
          Reset Password
        </h3>
        <form>
          <div
            id="err1"
            className="text-center z-10 text-white bg-[#fca5a5]"
          ></div>

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
        </form>
        <button
          className="px-3 py-2 mt-3 bg-[#fbcfe8] hover:bg-[#db2777] hover:text-white"
          onClick={ResPassword}
        >
          Reset
        </button>
      </div>
    </>
  );
};

export default ResetPassword;
