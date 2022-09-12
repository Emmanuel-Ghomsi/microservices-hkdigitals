// Toastify for popup informations
import { toast } from "react-toastify";

// Initial state
const initialState = {
  hobbies: null,
};

const hobbyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_HOBBIES":
    case "HOBBY_LOADED":
      // return new state
      return {
        ...initialState,
        hobbies: action.hobbies,
      };
    case "EMPTY_HOBBIES":
      // return empty state
      return {
        hobbies: null,
      };
    default:
      return state;
  }
};

export default hobbyReducer;
