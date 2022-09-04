import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideosAsync } from "../../features/videos/videosSlice";
import Loading from "../UI/Loading";
import VideoGridItem from "./VideoGridItem";

const VideoGrid = () => {
  const dispatch = useDispatch();
  const { videos, isLoading, isError, error } = useSelector(state => state.videos);
  const { selectedTags, search } = useSelector(state => state.filter);

  useEffect(() => {
    dispatch(fetchVideosAsync({ selectedTags, search }));
  }, [dispatch, selectedTags, search]);

  // decide what to render
  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (isError) {
    content = <div className="col-span-12">{error}</div>;
  } else if (videos.length === 0) {
    content = <div className="col-span-12">No videos found</div>;
  } else if (videos?.length > 0) { 
    content = videos.map(video => <VideoGridItem key={video.id} video={video} />);
  }

  return (
    <section className="pt-12">
      <section className="pt-12">
        <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]">
          {/* single video */}
          {content}
          {/* error section */}
          {/* <div className="col-span-12">some error happened</div> */}
        </div>
      </section>
    </section>
  );
};

export default VideoGrid;
