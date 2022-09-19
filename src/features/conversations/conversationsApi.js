import { data } from "autoprefixer";
import { apiSlice } from "../api/apiSlice";
import { messagesApi } from "../messages/messagesApi";

export const conversationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getConversations: builder.query({
            query: (email) =>
                `conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`,
        }),
        getConversation: builder.query({
            query: ({ userEmail, participantEmail }) =>
                `conversations?participants_like=${userEmail}-${participantEmail}&participants_like=${participantEmail}-${userEmail}`,
        }),
        addConversation: builder.mutation({
            query: ({ sender, data }) => ({
                url: "conversations",
                method: "POST",
                body: data,
            }),
            // if we want to do somwthing after the request is done
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                // optimistic cache update start
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData(
                        "getConversations",
                        arg.sender,
                        (draft) => {
                            const finalData = {
                                ...arg.data,
                                id: data.length + 1,
                            }
                            draft.unshift(finalData);
                        }
                    )
                );
                // optimistic cache update end

                try {
                    const conversation = await queryFulfilled;
                    if (conversation?.data?.id) {
                        // silent entry to message table
                        const users = arg.data.users;
                        const senderUser = users.find(
                            (user) => user.email === arg.sender
                        );
                        const receiverUser = users.find(
                            (user) => user.email !== arg.sender
                        );
                        const res = dispatch(
                            messagesApi.endpoints.addMessage.initiate({
                                conversationId: conversation?.data?.id,
                                sender: senderUser,
                                receiver: receiverUser,
                                message: arg.data.message,
                                timestamp: arg.data.timestamp,
                            })
                        ).unwrap();
                        console.log(res);
                    }
                } catch (error) {
                    // if the request fails, we will rollback the cache update
                    patchResult.undo();
                }
            },
        }),
        editConversation: builder.mutation({
            query: ({ sender, id, data }) => ({
                url: `conversations/${id}`,
                method: "PATCH",
                body: data,
            }),
            // if we want to do somwthing after the request is done
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                // optimistic cache update start
                const patchResult = dispatch(
                    // in updateQueryData we need to pass the query name, the arg, and a function which will be called with the current state of the query. query name is the name of the query which we want to update, arg is the argument which we passed to the query, and the function will be called with the current state of the query
                    apiSlice.util.updateQueryData(
                        "getConversations",
                        arg.sender,
                        (draft) => {
                            // draft is the current state of the query, here draft is like immer's draft. That means here we will get the cache corresponsind to our query and we can modify it
                            // we are getting the cached data, and in cached data everything will be in form of string, so we need to convert the conversation id to a number to compare it with arg.id
                            const draftConversation = draft.find(
                                (conversation) =>
                                    Number(conversation.id) === arg.id
                            );
                            draftConversation.message = arg.data.message;
                            draftConversation.timestamp = arg.data.timestamp;
                            draft.sort((a, b) => b.timestamp - a.timestamp);
                        }
                    )
                );
                // optimistic cache update end

                try {
                    const conversation = await queryFulfilled;
                    if (conversation?.data?.id) {
                        // silent entry to message table
                        const users = arg.data.users;
                        const senderUser = users.find(
                            (user) => user.email === arg.sender
                        );
                        const receiverUser = users.find(
                            (user) => user.email !== arg.sender
                        );
                        const res = await dispatch(
                            messagesApi.endpoints.addMessage.initiate({
                                conversationId: conversation?.data?.id,
                                sender: senderUser,
                                receiver: receiverUser,
                                message: arg.data.message,
                                timestamp: arg.data.timestamp,
                            })
                        );
                        // update message cache pessimistically start
                        const { conversationId } = res.data || {};
                        dispatch(
                            apiSlice.util.updateQueryData(
                                "getMessages",
                                // In cache everything is in string format, so we need to convert the conversationId to string.
                                conversationId.toString(),
                                (draft) => {
                                    draft.push(res.data);
                                }
                            )
                        );
                        // update message cache pessimistically ends
                    }
                } catch (error) {
                    // if the request fails, we need to revert the optimistic cache update
                    patchResult.undo();
                }
            },
        }),
    }),
});

export const {
    useGetConversationsQuery,
    useGetConversationQuery,
    useAddConversationMutation,
    useEditConversationMutation,
} = conversationsApi;
