import React, { useState } from "react";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { FaRegCopyright } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const Footer = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  if (loader) return <Loader />;
  return (
    <>
      <div className="flex text-center justify-center relative  max-w-[1240px] mx-auto px-4 mt-8 border-t-2">
        <div className="">
          <img
            className="rounded-full mt-2 mx-auto w-32 h-24 cursor-pointer"
            onClick={() => {
              setLoader(true);
              setTimeout(() => {
                navigate("/");
                setLoader(false);
              }, 500);
            }}
            src={process.env.PUBLIC_URL + "/foodblogLogo.jpg"}
          />
          <h2 className="w-full text-xl pl-3 mb-5 font-bold text-[#00df9a] ">
            FoodieFrontier
          </h2>
          <div className="flex ">
            <div className="">
              <BsFacebook className="w-8 h-8 mx-auto" />
              <h6 className="p-2">Follow us on Facebook</h6>
            </div>
            <div className="mx-4">
              <BsTwitter className="w-8 h-8 mx-auto" />
              <h6 className="p-2">Follow us on Twitter</h6>
            </div>
            <div className="">
              <AiFillInstagram className="w-8 h-8 mx-auto" />
              <h6 className="p-2">Follow us on Instagram</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-8 pt-5 flex justify-center items-center max-w-[1240px] mx-auto  text-center">
        <p className="flex font-light ">
          Copyright <FaRegCopyright className="mx-2 mt-1" /> 2022 FoodieFrontier
          Inc.
        </p>
      </div>
    </>
  );
};

export default Footer;
