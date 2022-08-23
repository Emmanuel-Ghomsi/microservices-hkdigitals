import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import experienceReducer from "./reducers/experienceReducer";
import userReducer from "./reducers/userReducer";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    experience: experienceReducer,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});
