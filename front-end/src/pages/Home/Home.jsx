import React from 'react'
import Carousel from '../../components/Carousel/Carousel'
import Footer from '../../components/Footer/Footer'
import LocateButton from '../../components/Location/LocateButton'
import Navbar from '../../components/Navbar/Navbar'

import PostsContent from '../../components/PostsContent/PostsContent'
import RowPost from '../../components/RowPost/RowPost'


const Home = () => {
  return (
    <div>
        <Navbar home={true} />
        <Carousel />
        <LocateButton />
        <RowPost home={true} />        
        <PostsContent home={true} />
        <Footer />
    </div> 
  )
}

export default Home