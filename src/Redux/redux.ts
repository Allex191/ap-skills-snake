import { configureStore } from "@reduxjs/toolkit";
import snakeReducer from "Redux/slices/snakeSlice";
import viewReducer from "Redux/slices/viewSlice";
import { listenerMiddleware } from "./middleware/listenerMiddleware";
import { startListeners } from "./middleware/listeners";

export const store = configureStore({
  reducer: { snakeReducer, viewReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

startListeners();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
