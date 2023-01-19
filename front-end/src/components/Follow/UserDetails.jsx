import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { ImLocation2 } from "react-icons/im";
import { BiUserCircle } from "react-icons/bi";

const Register_style = {
    position: "fixed",
    top: "55%",
    left: "50%",
    width: "20rem",
    transform: "translate(-50%,-50%)",
    backgroundColor: "#FFF",
    padding: "2rem",
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
const UserDetails = ({open, onClose, user}) => {
    
    if (!open) return null;
    return (
      <>
        <div style={overlay_style} onClick={onClose} />
        <div
          style={Register_style}
          className=" pt-3 rounded-lg"
        >
             <AiOutlineClose
          className="ml-auto w-5 h-5 cursor-pointer"
          onClick={onClose}
        />
            <img
                className="h-28 w-28 mx-auto rounded-full my-3"
                src={
                    user.details[0].profilePic
                    ? user.details[0].profilePic
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
            />
            <div className='mx-3'>
              <div className='flex my-2'>
                <BiUserCircle className='w-5 h-5 mt-1 mr-1 ' />
                <p className='text-lg font-bold'>{user.details[0].userName}</p>
              </div>
              <div className='flex my-2'>
                <p className='text-md font-semibold uppercase'>{user.details[0].fullName}</p>
              </div>
              <div className='flex my-2'>
                <ImLocation2 className='w-4 h-4 mr-1' />
                {user.details[0].location && <p className='text-sm font-semibold uppercase pb-1'>{user.details[0].location}</p>}
              </div>
              {user.details[0].bio && <p className='break-words'>{user.details[0].bio}</p>}
            </div>
        </div>
    </>
  )
}

export default UserDetails
