import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Loader from "../Loader/Loader";
import AdminConfirm from "../AdminConfirm/AdminConfirm";

const Sidebar = ({ dashboard, users, banners, reports, location }) => {
  const [side, setSide] = useState(true);
  const [load, setLoad] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleSide = () => {
    setSide(!side);
  };

  const closeSide = () => {
    setSide(true);
  };
  const navigate = useNavigate();

  if (load) return <Loader />;
  return (
    <div className="w-[20%] h-[600px] pt-3 sticky left-0 top-24 bottom-0 float-left md:border-r border-gray">
      <div className="hidden md:block">
        <h6
          className={
            dashboard
              ? "pl-3 cursor-pointer bg-[#06b6d4] py-3 rounded-md"
              : "py-3 pl-3 cursor-pointer"
          }
          onClick={() => {
            setLoad(true);
            setTimeout(() => {
              navigate("/Admin/Dashboard");
              setLoad(false);
            }, 500);
          }}
        >
          Dashboard
        </h6>
        <h6
          className={
            users
              ? "pl-3 cursor-pointer bg-[#06b6d4] py-3 rounded-md"
              : "py-3 pl-3 cursor-pointer"
          }
          onClick={() => {
            setLoad(true);
            setTimeout(() => {
              navigate("/Admin/UserManagement");
              setLoad(false);
            }, 500);
          }}
        >
          User Management
        </h6>
        <h6
          className={
            banners
              ? "pl-3 cursor-pointer bg-[#06b6d4] py-3 rounded-md"
              : "py-3 pl-3 cursor-pointer"
          }
          onClick={() => {
            setLoad(true);
            setTimeout(() => {
              navigate("/Admin/BannerManagement");
              setLoad(false);
            }, 500);
          }}
        >
          Banner Management
        </h6>
        <h6
          className={
            reports
              ? "pl-3 cursor-pointer bg-[#06b6d4] py-3 rounded-md"
              : "py-3 pl-3 cursor-pointer"
          }
          onClick={() => {
            setLoad(true);
            setTimeout(() => {
              navigate("/Admin/ReportManagement");
              setLoad(false);
            }, 500);
          }}
        >
          Report Management
        </h6>
        <h6
          className={
            location
              ? "pl-3 cursor-pointer bg-[#06b6d4] py-3 rounded-md"
              : "py-3 pl-3 cursor-pointer"
          }
          onClick={() => {
            setLoad(true);
            setTimeout(() => {
              navigate("/Admin/LocationManagement");
              setLoad(false);
            }, 500);
          }}
        >
          Location Management
        </h6>
        
        <h6
          className="py-3 pl-3 cursor-pointer"
          onClick={() => setConfirm(true)}
        >
          Logout
        </h6>
        <AdminConfirm open={confirm} onClose={() => setConfirm(false)} />
      </div>
      <div onClick={handleSide} className="block ml-2 md:hidden ">
        {!side ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          !side
            ? "fixed z-10 left-0 top-24 w-[60%] h-full border-r border-r-gray-900 bg-[#fff] ease-in-out duration-500"
            : "fixed left-[-300px]"
        }
      >
        <AiOutlineClose
          size={20}
          className="ml-auto mr-2 my-2"
          onClick={closeSide}
        />
        <h6
          className={
            dashboard
              ? "pl-3 cursor-pointer bg-[#06b6d4] py-3 rounded-md "
              : "py-3 pl-3 cursor-pointer"
          }
          onClick={() => {
            setLoad(true);
            setTimeout(() => {
              navigate("/Admin/Dashboard");
              setLoad(false);
            }, 500);
          }}
        >
          Dashboard
        </h6>
        <h6
          className={
            users
              ? "pl-3 cursor-pointer bg-[#06b6d4] py-3 rounded-md"
              : "py-3 pl-3 cursor-pointer"
          }
          onClick={() => {
            setLoad(true);
            setTimeout(() => {
              navigate("/Admin/UserManagement");
              setLoad(false);
            }, 500);
          }}
        >
          User Management
        </h6>
        <h6
          className={
            banners
              ? "pl-3 cursor-pointer bg-[#06b6d4] py-3 rounded-md"
              : "py-3 pl-3 cursor-pointer"
          }
          onClick={() => {
            setLoad(true);
            setTimeout(() => {
              navigate("/Admin/BannerManagement");
              setLoad(false);
            }, 500);
          }}
        >
          Banner Management
        </h6>
        <h6
          className={
            reports
              ? "pl-3 cursor-pointer bg-[#06b6d4] py-3 rounded-md"
              : "py-3 pl-3 cursor-pointer"
          }
          onClick={() => {
            setLoad(true);
            setTimeout(() => {
              navigate("/Admin/ReportManagement");
              setLoad(false);
            }, 500);
          }}
        >
          Report Management
        </h6>
        <h6
          className={
            location
              ? "pl-3 cursor-pointer bg-[#06b6d4] py-3 rounded-md"
              : "py-3 pl-3 cursor-pointer"
          }
          onClick={() => {
            setLoad(true);
            setTimeout(() => {
              navigate("/Admin/LocationMangement");
              setLoad(false);
            }, 500);
          }}
        >
          Location Management
        </h6>
        <h6
          className="py-3 pl-3 cursor-pointer"
          onClick={() => setConfirm(true)}
        >
          Logout
        </h6>
        <AdminConfirm open={confirm} onClose={() => setConfirm(false)} />
      </div>
    </div>
  );
};

export default Sidebar;
