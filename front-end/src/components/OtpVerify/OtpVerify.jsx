import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import ResetPassword from "../ResetPassword/ResetPassword";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";

const Register_style = {
  position: "fixed",
  width: "30rem",
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

const OtpVerify = ({
  open,
  email,
  id,
  onClose,
  forgot,
  changeEmail,
  input,
}) => {
  
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [reset, setReset] = useState(false);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);
  const [errMsg, setErrMsg] = useState("");
  const [loader, setLoader] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes]);

  function verifyOTP() {
    if (!otp) {
      setErrMsg("Empty values are not allowed");
    } else {
      console.log(input)
      setLoader(true);
      fetch(`${process.env.REACT_APP_BASEURL}/user/otpVerify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
          input,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.err) {
            setLoader(false)
            return navigate('/PageNotFound')
          }
          if (data.status === "invalid") {
            setLoader(false);
            setErrMsg("Invalid OTP !!!");
          } else if (data.status === "expired") {
            setErrMsg("Your OTP has expired !!! ");
            setLoader(false);
          } else if (!forgot) {
            setLoader(false);
            onClose();
            toast.success("You are successfully registered. Please Login.", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          } else if (changeEmail) {
            setLoader(false);
            fetch(`${process.env.REACT_APP_BASEURL}/user/updateProfile/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                input,
                email,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                if(data.err) {
                  setLoader(false)
                  return navigate('/PageNotFound')
          }
                if (data.status === "ok") {
                  setLoader(false);
                  onClose();
                  toast.success("Your Email has successfully changed", {
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
                  setLoader(false);
                }
              })
              .catch((err) => {
                navigate('/PageNotFound')
              });
          } else {
            setLoader(false);
            setReset(true);
            toast.success(
              "Verification has done. Please enter new Password",
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

  function resendOtp() {
    setLoader(true);
    fetch(`${process.env.REACT_APP_BASEURL}/user/resendOtp`, {
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
          return navigate('/PageNotFound')
        }
        if (data.status === "ok") {
          setLoader(false);
          setMinutes(1);
          setSeconds(30);
          toast.success(
            "OTP has resended. Check your email.",
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

        <h3 className="text-center py-5 text-[24px] font-bold">Verify OTP</h3>
        <form className="w-[100%]">
          <div id="err" className="text-[#dc2626]">
            {errMsg}
          </div>

          <label className="py-1 w-[100%]">
            Enter your OTP <br />
            <input
              className="w-[100%] border-2"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </label>
          <br />
          <div className="flex justify-between py-3">
            {seconds > 0 || minutes > 0 ? (
              <p>
                Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </p>
            ) : (
              <p>Didn't recieve code?</p>
            )}

            <p
              className="cursor-pointer"
              disabled={seconds > 0 || minutes > 0}
              style={{
                color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#dc2626",
              }}
              onClick={resendOtp}
            >
              Resend OTP
            </p>
          </div>

          {/* <p
            className="text-[#dc2626] text-center cursor-pointer"
            onClick={resendOtp}
          >
            Resend OTP
          </p> */}
        </form>
        <button
          className="bg-[#22c55e] px-3 py-2 mt-3 text-white"
          onClick={verifyOTP}
        >
          Verify
        </button>
        <ResetPassword
          open={reset}
          email={email}
          onClose={() => {
            setReset(false);
            onClose();
          }}
        />
      </div>
    </>
  );
};

export default OtpVerify;
