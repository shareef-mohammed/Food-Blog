import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentLoader from "../Loader/ContentLoader";
import UserTable from "./UserTable";

const UserManContent = () => {
  const [users, setUsers] = useState([]);
  const [block, setBlock] = useState(false);
  const [query, setQuery] = useState("");
  const [skip, setSkip] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    fetchPost();
  }, [skip, query]);
  const token = localStorage.getItem('adminToken')
  const read = async (skip) => {
    const res = await fetch(
      `${process.env.REACT_APP_BASEURL}/admin/userDetails?skip=${skip}&q=${query}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": `${token}`,
        },
      }
    );

    return await res.json();
  };

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

      if (!query) {
        setUsers([...users, ...data]);
      } else {
        setUsers([...data]);
      }
    } catch (error) {
      console.log(error.message);
    }
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
        setSkip(skip + 6);
        setLoading(false);
      }, 1500);
    }
  };

  const keys = ["userName", "fullName", "email"];

  const search = (data) => {
    return data.filter((item) => {
      return keys.some((key) => item[key].toLowerCase().includes(query));
    });
  };

  return (
    <div
      className="w-80% text-center h-[700px] overflow-scroll scrollbar-hide p-4"
      onScroll={handleScroll}
    >
      <div className="text-end ">
        <input
          type="text"
          className="w-96 h-10 pl-2 my-4 border-2 rounded-md"
          placeholder="Search here"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <UserTable data={search(users)} />
      {loading && <ContentLoader />}
      {isEnd && (
        <h1 className="text-center py-4 text-[#16a34a]">
          You have reached the end
        </h1>
      )}
    </div>
  );
};

export default UserManContent;
