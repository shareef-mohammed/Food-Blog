import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GrImage, GrLocation } from "react-icons/gr";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register_style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  width: "27rem",
  transform: "translate(-50%,-50%)",
  backgroundColor: "#FFF",

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

const EditPost = ({ open, onClose, id, userId, load }) => {
  const [add, setAdd] = useState(false);
  const [rest, setRest] = useState(false);

  const [foodName, setFoodName] = useState("");
  const [desc, setDesc] = useState("");
  const [rating, setRating] = useState("");
  const [image1, setImage1] = useState("");
  const [resName, setResName] = useState("");
  const [image2, setImage2] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [loader, setLoader] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [locations,setLocations] = useState([])

  const navigate = useNavigate()
  const token = useSelector(selectCurrentToken);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASEURL}/user/getPost/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "X-Custom-Header": `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.err) {
          return navigate('/PageNotFound')
        }
        setFoodName(data.post.foodName);
        setDesc(data.post.desc);
        setRating(data.post.rating);
        setResName(data.post.resName);
        setContact(data.post.contact);
        setAddress(data.post.address);
        if(data.post.images) {
          setUrl1(data.post.images.url);
        }
        if(data.post.resImage) {

          setUrl2(data.post.resImage.url);
        }
      })
      .catch((err) => {
        console.log(err)
        navigate('/PageNotFound')
      });

      fetch(`${process.env.REACT_APP_BASEURL}/posts/Locations`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.err) {
            
            return navigate('/PageNotFound')
          }
          setLocations(data.location);
        })
        .catch((err) => {
          navigate('/PageNotFound')
        });
  }, []);

  async function addContent() {
    if (add === false) {
      setAdd(true);
    } else {
      if (image1) {
        const data = new FormData();
        data.append("file", image1);
        data.append("upload_preset", "sxbx2ye4");
        data.append("cloud_name", "dnqylncvu");

        await fetch(" https://api.cloudinary.com/v1_1/dnqylncvu/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            setUrl1(data.url);
          })
          .catch((err) => {
            console.log(err);
          });
        setAdd(false);
      } else {
        setAdd(false);
      }
    }
  }

  async function resImage() {
    if (rest === false) {
      setRest(true);
    } else {
      if (image2) {
        const data = new FormData();
        data.append("file", image2);
        data.append("upload_preset", "sxbx2ye4");
        data.append("cloud_name", "dnqylncvu");

        await fetch(" https://api.cloudinary.com/v1_1/dnqylncvu/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            setUrl2(data.url);
          })
          .catch((err) => {
            console.log(err);
          });
        setRest(false);
      } else {
        setRest(false);
      }
    }
  }

  async function editPost() {
    if (!foodName || !desc || !rating || !resName) {
      setErrMsg("Empty values are not allowed !!!");
    } else if (foodName.length < 3) {
      setErrMsg("Enter food name with atleast 3 letters");
    } else if (desc.length < 20) {
      setErrMsg("Description must be more than 20 words");
    } else if (rating > 5 || isNaN(rating)) {
      setErrMsg("Enter a valid rating for the food");
    } else {
      if (contact.length !== 10 || isNaN(contact)) {
        return setErrMsg("Please enter a valid number to contact");
      }

      if (address.length <= 3) {
        return setErrMsg("Enter a valid address");
      }

      if (image1) {
        const data = new FormData();
        data.append("file", image1);
        data.append("upload_preset", "sxbx2ye4");
        data.append("cloud_name", "dnqylncvu");

        await fetch(" https://api.cloudinary.com/v1_1/dnqylncvu/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            setUrl1(data.url);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      if (image2) {
        const data = new FormData();
        data.append("file", image2);
        data.append("upload_preset", "sxbx2ye4");
        data.append("cloud_name", "dnqylncvu");

        await fetch(" https://api.cloudinary.com/v1_1/dnqylncvu/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            setUrl2(data.url);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      fetch(`${process.env.REACT_APP_BASEURL}/user/editPost/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": `${token}`,
        },
        body: JSON.stringify({
          foodName,
          desc,
          rating,
          resName,
          contact,
          address,
          url1,
          url2,
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
              setErrMsg('')
              toast.success("Post edited successfully", {
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
    }
  }

  if (loader) return <Loader />;
  if (!open) return null;
  return (
    <>
      <div style={overlay_style} onClick={onClose} />
      <div
        style={Register_style}
        className="grid content-center h-screen mt-3 rounded-md overflow-y-scroll scrollbar-hide"
      >
        <AiOutlineClose
          className="ml-auto mr-8 w-5 h-5 cursor-pointer mt-20"
          onClick={onClose}
        />
        <h2 className="text-center  pb-4 font-bold text-[28px]">Edit Post</h2>
        <form className="w-[100%] ">
          <div id="err" className="text-[#dc2626]">
            {errMsg}
          </div>
          <div className="flex  ml-12">
            {!add ? (
              <>
                <AiOutlinePlusCircle
                  id="my-element"
                  data-tooltip-content="Add food image"
                  className="h-10 w-10 my-auto mr-3 cursor-pointer"
                  onClick={addContent}
                />
                <ReactTooltip anchorId="my-element" />
              </>
            ) : (
              <>
                <AiOutlineCloseCircle
                  id="my-element2"
                  data-tooltip-content="Close"
                  className="h-10 w-10 my-auto mr-3 cursor-pointer"
                  onClick={addContent}
                />
                <ReactTooltip anchorId="my-element2" />
              </>
            )}
            {!add ? null : (
              <div className="fixed bg-white flex ml-16">
                <label for="foodImg">
                  <GrImage
                    className="h-6 w-6 mt-5 ml-2 cursor-pointer"
                    id="my-element3"
                    data-tooltip-content="Select imgae"
                  />
                  <ReactTooltip anchorId="my-element3" />
                </label>
                <input
                  id="foodImg"
                  className="w-[82%] border-2 d hidden"
                  accept="image/png, image/gif, image/jpeg"
                  type="file"
                  onChange={(e) => {
                    setImage1(e.target.files[0]);
                  }}
                />
              </div>
            )}
            <input
              className="w-[50%] h-16 focus:outline-none border-none text-[20px]"
              type="text"
              placeholder={add ? "" : "Tell your food name . . ."}
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
            />
            <br />
          </div>
          <br />
          <textarea
            className="w-[70%] ml-4 h-16 focus:outline-none border-none text-[20px]"
            type="text"
            placeholder="Write something about the food . . ."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <br />
          <input
            className="w-[70%] ml-4 h-16 focus:outline-none border-none text-[20px]"
            type="text"
            placeholder="Give a rating for the food in 5. . ."
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <br />
          <div className="flex  ml-12">
            {!rest ? (
              <>
                <AiOutlinePlusCircle
                  id="my-element5"
                  data-tooltip-content="add image for Restaurant"
                  className="h-10 w-10 my-auto mr-3 cursor-pointer"
                  onClick={resImage}
                />
                <ReactTooltip anchorId="my-element5" />
              </>
            ) : (
              <>
                <AiOutlineCloseCircle
                  id="my-element6"
                  data-tooltip-content="Close"
                  className="h-10 w-10 my-auto mr-3 cursor-pointer"
                  onClick={resImage}
                />
                <ReactTooltip anchorId="my-element6" />
              </>
            )}
            {!rest ? null : (
              <div className="fixed bg-white flex ml-16">
                <label for="restImg">
                  <GrImage
                    id="my-element4"
                    data-tooltip-content="Add image"
                    className="h-6 w-6 mt-5 ml-2 cursor-pointer"
                  />
                </label>
                <ReactTooltip anchorId="my-element4" />
                <input
                  id="restImg"
                  className="w-[82%] border-2 d hidden"
                  accept="image/png, image/gif, image/jpeg"
                  type="file"
                  onChange={(e) => {
                    setImage2(e.target.files[0]);
                  }}
                />
              </div>
            )}
            <input
              className="w-[50%] h-16 focus:outline-none border-none text-[20px]"
              type="text"
              placeholder={rest ? "" : "Tell restaurant name . . ."}
              value={resName}
              onChange={(e) => setResName(e.target.value)}
            />
            <br />
          </div>
          <br />
          (Optional) <br />
          <input
            className="w-[70%] ml-4 h-16 focus:outline-none border-none text-[20px]"
            type="text"
            placeholder="Attatch the contact number of restaurant . . ."
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <br />
          Select restaurant location
          <br />
          <select
            className="w-[70%] ml-4 mt-2 h-10 rounded-lg focus:outline-none border-none text-[20px]"
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
        </form>
        <button
          id="my-element7"
          data-tooltip-content="Edit Post"
          className="px-3 py-2 mt-5 mb-8 mx-12 bg-[#fbcfe8] hover:bg-[#db2777] hover:text-white"
          onClick={editPost}
        >
          Edit Post
        </button>
        <ReactTooltip anchorId="my-element7" />
      </div>
    </>
  );
};

export default EditPost;
