import { configureStore } from "@reduxjs/toolkit";
import { PersonSlice } from "./person-slice";

export const store = configureStore({
  reducer: {
    person: PersonSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
