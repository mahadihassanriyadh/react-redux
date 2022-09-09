import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// createApi() accepts an object with a reducerPath and baseQuery.
// reducerPath is the key in the store where the generated reducer will be placed. It is similar to the name property in createSlice(). By default the key is set to be "api". If we want to "api" as the key, we can omit the reducerPath property. But it is recommended to set the reducerPath property to avoid any potential naming conflicts.
// baseQuery is used to handle things similar to base url.
// the beauty of rtk query is we do not need to write any fetch logic as it is handled by rtk query.
export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:9000",
    }),
    // endpoints is an object where we can define all the endpoints we want to use in our application. such as get, post, put, delete, etc. Which is similar to the builder property in createSlice().
    endpoints: (builder) => ({})
});
