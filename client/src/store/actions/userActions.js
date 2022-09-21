// Send data in HTTP protocole to the server
import axios from "axios";

// Data from config files
import { APP_URL_AUTH } from "../../config/config";

// Toastify for popup informations
import { toast } from "react-toastify";

// Get user
export const getUser = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token; // get the token from store state
    const _id = getState().auth._id; // get the id from store state

    // Make headers configurations
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (_id != null)
      axios
        .get(`${APP_URL_AUTH}/profile/${_id}`, config)
        .then((res) => {
          // Dispatch event
          dispatch({
            type: "GET_USER",
            user: res.data,
          });
        })
        .catch((err) => {
          toast.error(JSON.stringify(err.response?.data.error), {
            position: toast.POSITION.TOP_RIGHT,
          });

          // Dispatch event to logout user
          dispatch({
            type: "LOGOUT",
          });
        });
  };
};

export const editUser = (user) => {
  return (dispatch, getState) => {
    const token = getState().auth.token; // get the token from store state

    // Make headers configurations
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(
        `${APP_URL_AUTH}/edit-user/${user._id}`,
        {
          name: user.name,
          job: user.job,
          address: user.address,
          phone: user.phone,
        },
        config
      )
      .then((res) => {
        // Dispatch event
        dispatch({
          type: "EDIT_USER",
          user: res.data,
        });
      })
      .catch((err) => {
        toast.error(JSON.stringify(err.response?.data.error), {
          position: toast.POSITION.TOP_RIGHT,
        });

        // Dispatch event to logout user
        dispatch({
          type: "LOGOUT",
        });
      });
  };
};

// Pour résoudre le problème du state qui se vide pour le user lorsque l'on refresh la page
export const loadUser = () => {
  return (dispatch, getState) => {
    const user = getState().user.user; // get user from store state

    if (user) {
      // Dispatch event
      dispatch({
        type: "USER_LOADED",
        user,
      });
    } else return null;
  };
};
