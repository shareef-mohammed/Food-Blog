import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CartesianGrid,
  LineChart,
  XAxis,
  Line,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LineChar = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASEURL}/admin/postChartData`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.err) {          
          return navigate('/PageNotFound')
        }
        setData(data.data);
      })
      .catch(err => {
        navigate('/PageNotFound')
      });
  }, []);

  
  return (
    data.length>1 && <div className="text-center m-8">
      <p className="text-xl font-semiblod">Posts - Last 7 Days</p>
      <ResponsiveContainer width="90%" height={350}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>  
  );
};

export default LineChar;
