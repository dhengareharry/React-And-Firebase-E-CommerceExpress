import React, { useContext } from 'react'
import Layout from '../../Components/Layout/Layout'
import HeroSection from '../../Components/heroSection/HeroSection'
import Category from '../../Components/category/Category'
import HomePageProductCard from '../../Components/homePageProductCard/HomePageProductCard'
import Track from '../../Components/track/Track'
import Testimonial from '../../Components/testimonial/Testimonial'
const Home = () => {
  return (
   <Layout>
    <HeroSection/>
    <Category/>
    <HomePageProductCard/>
    <Track/>
    <Testimonial/>
   </Layout>
  )
}

export default Home