import React from 'react'
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar'
import Footer from '../../components/Footer/Footer'
import LocationManContent from '../../components/LocationManContent/LocationManContent'
import Sidebar from '../../components/Sidebar/Sidebar'

const LocationManagement = () => {
  return (
    <div>
       <AdminNavbar />
      <div className="flex">
        <Sidebar location={true} />
        <LocationManContent />
      </div>
      <Footer />
    </div>
  )
}

export default LocationManagement
