import React from "react";
import { useState } from "react";
import Loader from "../Loader/Loader";
import OtpVerify from "../OtpVerify/OtpVerify";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassContent = () => {
  const [otp, setOtp] = useState(false);
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate()
  function submitEmail() {
    const regx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email) {
      setErrMsg("Empty values are not allowed !!!");
    } else if (!email.match(regx)) {
      setErrMsg("Enter a valid email id");
    } else {
      fetch(`${process.env.REACT_APP_BASEURL}/user/forgotPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.err) {
            setLoader(false)
            // return navigate('/PageNotFound')
          }
          if (data.status === "notFound") {
            setErrMsg("Email is not found !!! Try with another or Signup");
          } else {
            setOtp(true);
            toast.success("An OTP has sended to your Email. Please check it.", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        })
        .catch((err) => {
          // navigate('/PageNotFound')
        });
    }
  }

  if (loader) return <Loader />;
  return (
    <div className="mx-auto max-w-[1240px]">
      <div className="w-96 mt-16 mx-auto border shadow text-center rounded-lg bg-[#fff]">
        <p className="text-lg font-bold py-5"> Forgot Password ..?</p>
        <p className="pb-2">Do you forgot your Password..?</p>
        <p className="px-4 pb-3 text-left">
          Please enter your Email Id. We will provide an OTP to check is that
          you or not.
        </p>
        <form className="text-left ml-14">
          <div id="scss" className="text-center z-10   text-[#53ec45] "></div>
          <div id="errrr" className="text-[#dc2626] text-center">
            {errMsg}
          </div>
          <label>
            Email
            <br />
            <input
              className="border w-[80%] pl-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email id"
            />
          </label>
          <br />
        </form>
        <button
          className="my-5 rounded-md px-3 py-1 bg-[#fbcfe8] hover:bg-[#db2777] hover:text-white"
          onClick={submitEmail}
        >
          Submit
        </button>
        <OtpVerify
          open={otp}
          email={email}
          forgot={true}
          onClose={() => {
            setOtp(false);
          }}
        />
      </div>
    </div>
  );
};

export default ForgotPassContent;
