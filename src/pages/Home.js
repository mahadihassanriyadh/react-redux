import React from "react";
import Footer from "../components/Footer/Footer";
import VideoGrid from "../components/Grid/VideoGrid";
import Navbar from "../components/Navbar/Navbar";
import Pagination from "../components/Pagination/Pagination";
import Tags from "../components/Tags/Tags";

const Home = () => {
  return (
    <div>
      <Tags></Tags>
      <VideoGrid></VideoGrid>
      <Pagination></Pagination>
    </div>
  );
};

export default Home;
