import { useGetVideosQuery } from "../../features/api/apiSlice";
import Video from "./Video";

export default function Videos() {
    const { data: videos, isLoading, isError } = useGetVideosQuery();
    return (
        <>
            <Video />
        </>
    );
}
