// Toastify for popup informations
import { toast } from "react-toastify";

// Initial state
const initialState = {
  languages: null,
};

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LANGUAGES":
    case "LANGUAGE_LOADED":
      // return new state
      return {
        ...initialState,
        languages: action.languages,
      };
    case "EMPTY_LANGUAGES":
      // return empty state
      return {
        languages: null,
      };
    default:
      return state;
  }
};

export default languageReducer;
