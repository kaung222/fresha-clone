import { configureStore } from "@reduxjs/toolkit";
import emailSlice from "./slices/email.slice";

export const store = configureStore({
  reducer: {
    email: emailSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
