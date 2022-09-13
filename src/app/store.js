import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import authSliceReducer from '../features/auth/authSlice';
import messagesSliceReducer from '../features/messages/messagesSlice';
import conversationsSliceReducer from '../features/conversations/conversationsSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    messages: messagesSliceReducer,
    conversations: conversationsSliceReducer,
  },
  // এখানে usually redux devTools আমাদের appplication এ always ই on থাকছে। কিন্তু তা একটা problem, কারণ এতে করে যেকেও redux devtool use করে আমাদের store এর data গুলো দেখতে পাবে। যা production build এর জন্য উপযোগী নয়। তাই আমরা চাইলে এই devtool কে production build এ disable করতে পারি। এটা করার জন্য আমরা এই লাইনটা আমাদের configureStore এর ভিতরে যোগ করব। এখানে process.env.NODE_ENV এর মান যদি development হয় তাহলে devtool কে enable করবে। কিন্তু যদি production হয় তাহলে devtool কে disable করবে। process.env.NODE_ENV হচ্ছে REACT APP এর environment check করার একটা way। 
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
