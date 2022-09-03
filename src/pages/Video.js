import React from "react";
import Player from "../components/description/Player";
import VideoDescription from "../components/description/VideoDescription";
import Footer from "../components/Footer/Footer";
import RelatedVideoList from "../components/List/RelatedVideoList";
import Navbar from "../components/Navbar/Navbar";

const Video = () => {
  return (
    <div>
      <Navbar />
      <section className="pt-6 pb-20">
            <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
                <div className="grid grid-cols-3 gap-2 lg:gap-8">
                    <div className="col-span-full w-full space-y-8 lg:col-span-2">
                    
                        <Player />
                        <VideoDescription />
                    </div>

                    <RelatedVideoList />

                </div>
            </div>
        </section>
      <Footer />
    </div>
  );
};

export default Video;
