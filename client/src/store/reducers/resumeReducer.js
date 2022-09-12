// Toastify for popup informations
import { toast } from "react-toastify";

// Initial state
const initialState = {
  resume: null,
};

const resumeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_RESUME":
    case "RESUME_LOADED":
      // return new state
      return {
        ...initialState,
        resume: action.resume,
      };
    case "EMPTY_RESUME":
      // return empty state
      return {
        resume: null,
      };
    default:
      return state;
  }
};

export default resumeReducer;
