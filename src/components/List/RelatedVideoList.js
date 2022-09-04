import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRelatedVideosAsync } from "../../features/relatedVideos/relatedVideosSlice";
import RelatedVideoListItem from "./RelatedVideoListItem";
import Loading from "../UI/Loading";

const RelatedVideoList = ({ currentVideoId, tags }) => {
  const dispatch = useDispatch();
  const { relatedVideos, isLoading, isError, error } = useSelector((state) => state.relatedVideos);
  useEffect(() => {
    dispatch(fetchRelatedVideosAsync({ tags, id: currentVideoId }));
  }, [dispatch, currentVideoId, tags]);

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <Loading />
  } else if (isError) {
    content = <div className="col-span-12">{error}</div>
  } else if (relatedVideos.length === 0) {
    content = <div className="col-span-12">No related videos found.</div>
  } else if (relatedVideos.length > 0) { 
    content = relatedVideos.map(video => {
      return <RelatedVideoListItem key={video.id} video={video} />
    })
  }
  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      {/* single related video */}
      {content}
    </div>
  );
};

export default RelatedVideoList;
