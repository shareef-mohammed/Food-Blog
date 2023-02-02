import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ContentLoader from '../Loader/ContentLoader';
import DeleteButton from './DeleteButton';
import NewLocation from './NewLocation';

const LocationManContent = () => {

    const [skip, setSkip] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([])
  const [location, setLocation] = useState(false)
  const navigate = useNavigate()

  let i = 0;
  useEffect(() => {
    fetchPost();
  }, [skip]);
  const token = localStorage.getItem('adminToken')
  const read = async (skip) => {
    const res = await fetch(
      `${process.env.REACT_APP_BASEURL}/admin/locations?skip=${skip}`,
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

      
        setLocations([...locations, ...data]);
     
    } catch (error) {
      navigate('/PageNotFound')
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
  
  if (locations.length === 0)
    return (
      <div className="text-left p-5">
        <button
          className="px-3 py-2 mb-3 bg-[#1d4ed8] text-white rounded-md "
          onClick={() => setLocation(true)}
        >
          Add Location
        </button>
        <p className="text-[#dc2626]">No Locations available</p>
        <NewLocation open={location} onClose={() => setLocation(false)} />
      </div>
    );
  return (
    <div>
       <div
      className="w-80% text-center p-4 h-[700px] overflow-scroll scrollbar-hide"
      onScroll={handleScroll}
    >
      <div id="success" className="bg-[#86efac] my-2"></div>
      <div className="text-left">
        <button
          className="px-3 py-2 mb-3 bg-[#1d4ed8] text-white rounded-md "
          onClick={() => setLocation(true)}
        >
          Add Location
        </button>
      </div>

      <NewLocation open={location} onClose={() => setLocation(false)} />
      <table className="border-separate border border-slate-400 ">
        <thead>
          <tr>
            <th className="border border-slate-300 px-4 ">SI No</th>
            <th className="border border-slate-300  px-4">Location</th>
            <th className="border border-slate-300 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location, index) => {
            return (
              <tr key={index}>
                <td className="border border-slate-300  px-4">{++i}</td>
                <td className="border border-slate-300  px-4">
                  {location.name}
                </td>
                <DeleteButton location={location} />
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
    </div>
  )
}

export default LocationManContent
