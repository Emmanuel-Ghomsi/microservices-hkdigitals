// Send data in HTTP protocole to the server
import axios from "axios";

// Data from config files
import { APP_URL_AUTH } from "../../config/config";

// Toastify for popup informations
import { toast } from "react-toastify";

// Register a new user
export const signUp = (user) => {
  return (dispatch) => {
    axios
      .post(`${APP_URL_AUTH}/signup`, user)
      .then((res) => {
        // Set token in the local storage
        localStorage.setItem("token", res.data.token);

        // Dispatch event
        dispatch({
          type: "REGISTER",
          token: res.data.token,
        });
      })
      .catch((err) => {
        toast.error(JSON.stringify(err.response?.data.error), {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
};

// Log in the user
export const signIn = (creds) => {
  return (dispatch) => {
    axios
      .post(`${APP_URL_AUTH}/signin`, creds)
      .then((res) => {
        // Set token in the local storage
        localStorage.setItem("token", res.data.token);

        // Dispatch event
        dispatch({
          type: "LOGIN",
          token: res.data.token,
        });
      })
      .catch((err) => {
        toast.error(JSON.stringify(err.response?.data.error), {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
};

// Pour résoudre le problème du state qui se vide pour l'auth lorsque l'on refresh la page
export const loadAuth = () => {
  return (dispatch, getState) => {
    // Get the token of the user in the store state
    const token = getState().auth.token;

    if (token) {
      // Dispatch event
      dispatch({
        type: "AUTH_LOADED",
        token,
      });
    } else return null;
  };
};

// Log out the user
export const logOut = () => {
  return (dispatch) => {
    // Dispatch event
    dispatch({
      type: "LOGOUT",
    });
  };
};
