import React, { useEffect } from "react";
import { useState } from "react";
import Loader from "../Loader/Loader";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

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

const Location = ({ opened, onClose, user, button }) => {
  const [places, setPlaces] = useState([]);
  const [load, setLoad] = useState(false);
  const token = useSelector(selectCurrentToken)
  const navigate = useNavigate()
  const id = user._id;
  useEffect(() => {
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
        setPlaces(data.location);
      })
      .catch((err) => {
        navigate('/PageNotFound')
      });
  }, [user]);

  const setLocality = (place) => {
    fetch(`${process.env.REACT_APP_BASEURL}/user/setLocality`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Custom-Header": `${token}`,
      },
      body: JSON.stringify({
        id,
        place,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoad(true);
        if(data.err) {
          setLoad(false)
          return navigate('/PageNotFound')
        }
        if (data.status === true) {
          setTimeout(() => {
            onClose();
            setLoad(false);
            toast.success("Location added successfully", {
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
      })
      .catch(err => {
        navigate('/PageNotFound')
      });
  };
  

  if (load) return <Loader />;
  if (!opened) return null;
  return (
    <>
      <div style={overlay_style} onClick={onClose} />
      <div style={Register_style} className="text-center rounded-lg">
        {button && (
          <AiOutlineClose
            className="ml-auto w-5 h-5 cursor-pointer"
            onClick={onClose}
          />
        )}
        <p className="text-xl font-semibold mb-2">
          Select your preferred Location
        </p>

        <div className="grid max-h-96 overflow-scroll scrollbar-hide">
          {places &&
            places.map((location, i) => {
              return (
                <div
                  key={i}
                  className="m-2 text-center rounded-lg bg-[#00df9a] cursor-pointer"
                  onClick={() => setLocality(location.name)}
                >
                  <p className="font-semibold py-5 uppercase text-white">
                    {location.name}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Location;
