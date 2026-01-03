import React from 'react'
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import CategorySection from '../components/CategorySection';
import FeaturedSection from '../components/FeaturedSection';
import ServiceSection from '../components/ServiceSection';



function Home() {
  return (
    <>
      <PageTitle title='Home' />
      <Navbar />
      <HeroSection />
      <CategorySection />
      <FeaturedSection />
      <ServiceSection />
      <Footer />
    </>
  )
}

export default Home