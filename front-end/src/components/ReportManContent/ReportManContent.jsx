import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContentLoader from "../Loader/ContentLoader";
import ReportTable from "./ReportTable";

const ReportManContent = () => {
  const [reports, setReports] = useState([]);
  const [skip, setSkip] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    fetchPost();
  }, [skip]);

  const fetchPost = async () => {
    try {
      const { data, error } = await read(skip);
      if (error) {
        console.log(error);
        return;
      }

      if (data?.length === 0) {
        setIsEnd(true);
        return;
      }

      setReports([...reports, ...data]);
    } catch (error) {
      navigate('/PageNotFound')
    }
  };

  const token = localStorage.getItem('adminToken')
  const read = async (skip) => {
    const res = await fetch(
      `${process.env.REACT_APP_BASEURL}/admin/getReports?skip=${skip}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": `${token}`,
        },
      }
    );

    return await res.json();
  };

  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;
    if (offsetHeight + scrollTop >= scrollHeight) {
      if (isEnd) {
        setLoading(false);
      } else {
        setLoading(true);
      }
      setTimeout(() => {
        setSkip(skip + 5);
        setLoading(false);
      }, 1500);
    }
    {
      loading && <ContentLoader />;
    }
    {
      isEnd && (
        <h1 className="text-center py-4 text-[#16a34a]">
          You have reached the end
        </h1>
      );
    }
  };

  return (
    <div
      className="w-80% text-center p-4 h-[700px] overflow-scroll scrollbar-hide border-b-2"
      onScroll={handleScroll}
    >
      <table className="border-separate border border-slate-400 ">
        <thead>
          <tr>
            <th className="border border-slate-300 px-4 ">SI No</th>
            <th className="border border-slate-300 px-4">Post Id</th>
            <th className="border border-slate-300 px-4">User Name/ Email</th>
            <th className="border border-slate-300 px-4">Reported User Name</th>
            <th className="border border-slate-300 px-4">Report</th>
            <th className="border border-slate-300 px-4">Date</th>
            <th className="border border-slate-300 px-4">Action</th>
          </tr>
        </thead>
        <ReportTable reports={reports} />
      </table>
      {loading && <ContentLoader />}
      {isEnd && (
        <h1 className="text-center py-4 text-[#16a34a]">
          You have reached the end
        </h1>
      )}
    </div>
  );
};

export default ReportManContent;
