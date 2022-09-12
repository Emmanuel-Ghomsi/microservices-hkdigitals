// Toastify for popup informations
import { toast } from "react-toastify";

// Initial state
const initialState = {
  socials: null,
};

const socialReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SOCIALS":
    case "SOCIAL_LOADED":
      // return new state
      return {
        ...initialState,
        socials: action.socials,
      };
    case "EMPTY_SOCIALS":
      // return empty state
      return {
        socials: null,
      };
    default:
      return state;
  }
};

export default socialReducer;
