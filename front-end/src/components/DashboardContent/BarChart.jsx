import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  BarChart,
  XAxis,
  Bar,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarChar = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASEURL}/admin/postChartData`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.users);
      })
      .catch(err => {
        console.log(err)
      });
  }, []);
  
  return (
    data.length>1 && <div className="text-center m-8">
      <p className="text-xl font-semiblod">User Register - last 7 days</p>
      <ResponsiveContainer width="90%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>  
    
  );
};

export default BarChar;
