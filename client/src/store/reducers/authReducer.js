// To decode the jwt token
import jwtDecode from "jwt-decode";

// Toastify for popup informations
import { toast } from "react-toastify";

// Initial state
const initialState = {
  token: localStorage.getItem("token"),
  _id: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_LOADED":
    case "LOGIN":
    case "REGISTER":
      // Decode the token and save user informations
      const user = jwtDecode(action.token);

      // return new state
      return {
        ...initialState,
        token: action.token,
        _id: user._id,
      };
    case "LOGOUT":
      // Remove token in local storage
      localStorage.removeItem("token");

      toast.success("Au revoir!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      // return empty state
      return {
        token: null,
        _id: null,
      };
    default:
      return state;
  }
};

export default authReducer;
