import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BarChar from "./BarChart";
import LineChar from "./LineChart";

const DashboardContent = () => {
  const [count, setCount] = useState("");
  const [totCount, setTotCount] = useState("");
  const navigate = useNavigate()
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASEURL}/admin/userCounts`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.err) {
          
          return navigate('/PageNotFound')
        }
        setCount(data.count);
        setTotCount(data.totCount);
      })
      .catch(err => {
        navigate('/PageNotFound')
      });
  });
  return (
    <div className="sm:w-[95%] md:w-[80%] mt-5">
      <div className="flex w-[100%] mt-3">
        <div className="w-[50%] text-center bg-[#f5d0fe] mx-4  rounded-md">
          <br />
          <h4 className="">This week</h4>
          <h3>Users</h3>
          <h2>{count}</h2>
        </div>
        <div className="w-[50%] text-center bg-[#f5d0fe] mx-4  rounded-md">
          <br />
          <h3>Total Users</h3>
          <h2>{totCount}</h2>
        </div>
      </div>
      <div className="w-[100%] ">
        <BarChar />
        <LineChar />
      </div>
    </div>
  );
};

export default DashboardContent;
