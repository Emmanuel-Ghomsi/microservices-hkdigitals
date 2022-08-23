// Toastify for popup informations
import { toast } from "react-toastify";

// Initial state
const initialState = {
  experiences: null,
};

const experienceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_EXPERIENCES":
    case "EXPERIENCE_LOADED":
      // return new state
      return {
        ...initialState,
        experiences: action.experiences,
      };
    case "EMPTY_EXPERIENCES":
      // return empty state
      return {
        experiences: null,
      };
    default:
      return state;
  }
};

export default experienceReducer;
