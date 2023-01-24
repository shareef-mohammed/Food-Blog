import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

const NewBanner = ({ open, onClose }) => {
  const [foodName, setFoodName] = useState("");
  const [resName, setResName] = useState("");
  const [offer, setOffer] = useState("");
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const [code, setCode] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [locations, setLocations] = useState([])
  const token = localStorage.getItem('adminToken')
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASEURL}/posts/Locations`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLocations(data.location);
      })
      .catch((err) => {
        navigate('/PageNotFound')
      });
  },[])

  function addBanner() {
    if (!foodName || !resName || !offer || !image) {
      return setErrMsg(" Empty values are not allowed !!!");
    }
    if (code) {
      if (code.length < 5) {
        return setErrMsg("Enter a valid code");
      }
    }
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "sxbx2ye4");
    data.append("cloud_name", "dnqylncvu");

    fetch(" https://api.cloudinary.com/v1_1/dnqylncvu/image/upload", {
      method: "post",
      body: data,
    }).then((res) =>
      res.json().then((data) => {
        const url = data.url;

        fetch(`${process.env.REACT_APP_BASEURL}/admin/addBanner`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Custom-Header": `${token}`,
          },
          body: JSON.stringify({
            foodName,
            resName,
            address,
            offer,
            code,
            url,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if(data.err) {
              
              return navigate('/PageNotFound')
            }
            onClose();
            toast.success("Banner added successfully", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          })
          .catch((err) => {
            navigate('/PageNotFound')
          });
      })
    );
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
        <h3 className="text-center py-4 text-[24px] font-bold">New Banner</h3>
        <div className="text-left">
          <form>
            <div id="errr" className="text-center z-10 text-[#fca5a5]">
              {errMsg}
            </div>
            <label className="py-1">
              Food Name <br />
              <input
                className="w-[100%] border-2"
                type="text"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
              />
            </label>
            <br />

            <label className="py-1">
              Restaurant Name <br />
              <input
                className="w-[100%] border-2"
                type="text"
                value={resName}
                onChange={(e) => setResName(e.target.value)}
              />
            </label>
            <br />
            <label className="py-1">
              Address <br />
              <select
                className="w-[100%] border-2"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              > 
              {
              locations && locations.map((location, i) => {
                return(
                  <option key={i}>{location.name}</option>
                )
              })
            }
              </select>
            </label>
            <br />
            <label className="py-1">
              Offer
              <br />
              <input
                className="w-[100%] border-2"
                type="text"
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
              />
            </label>
            <br />
            <label className="py-1">
              Promo Code
              <br />
              <input
                className="w-[100%] border-2"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </label>
            <br />
            <label className="py-1">
              Image <br />
              <input
                className="w-[100%] border-2"
                type="file"
                accept="image/png, image/gif, image/jpeg"
                multiple
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
            <br />
          </form>
        </div>

        <button
          className="bg-[#1d4ed8] px-3 py-2 mt-3 text-white"
          onClick={addBanner}
        >
          Add
        </button>
      </div>
    </>
  );
};

export default NewBanner;
