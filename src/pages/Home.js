import React from 'react';
import Footer from '../components/Footer/Footer';
import VideoGrid from '../components/Grid/VideoGrid';
import Navbar from '../components/Navbar/Navbar';
import Pagination from '../components/Pagination/Pagination';
import Tags from '../components/Tags/Tags';

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Tags></Tags>
      <VideoGrid></VideoGrid>
      <Pagination></Pagination>
      <Footer></Footer>
    </div>
  );
};

export default Home;