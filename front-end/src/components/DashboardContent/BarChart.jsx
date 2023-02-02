import React, { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";

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
import { useNavigate } from "react-router-dom";

const BarChar = () => {
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
        setData(data.users);

      })
      .catch((err) => {
        navigate('/PageNotFound')
      });
  }, []);

  
  return (
    data.length > 1 && (
      <div className="text-center m-8">
        <p className="text-xl font-semiblod">User Register - last 7 days</p>
        <ResponsiveContainer width="90%" height={350}>
          <BarChart
            // ref={chartRef}
            data={data}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
        {/* <button className="border" onClick={handleDownload} >Download PDF</button> */}
      </div>
    )
  );
};

export default BarChar;
