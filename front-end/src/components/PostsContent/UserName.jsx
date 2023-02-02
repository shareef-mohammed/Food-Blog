import React, { useState } from 'react'
import UserDetails from '../Follow/UserDetails'

const UserName = ({post}) => {
    const [details, setDetails] = useState(false)
  return (
    <>
    <h6 className="pt-1 pl-2 pb-3 text-lg font-semibold cursor-pointer" 
        onClick={() => setDetails(true)} 
    >
      {post.details[0].userName}
    </h6>
    <UserDetails open={details} onClose={() => setDetails(false)} user={post} /></>
  )
}

export default UserName