// Send data in HTTP protocole to the server
import axios from "axios";

// Data from config files
import { APP_URL_RESUME } from "../../config/config";

// Toastify for popup informations
import { toast } from "react-toastify";

export const getLanguagesByUser = (user_id) => {
  return (dispatch, getState) => {
    const token = getState().auth.token; // get the token from store state

    // Make headers configurations
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    findLanguagesByUserId(user_id, token)
      .then((res) => {
        // Dispatch event
        dispatch({
          type: "GET_LANGUAGES",
          languages: res.data,
        });
      })
      .catch((err) => {
        toast.error(JSON.stringify(err.response?.data.error), {
          position: toast.POSITION.TOP_RIGHT,
        });

        // Dispatch event to logout user
        dispatch({
          type: "EMPTY_LANGUAGES",
        });
      });
  };
};

export const addLanguage= (language, user_id) => {
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
        `${APP_URL_RESUME}/create-language`,
        {
          name: language.name,
          level: language.level,
          user: user_id,
        },
        config
      )
      .then((res) => {
        toast.success("Language added successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        findLanguagesByUserId(user_id, token).then((response) => {
          // Dispatch event
          dispatch({
            type: "GET_LANGUAGES",
            languages: response.data,
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

export const editLanguage = (language, user_id) => {
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
        `${APP_URL_RESUME}/edit-language/${language._id}`,
        {
          name: language.name,
          level: language.level,
          user: user_id,
        },
        config
      )
      .then((res) => {
        toast.success("Language updated successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        findLanguagesByUserId(user_id, token).then((response) => {
          // Dispatch event
          dispatch({
            type: "GET_LANGUAGES",
            languages: response.data,
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

export const deleteLanguage = (language_id, user_id) => {
  return (dispatch, getState) => {
    const token = getState().auth.token; // get the token from store state

    // Make headers configurations
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${APP_URL_RESUME}/delete-language/${language_id}`, config)
      .then((res) => {
        toast.success("Language deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        findLanguagesByUserId(user_id, token).then((response) => {
          // Dispatch event
          dispatch({
            type: "GET_LANGUAGES",
            languages: response.data,
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

export const loadLanguages = () => {
  return (dispatch, getState) => {
    const languages = getState().language.languages; // get languages from store state

    if (languages) {
      // Dispatch event
      dispatch({
        type: "LANGUAGE_LOADED",
        languages,
      });
    } else return null;
  };
};

const findLanguagesByUserId = (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.get(`${APP_URL_RESUME}/show-user-language/${userId}`, config);
};
