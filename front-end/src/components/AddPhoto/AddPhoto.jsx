import React, { useState } from "react";
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

const AddPhoto = ({ open, onClose, id }) => {
  const [image, setImage] = useState("");
  const [loader, setLoader] = useState(false);
  const user = useSelector(selectCurrentToken);
  const navigate = useNavigate()
  const uploadImage = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "sxbx2ye4");
    data.append("cloud_name", "dnqylncvu");

    fetch(" https://api.cloudinary.com/v1_1/dnqylncvu/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        const url = data.url;
        fetch(`${process.env.REACT_APP_BASEURL}/user/uploadPhoto/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Custom-Header": `${user}`,
          },
          body: JSON.stringify({
            url,
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
                toast.success("Profile picture updated successfully", {
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
            }
          })
          .catch((err) => {
            navigate('/PageNotFound')
          });
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
        <h3 className="text-center py-4 text-[24px] font-bold">Edit Profile</h3>
        <form>
          <div
            id="errr"
            className="text-center z-10 text-white bg-[#fca5a5]"
          ></div>
          <label className="py-1 ">
            Select your profile picture and upload
            <br />
            <input
              className="w-[100%] border-2 mt-2 pl-1"
              accept="image/png, image/gif, image/jpeg"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <br />
        </form>
        <button
          className=" px-3 py-2 mt-3 bg-[#fbcfe8] hover:bg-[#db2777] hover:text-white"
          onClick={uploadImage}
        >
          Upload
        </button>
      </div>
    </>
  );
};

export default AddPhoto;
