import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import experienceReducer from "./reducers/experienceReducer";
import formationReducer from "./reducers/formationReducer";
import userReducer from "./reducers/userReducer";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    experience: experienceReducer,
    formation: formationReducer,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});
