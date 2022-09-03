import React from "react";
import VideoGrid from "../components/Grid/VideoGrid";
import Tags from "../components/Tags/Tags";
import Pagination from "../components/UI/Pagination";

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
