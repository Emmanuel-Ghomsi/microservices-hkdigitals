// Send data in HTTP protocole to the server
import axios from "axios";

// Data from config files
import { APP_URL_RESUME } from "../../config/config";

// Toastify for popup informations
import { toast } from "react-toastify";

export const getHobbiesByUser = (user_id) => {
  return (dispatch, getState) => {
    const token = getState().auth.token; // get the token from store state

    // Make headers configurations
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    findHobbiesByUserId(user_id, token)
      .then((res) => {
        // Dispatch event
        dispatch({
          type: "GET_HOBBIES",
          hobbies: res.data,
        });
      })
      .catch((err) => {
        toast.error(JSON.stringify(err.response?.data.error), {
          position: toast.POSITION.TOP_RIGHT,
        });

        // Dispatch event to logout user
        dispatch({
          type: "EMPTY_HOBBIES",
        });
      });
  };
};

export const addHobby = (hobby, user_id) => {
  return (dispatch, getState) => {
    const token = getState().auth.token; // get the token from store state

    // Make headers configurations
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(
        `${APP_URL_RESUME}/create-hobby`,
        {
          name: hobby,
          user: user_id,
        },
        config
      )
      .then((res) => {
        toast.success("Hobby added successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        findHobbiesByUserId(user_id, token).then((response) => {
          // Dispatch event
          dispatch({
            type: "GET_HOBBIES",
            hobbies: response.data,
          });
        });
      })
      .catch((err) => {
        toast.error(JSON.stringify(err.response?.data.error), {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
};

export const editHobby = (hobby, user_id) => {
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
        `${APP_URL_RESUME}/edit-hobby/${hobby._id}`,
        {
          name: hobby.name,
          user: user_id,
        },
        config
      )
      .then((res) => {
        toast.success("Hobby updated successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        findHobbiesByUserId(user_id, token).then((response) => {
          // Dispatch event
          dispatch({
            type: "GET_HOBBIES",
            hobbies: response.data,
          });
        });
      })
      .catch((err) => {
        toast.error(JSON.stringify(err.response?.data.error), {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
};

export const deleteHobby = (hobby_id, user_id) => {
  return (dispatch, getState) => {
    const token = getState().auth.token; // get the token from store state

    // Make headers configurations
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${APP_URL_RESUME}/delete-hobby/${hobby_id}`, config)
      .then((res) => {
        toast.success("Hobby deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        findHobbiesByUserId(user_id, token).then((response) => {
          // Dispatch event
          dispatch({
            type: "GET_HOBBIES",
            hobbies: response.data,
          });
        });
      })
      .catch((err) => {
        toast.error(JSON.stringify(err.response?.data.error), {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
};

export const loadHobbies = () => {
  return (dispatch, getState) => {
    const hobbies = getState().hobby.hobbies; // get hobbies from store state

    if (hobbies) {
      // Dispatch event
      dispatch({
        type: "HOBBY_LOADED",
        hobbies,
      });
    } else return null;
  };
};

const findHobbiesByUserId = (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.get(`${APP_URL_RESUME}/show-user-hobby/${userId}`, config);
};
