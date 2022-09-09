import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// createApi() accepts an object with a reducerPath and baseQuery.
// reducerPath is the key in the store where the generated reducer will be placed. It is similar to the name property in createSlice(). By default the key is set to be "api". If we want to "api" as the key, we can omit the reducerPath property. But it is recommended to set the reducerPath property to avoid any potential naming conflicts.
// baseQuery is used to handle things similar to base url.
// the beauty of rtk query is we do not need to write any fetch logic as it is handled by rtk query.
export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:9000/",
    }),
    // endpoints is an object where we can define all the endpoints we want to use in our application. such as get, post, put, delete, etc. Which is similar to the builder property in createSlice().
    //  
    endpoints: (builder) => ({
        // getvideos আমাদের object এর প্রথম property। getVideos হচ্ছে ultimately আমাদের API এর নাম। যেহেতু এটা rtk query সে সবকিছু query এর মত চিন্তা করে। আমরা server থেকে যে data আনি সেটাই query। আরকটা জিনিস এখানে আছে, তা হলো mutation। mutation মানেই পরিবর্তন করা। Server থেকে data আনাই query, আর server এ post, put, pach, delete, যা server এর data পরিবর্তন করে দিবে তা ই mutation.

        // এখানে getVideos একটা query, এবং আমরা যে এই query করতে চাচ্ছি এখানে, তার jonyjony
        getVideos: builder.query({
            // we could have return a direct string too. but we are using a function here to make it dynamic. this function will return a string. We can recieved one prameter as well, if we need to pass multiple parameters then we can use an object.
            query: () => `videos`,
        }),
    })
});

// so how do we get the queries, redux query will return us hooks. so we can use the hooks in our components. Here in our endpoints we declared a property with the name getVideos, that is why apiSlice returned us with a hook with the same name by adding a suffix and prefix. use + GetVideos + Query.
export const { useGetVideosQuery } = apiSlice;