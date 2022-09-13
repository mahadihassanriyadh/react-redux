import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "register",
                method: "POST",
                body: data,
            }),

            // We need to update do things after registration, update the local storage (usually we would use cache to store our authentication data but unfortunately json server doesn't allow that) and update the redux store. We can do it in the UI manually but isn't it better to do it in the api layer? We can do it by using an async function onQueryStarted. Ths function is called by default by rtk query when the query is started. So we can listen to the query and do whatever we want. In this case we will update the local storage and the redux store after we get a positive response.

            // so by default we get some properties from the parameters of our function. First parameter is the arguments we get in our query. Here we get "data" in our query parameter or argument. Secondly, we get an object where we get something called queryFullfilled and disptch function.
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;

                    localStorage.setItem(
                        "auth",
                        JSON.stringify({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );

                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );
                } catch (error) {
                    // do nothing, we will handle the error in the UI
                }
            },
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "login",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;

                    localStorage.setItem(
                        "auth",
                        JSON.stringify({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );

                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );
                } catch (error) {
                    // do nothing, we will handle the error in the UI
                }
            },
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
