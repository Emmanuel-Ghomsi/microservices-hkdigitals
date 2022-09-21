import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import experienceReducer from "./reducers/experienceReducer";
import formationReducer from "./reducers/formationReducer";
import hobbyReducer from "./reducers/hobbyReducer";
import languageReducer from "./reducers/languageReducer";
import resumeReducer from "./reducers/resumeReducer";
import skillReducer from "./reducers/skillReducer";
import socialReducer from "./reducers/socialReducer";
import userReducer from "./reducers/userReducer";
import avatarReducer from "./reducers/avatarReducer";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    experience: experienceReducer,
    formation: formationReducer,
    social: socialReducer,
    skill: skillReducer,
    hobby: hobbyReducer,
    language: languageReducer,
    resume: resumeReducer,
    image: avatarReducer,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});
