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

const BarChar = () => {
  const [data, setData] = useState([]);
  // const chartRef = useRef(null);

  // const handleDownload = () => {
  //   const chartNode = chartRef.current;
  //   console.log(chartNode)
  //   const canvas = chartNode.chartInstance.canvas;
  //   const imgData = canvas.toDataURL('image/png');

  //   const pdf = new jsPDF('p', 'mm', 'a4');
  //   pdf.addImage(imgData, 'PNG', 10, 10, 180, 100);
  //   pdf.save('chart.pdf');
  // };

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
      .catch((err) => {
        console.log(err);
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
            <XAxis dataKey="date" />
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
