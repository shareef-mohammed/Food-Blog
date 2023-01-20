import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLoginContent from '../../components/AdminLoginContent/AdminLoginContent'
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar'

const AdminLogin = () => {
  const token = localStorage.getItem('adminToken')
  const navigate = useNavigate()
  useEffect(() => {
    if(token) {
      fetch(`${process.env.REACT_APP_BASEURL}/admin/details`, {
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": `${token}`,
        },
      })
      .then(res => res.json())
      .then(data => {
        if(data.status == 'ok') {
          navigate('/Admin/Dashboard')
        }
      })
    } 
  },[])
  return (
    <div>
        <AdminNavbar />
        <AdminLoginContent />
    </div>
  )
}

export default AdminLogin