import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";

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

const AdminConfirm = ({
  open,
  onClose,
  id,
  user,
  block,
  unblock,
  banner,
  report,
  location
}) => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (token) {
      fetch(`${process.env.REACT_APP_BASEURL}/admin/details`, {
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": `${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == "err") {
            navigate("/Admin/Login");
          }
        });
    } else {
      navigate("/Admin/Login");
    }
  }, []);
  function adminConfirm() {
    if (token) {
      fetch(`${process.env.REACT_APP_BASEURL}/admin/details`, {
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": `${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == "err") {
            return navigate("/Admin/Login");
          }
        }).catch(err => {
          navigate('/PageNotFound')
        });
    } else {
      return navigate("/Admin/Login");
    }
    if (user) {
      if (block) {
        fetch(`${process.env.REACT_APP_BASEURL}/admin/blockUser/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Custom-Header": `${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if(data.err) {
              setLoader(false)
              return navigate('/PageNotFound')
            }
            if (data.status === "ok") {
              window.location.reload();
              toast.error("User has blocked", {
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
            navigate('/PageNotFound')
          });
      } else {
        fetch(`${process.env.REACT_APP_BASEURL}/admin/unblockUser/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Custom-Header": `${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if(data.err) {
              setLoader(false)
              return navigate('/PageNotFound')
            }
            if (data.status === "ok") {
              let i = 0;
              window.location.reload();
              toast.success("User has unblocked successfully", {
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
            navigate('/PageNotFound')
          });
      }
    } else if (banner) {
      fetch(`${process.env.REACT_APP_BASEURL}/admin/deleteBanner/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": `${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.err) {
            setLoader(false)
            return navigate('/PageNotFound')
          }
          if (data.status === "ok") {
            window.location.reload();
            toast.error("Banner has removed", {
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
          navigate('/PageNotFound')
        });
    } else if (report) {
      fetch(`${process.env.REACT_APP_BASEURL}/admin/removeReport/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": `${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.err) {
            setLoader(false)
            return navigate('/PageNotFound')
          }
          if (data.status === "ok") {
            window.location.reload();
            toast.success("Report has removed", {
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
          navigate('/PageNotFound')
        });
    } else if(location) {
      fetch(`${process.env.REACT_APP_BASEURL}/admin/removeLocation/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": `${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.err) {
            setLoader(false)
            return navigate('/PageNotFound')
          }
          if (data.status === "ok") {
            window.location.reload();
            toast.success("Report has removed", {
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
          navigate('/PageNotFound')
        });
    } else {
      setLoader(true);
      setTimeout(() => {
        localStorage.removeItem("adminToken");
        navigate("/Admin/Login");
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
      }, 500);
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
        <h3 className="text-center py-4 text-[24px] font-bold">
          Confirm{" "}
          {user
            ? block
              ? "Block User"
              : "Unblock User"
            : banner
            ? "Delete Banner"
            : report
            ? "Remove Report"
            : location 
            ? "Remove Location" : "Logout"}
          ?
        </h3>
        <div className="flex justify-center">
          Are you sure to{" "}
          {user
            ? block
              ? "Block User"
              : "Unblock User"
            : banner
            ? "delete this Banner"
            : report
            ? "remove this Report"
            : location
            ? "remove this location" : "Logout"}{" "}
          ..?
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
            onClick={adminConfirm}
          >
            Sure
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminConfirm;
