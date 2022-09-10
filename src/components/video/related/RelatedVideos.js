import { useGetRelatedVideosQuery } from "../../../features/api/apiSlice";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";
import RelatedVideo from "./RelatedVideo";
import Error from "../../ui/Error";

export default function RelatedVideos({ id, title }) {
    const {
        data: videos,
        isLoading,
        isError,
        error,
    } = useGetRelatedVideosQuery({ id, title });

    // decide what to render
    let content = null;
    if (isLoading) {
        content = <RelatedVideoLoader />;
    } else if (isError) {
        content = <Error error={error} />;
    } else if (videos?.length === 0) {
        content = <Error error="No related videos found" />;
    } else {
        content = videos.map((video) => {
            return <RelatedVideo key={video.id} video={video} />;
        });
    }

    return (
        <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
            {content}
        </div>
    );
}
