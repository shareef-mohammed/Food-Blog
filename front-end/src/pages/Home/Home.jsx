import React from 'react'
import Carousel from '../../components/Carousel/Carousel'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
// import RowComments from '../RowComments/RowComments'
import PostsContent from '../../components/PostsContent/PostsContent'
import RowPost from '../../components/RowPost/RowPost'


const Home = () => {
  return (
    <div>
        <Navbar home={true} />
        <Carousel />
        <RowPost home={true} />
        {/* <RowComments /> */}
        <PostsContent home={true} />
        <Footer />
    </div> 
  )
}

export default Home