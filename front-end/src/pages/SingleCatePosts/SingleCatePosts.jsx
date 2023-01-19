import React from 'react'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import PostsContent from '../../components/PostsContent/PostsContent'

const SingleCatePosts = () => {
  return (
    <div>
      <Navbar />
      <PostsContent category={true} />
      <Footer />
    </div>
  )
}

export default SingleCatePosts
