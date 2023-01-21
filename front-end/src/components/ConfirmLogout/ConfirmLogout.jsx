import React, { useState } from "react";
import { logOut } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
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

const ConfirmLogout = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();

  function userLogout() {
    setLoader(true);

    setTimeout(() => {
      dispatch(logOut());
      navigate("/");
      setLoader(false);
      toast.success("Successfully logged out", {
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
          Confirm Logout
        </h3>
        <div className="flex justify-center">
          <p>
            Are you sure to <span className="px-1 text-[#dc2626]">Logout </span>
            .. ?
          </p>
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
            onClick={userLogout}
          >
            Sure
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmLogout;
