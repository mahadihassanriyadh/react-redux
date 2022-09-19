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
            query: (data) => ({
                url: "conversations",
                method: "POST",
                body: data,
            }),
            // if we want to do somwthing after the request is done
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const conversation = await queryFulfilled;
                if (conversation?.id) {
                    // silent entry to message table
                    dispatch(messagesApi.endpoints.addMessage.initiate({
                        conversationId: conversation.id,
                        
                    }));
                }
            },
        }),
        editConversation: builder.mutation({
            query: ({ id, data }) => ({
                url: `conversations/${id}`,
                method: "PATCH",
                body: data,
            }),
        }),
    }),
});

export const {
    useGetConversationsQuery,
    useGetConversationQuery,
    useAddConversationMutation,
    useEditConversationMutation,
} = conversationsApi;
