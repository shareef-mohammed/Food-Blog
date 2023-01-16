import React from "react";

const AdminNavbar = () => {
  return (
    <>
      <div className="flex justify-between sticky top-0 left-0 right-0 z-10 items-center max-w-screen mx-auto px-4 rounded-md bg-gradient-to-r from-[#e7e5e4] to-[#fee2e2]">
        <div className="text-center">
          <img
            className="rounded-full mt-2 ms-3 w-24 h-16"
            src={process.env.PUBLIC_URL + "/foodblogLogo.jpg"}
          />
          <h2 className="w-full text-sm ps-3 font-bold text-[#059669] ">
            FoodieFrontier
          </h2>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
