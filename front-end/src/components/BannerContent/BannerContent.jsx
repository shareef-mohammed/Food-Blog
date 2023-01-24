import React, { useEffect, useState } from "react";
import AdminConfirm from "../AdminConfirm/AdminConfirm";
import ContentLoader from "../Loader/ContentLoader";
import NewBanner from "../NewBanner/NewBanner";
import DeleteButton from "./DeleteButton";
import moment from 'moment'
import { useNavigate } from "react-router-dom";

const BannerContent = () => {
  const [banner, setBanner] = useState(false);
  const [banners, setBanners] = useState([]);
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

      setBanners([...banners, ...data]);
    } catch (error) {
      navigate('/PageNotFound')
    }
  };

  const token = localStorage.getItem("adminToken");
  const read = async (skip) => {
    const res = await fetch(
      `${process.env.REACT_APP_BASEURL}/admin/banners?skip=${skip}`,
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
  };

  let i = 0;
  if (banners.length === 0)
    return (
      <div className="text-left p-5">
        <button
          className="px-3 py-2 mb-3 bg-[#1d4ed8] text-white rounded-md "
          onClick={() => setBanner(true)}
        >
          Add Banner
        </button>
        <p className="text-[#dc2626]">No Banners available</p>
        <NewBanner open={banner} onClose={() => setBanner(false)} />
      </div>
    );
  return (
    <div
      className="w-80% text-center p-4 h-[700px] overflow-scroll scrollbar-hide"
      onScroll={handleScroll}
    >
      <div id="success" className="bg-[#86efac] my-2"></div>
      <div className="text-left">
        <button
          className="px-3 py-2 mb-3 bg-[#1d4ed8] text-white rounded-md "
          onClick={() => setBanner(true)}
        >
          Add Banner
        </button>
      </div>
      <NewBanner open={banner} onClose={() => setBanner(false)} />
      <table className="border-separate border border-slate-400 ">
        <thead>
          <tr>
            <th className="border border-slate-300 px-4 ">SI No</th>
            <th className="border border-slate-300  px-4">Food Name</th>
            <th className="border border-slate-300 px-4">Restaurant</th>
            <th className="border border-slate-300 px-4">Image of Banner</th>
            <th className="border border-slate-300 px-4">Offer</th>
            <th className="border border-slate-300 px-4">Address</th>
            <th className="border border-slate-300 px-4">Expiry</th>
            <th className="border border-slate-300 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((banner, index) => {
            return (
              <tr key={index}>
                <td className="border border-slate-300  px-4">{++i}</td>
                <td className="border border-slate-300  px-4">
                  {banner.foodName}
                </td>
                <td className="border border-slate-300  px-4">
                  {banner.resName}
                </td>
                <td className="border border-slate-300  px-4">
                  <img
                    className="w-24 h-24 mx-auto my-2"
                    src={banner.images[0].url}
                  />
                </td>
                <td className="border border-slate-300  px-4">
                  {banner.offer}
                </td>
                <td className="border border-slate-300  px-4">
                  {banner.address}
                </td>
                <td className="border border-slate-300  px-4">
                  {moment(banner.expiresAt).format("MMM Do YY")}
                </td>
                <DeleteButton banner={banner} />
              </tr>
            );
            i++;
          })}
        </tbody>
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

export default BannerContent;
