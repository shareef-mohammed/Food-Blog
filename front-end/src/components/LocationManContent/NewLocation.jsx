import React, { useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Register_style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: "#FFF",
    padding: "50px",
    zIndex: 1000,
  };
  
  const overlay_style = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgb( 0, 0, 0, .7 )",
    zIndex: 1000,
  };
  

const NewLocation = ({open, onClose}) => {
    const [name, setName] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const token = localStorage.getItem('adminToken')
    const navigate = useNavigate()

    const addLocation = () => {
        fetch(`${process.env.REACT_APP_BASEURL}/admin/addLocation`, {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "X-Custom-Header": `${token}`,
              },
              body: JSON.stringify({
                name
              }),
        })
        .then(res => res.json())
        .then(data => {
          if(data.err) {
            
            return navigate('/PageNotFound')
          }
           if(data.status === 'existErr'){
            return setErrMsg('Location already exist.')
           } else {
            onClose();
            toast.success("Location added successfully", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
           }
        })
        .catch(err => {
            navigate('/PageNotFound')
        })
    }
    if(!open) return null
  return (
    <>
      <div style={overlay_style} onClick={onClose} />
      <div style={Register_style} className="grid content-center rounded-md">
        <AiOutlineClose
          className="ml-auto w-5 h-5 cursor-pointer"
          onClick={onClose}
        />
        <h3 className="text-center py-4 text-[24px] font-bold">New Banner</h3>
        <div className="text-left">
          <form>
            <div id="errr" className="text-center z-10 text-[#fca5a5]">
              {errMsg}
            </div>
            <label className="py-1">
              New Location<br />
              <input
                className="w-[100%] border-2"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <br />

            
          </form>
        </div>

        <button
          className="bg-[#1d4ed8] px-3 py-2 mt-3 text-white"
          onClick={addLocation}
        >
          Add
        </button>
      </div>
    </>
  )
}

export default NewLocation
