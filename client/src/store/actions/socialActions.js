// Send data in HTTP protocole to the server
import axios from "axios";

// Data from config files
import { APP_URL_AUTH } from "../../config/config";

// Toastify for popup informations
import { toast } from "react-toastify";

export const getSocialsByUser = (user_id) => {
  return (dispatch, getState) => {
    const token = getState().auth.token; // get the token from store state

    // Make headers configurations
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    findSocialsByUserId(user_id, token)
      .then((res) => {
        // Dispatch event
        dispatch({
          type: "GET_SOCIALS",
          socials: res.data,
        });
      })
      .catch((err) => {
        toast.error(JSON.stringify(err.response?.data.error), {
          position: toast.POSITION.TOP_RIGHT,
        });

        // Dispatch event to logout user
        dispatch({
          type: "EMPTY_SOCIALS",
        });
      });
  };
};

export const addSocial = (social, user_id) => {
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
        `${APP_URL_AUTH}/create-social`,
        {
          name: social.name,
          link: social.link,
          user: user_id,
        },
        config
      )
      .then((res) => {
        toast.success("Social added successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        findSocialsByUserId(user_id, token).then((response) => {
          // Dispatch event
          dispatch({
            type: "GET_SOCIALS",
            socials: response.data,
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

export const editSocial = (social, user_id) => {
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
        `${APP_URL_AUTH}/edit-social/${social._id}`,
        {
          name: social.name,
          link: social.link,
          user: user_id,
        },
        config
      )
      .then((res) => {
        toast.success("Social updated successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        findSocialsByUserId(user_id, token).then((response) => {
          // Dispatch event
          dispatch({
            type: "GET_SOCIALS",
            socials: response.data,
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

export const deleteSocial = (social_id, user_id) => {
  return (dispatch, getState) => {
    const token = getState().auth.token; // get the token from store state

    // Make headers configurations
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${APP_URL_AUTH}/delete-social/${social_id}`, config)
      .then((res) => {
        toast.success("Social deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        findSocialsByUserId(user_id, token).then((response) => {
          // Dispatch event
          dispatch({
            type: "GET_SOCIALS",
            socials: response.data,
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

export const loadSocials = () => {
  return (dispatch, getState) => {
    const socials = getState().social.socials; // get socials from store state

    if (socials) {
      // Dispatch event
      dispatch({
        type: "SOCIAL_LOADED",
        socials,
      });
    } else return null;
  };
};

const findSocialsByUserId = (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.get(`${APP_URL_AUTH}/show-user-social/${userId}`, config);
};
