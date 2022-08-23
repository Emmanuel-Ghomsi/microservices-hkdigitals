// Toastify for popup informations
import { toast } from "react-toastify";

// Initial state
const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOADED":
    case "GET_USER":
      // return new state
      return {
        ...initialState,
        user: action.user,
      };
    case "LOGOUT":
      // Remove token in local storage
      localStorage.removeItem("token");
      // return empty state
      return {
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
