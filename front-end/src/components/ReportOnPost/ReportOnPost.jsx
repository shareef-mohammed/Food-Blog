import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Loader from "../Loader/Loader";

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

const ReportOnPost = ({ user, userId, id, open, onClose, postedUser }) => {
  const [report, setReport] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [load, setLoad] = useState(false)

  const reportPost = () => {
    const reportedUser = user.userName;
    if (!report) {
      setErrMsg("Invalid input !!!");
      return;
    }
    if (report.length < 10) {
      setErrMsg("Write a valid reason!!!");
      return;
    }
    fetch(`${process.env.REACT_APP_BASEURL}/user/reportPost/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postedUser,
        reportedUser,
        report,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoad(true)
        if (data.status === "wrongErr") {
          setErrMsg("Something went wrong...");
        } else if (data.status === "inputErr") {
          setErrMsg("Invalid Input ...");
        } else {

          setTimeout(() => {
            onClose();
            setLoad(false)
          }, 1000);
        }
      })
      .catch(err => {
        console.log(err)
      });
  };
  if (!open) return null;
  if(load) return <Loader />
  return (
    <>
      <div style={overlay_style} onClick={onClose} />
      <div style={Register_style} className="grid content-center rounded-md">
        <AiOutlineClose
          className="ml-auto w-5 h-5 cursor-pointer"
          onClick={onClose}
        />
        <h3 className="text-center py-4 text-[24px] font-bold">Report Post</h3>
        <form>
          <div className="text-center z-10 text-[#dc2626]">{errMsg}</div>
          <label className="py-1 ">
            Report on this post...
            <br />
            <textarea
              className="w-[100%] border-2 mt-2 pl-1"
              type="text"
              value={report}
              onChange={(e) => setReport(e.target.value)}
            />
          </label>
          <br />
        </form>
        <button
          className=" px-3 py-2 mt-3 bg-[#fbcfe8] hover:bg-[#db2777] hover:text-white"
          onClick={reportPost}
        >
          Report
        </button>
      </div>
    </>
  );
};

export default ReportOnPost;
