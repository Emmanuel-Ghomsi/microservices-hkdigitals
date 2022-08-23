// Send data in HTTP protocole to the server
import axios from "axios";

// Data from config files
import { APP_URL_RESUME } from "../../config/config";

// Toastify for popup informations
import { toast } from "react-toastify";

export const getExperiencesByUser = (user_id) => {
  return (dispatch, getState) => {
    const token = getState().auth.token; // get the token from store state

    // Make headers configurations
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    findExperiencesByUserId(user_id, token)
      .then((res) => {
        // Dispatch event
        dispatch({
          type: "GET_EXPERIENCES",
          experiences: res.data,
        });
      })
      .catch((err) => {
        toast.error(JSON.stringify(err.response?.data.error), {
          position: toast.POSITION.TOP_RIGHT,
        });

        // Dispatch event to logout user
        dispatch({
          type: "EMPTY_EXPERIENCES",
        });
      });
  };
};

export const addExperience = (experience, user_id) => {
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
        `${APP_URL_RESUME}/create-experience`,
        {
          role: experience.role,
          company: experience.company,
          start_date: experience.start_date,
          address: experience.address,
          end_date: experience.end_date,
          description: experience.description,
          user: user_id,
        },
        config
      )
      .then((res) => {
        toast.success("Experience added successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        findExperiencesByUserId(user_id, token).then((response) => {
          // Dispatch event
          dispatch({
            type: "GET_EXPERIENCES",
            experiences: response.data,
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

export const editExperience = (experience, user_id) => {
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
        `${APP_URL_RESUME}/edit-experience/${experience._id}`,
        {
          role: experience.role,
          company: experience.company,
          start_date: experience.start_date,
          address: experience.address,
          end_date: experience.end_date,
          description: experience.description,
          user: user_id,
        },
        config
      )
      .then((res) => {
        toast.success("Experience updated successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        findExperiencesByUserId(user_id, token).then((response) => {
          // Dispatch event
          dispatch({
            type: "GET_EXPERIENCES",
            experiences: response.data,
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

export const deleteExperience = (experience_id, user_id) => {
  return (dispatch, getState) => {
    const token = getState().auth.token; // get the token from store state

    // Make headers configurations
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${APP_URL_RESUME}/delete-experience/${experience_id}`, config)
      .then((res) => {
        toast.success("Experience deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        findExperiencesByUserId(user_id, token).then((response) => {
          // Dispatch event
          dispatch({
            type: "GET_EXPERIENCES",
            experiences: response.data,
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

export const loadExperiences = () => {
  return (dispatch, getState) => {
    const experiences = getState().experience.experiences; // get experiences from store state

    if (experiences) {
      // Dispatch event
      dispatch({
        type: "EXPERIENCE_LOADED",
        experiences,
      });
    } else return null;
  };
};

const findExperiencesByUserId = (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.get(`${APP_URL_RESUME}/show-user-experience/${userId}`, config);
};
