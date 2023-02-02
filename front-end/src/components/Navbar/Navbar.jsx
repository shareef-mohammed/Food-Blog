import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectCurrentToken,
} from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Location from "../Location/Location";

import Login from "../Login/Login";
import Register from "../Register/Register";
import ConfirmLogout from "../ConfirmLogout/ConfirmLogout";
import Loader from "../Loader/Loader";
import { useEffect } from "react";

const Navba = ({ home, posts, profile, chats }) => {
  const token = useSelector(selectCurrentToken);
  const name = useSelector(selectCurrentUser);

  const [nav, setNav] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [location, setLocation] = useState(false)
  const [user, setUser] = useState('')
  
  
  const [log, setLog] = useState(false);
  const [isLoginComp, setIsLoginComp] = useState(false);
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };
  
  useEffect(() => {
    
    if(token) {
      fetch(`${process.env.REACT_APP_BASEURL}/user/details`, {
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": `${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data.details);
        })
        .catch(err => {
          console.log(err)
        });
      fetch(`${process.env.REACT_APP_BASEURL}/user/isLocated`,{
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": `${name}`,
        },
      })
      .then(res => res.json())
      .then(data => {
        if(data.status === false ){
          console.log('first')
          setLocation(true)
          
        } else {
          
          setLocation(false)
        }
      })
      .catch(err => {
        console.log(err)
      }) 
    }
  },[])
  

  if (loader) return <Loader />;
  return (
    <>
    <Location opened={location} user={user} onClose={() => {
        setLocation(false)
      }} />
      <div className="flex justify-between sticky top-0 left-0 right-0 z-10 items-center max-w-[1255px] mx-auto px-4 rounded-xl bg-gradient-to-r from-[#e7e5e4] to-[#fee2e2]">
        <div className="text-center">
          <img
            className="rounded-full mt-2 ms-3 w-24 h-16 cursor-pointer"
            onClick={() => {
              setLoader(true);
              setTimeout(() => {
                navigate("/");
                setLoader(false);
              }, 500);
            }}
            src={process.env.PUBLIC_URL + "/foodblogLogo.jpg"}
          />
          <h2 className="w-full text-sm ps-3 font-bold text-[#059669] ">
            FoodieFrontier
          </h2>
        </div>
        <ul className=" hidden md:flex my-auto">
          <li
            className={
              home
                ? "m-4 px-4 pt-2 rounded-xl cursor-pointer bg-white"
                : "m-4 px-4 pt-2 cursor-pointer"
            }
            onClick={() => {
              setLoader(true);
              setTimeout(() => {
                navigate("/");
                setLoader(false);
              }, 500);
            }}
          >
            HOME
          </li>
          <li
            className={
              posts
                ? "m-4 px-4 pt-2 rounded-xl cursor-pointer bg-white"
                : "m-4 pt-2 px-4 cursor-pointer"
            }
            onClick={() => {
              setLoader(true);
              setTimeout(() => {
                navigate("/Posts");
                setLoader(false);
              }, 500);
            }}
          >
            POSTS
          </li>
          {token ? (
            <>
              <li
                className={
                  profile
                    ? "m-4 px-4 pt-2 rounded-xl cursor-pointer bg-white"
                    : "m-4 pt-2 px-4 cursor-pointer"
                }
                onClick={() => {
                  setLoader(true);
                  setTimeout(() => {
                    navigate("/Profile");
                    setLoader(false);
                  }, 500);
                }}
              >
                PROFILE
              </li>
              <li
                className={
                  chats
                    ? "m-4 px-4 pt-2 rounded-xl cursor-pointer bg-white"
                    : "m-4 pt-2 px-4 cursor-pointer"
                }
                onClick={() => {
                  setLoader(true);
                  setTimeout(() => {
                    navigate("/Chat");
                    setLoader(false);
                  }, 500);
                }}
              >
                CHATS
              </li>
              <li
                className="m-4 p-2 cursor-pointer"
                onClick={() => {
                  setLog(true);
                }}
              >
                LOGOUT
              </li>
              <ConfirmLogout onClose={() => setLog(false)} open={log} />
            </>
          ) : (
            <>
              <li
                className="m-4 p-2 cursor-pointer "
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                SIGN UP
              </li>
              <li
                className="m-4 p-2 cursor-pointer"
                onClick={() => {
                  setIsLoginComp(true);
                  setLog(false);
                }}
              >
                LOG IN
              </li>
            </>
          )}

          <Register
            open={isOpen}
            onClose={() => {
              setIsOpen(false);
            }}
          />

          <Login
            open={isLoginComp}
            onClose={() => {
              setIsLoginComp(false);
            }}
          />
        </ul>
        <div onClick={handleNav} className="block md:hidden">
          {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <div
          className={
            !nav
              ? "fixed z-10 left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#fff] ease-in-out duration-500"
              : "fixed left-[-300px]"
          }
        >
          <div className="m-5 ">
            <img
              className="rounded-full mt-5 ms-3 w-32 h-24"
              src={process.env.PUBLIC_URL + "/foodblogLogo.jpg"}
            />
            <h1 className="w-full text-2xl font-bold text-[#00df9a] ">
              FoodieFrontier
            </h1>
          </div>
          <ul className="p-3 uppercase ">
            <li
              className={
                home
                  ? "p-4 bg-[#f0abfc] rounded-md font-semibold text-white text-lg"
                  : posts
                  ? "p-4  "
                  : "p-4 border-b border-gray-600 "
              }
              onClick={() => {
                setLoader(true);
                setTimeout(() => {
                  navigate("/");
                  setLoader(false);
                }, 500);
              }}
            >
              HOME
            </li>
            <li
              className={
                posts
                  ? "p-4 bg-[#f0abfc] rounded-md font-semibold text-white text-lg"
                  : profile
                  ? "p-4"
                  : "p-4 border-b border-gray-600"
              }
              onClick={() => {
                setLoader(true);
                setTimeout(() => {
                  navigate("/Posts");
                  setLoader(false);
                }, 500);
              }}
            >
              POSTS
            </li>
            {token ? (
              <>
                <li
                  className={
                    profile
                      ? "p-4 bg-[#f0abfc] rounded-md font-semibold text-white text-lg"
                      : "p-4 border-b border-gray-600"
                  }
                  onClick={() => {
                    setLoader(true);
                    setTimeout(() => {
                      navigate("/Profile");
                      setLoader(false);
                    }, 500);
                  }}
                >
                  PROFILE
                </li>
                <li
                  className={
                    chats
                      ? "p-4 bg-[#f0abfc] rounded-md font-semibold text-white text-lg"
                      : "p-4 border-b border-gray-600"
                  }
                  onClick={() => {
                    setLoader(true);
                    setTimeout(() => {
                      navigate("/Chat");
                      setLoader(false);
                    }, 500);
                  }}
                >
                  CHATS
                </li>
                <li
                  className="p-4 border-b border-gray-600"
                  onClick={() => {
                    setLog(true);
                  }}
                >
                  LOGOUT
                </li>
                <ConfirmLogout onClose={() => setLog(false)} open={log} />
              </>
            ) : (
              <>
                <li
                  className="p-4 border-b border-gray-600"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  Sign up
                </li>
                <Register open={isOpen} onClose={() => setIsOpen(false)} />
                <li
                  className="p-4 border-b border-gray-600"
                  onClick={() => {
                    setIsLoginComp(true);
                    setLog(false);
                  }}
                >
                  LOGIN
                </li>
                <Login
                  open={isLoginComp}
                  onClose={() => {
                    setIsLoginComp(false);
                  }}
                />
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navba;
