// Toastify for popup informations
import { toast } from "react-toastify";

// Initial state
const initialState = {
  image: null,
};

const avatarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_IMAGE":
    case "IMAGE_LOADED":
      // return new state
      return {
        ...initialState,
        image: action.image,
      };
    case "EMPTY_IMAGE":
      // return empty state
      return {
        image: null,
      };
    default:
      return state;
  }
};

export default avatarReducer;
