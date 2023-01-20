import { configureStore } from "@reduxjs/toolkit";
import { startListeners } from "Redux/middleware/listeners";
import snakeReducer from "Redux/slices/snakeSlice";
import viewReducer from "Redux/slices/viewSlice";
import scoreReducer from "Redux/slices/scoreSlice";
import { listenerMiddleware } from "./middleware/listenerMiddleware";

export const store = configureStore({
  reducer: { snakeReducer, viewReducer, scoreReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
startListeners();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
