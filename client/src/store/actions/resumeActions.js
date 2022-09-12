// Send data in HTTP protocole to the server
import axios from "axios";

// Data from config files
import { APP_URL_RESUME } from "../../config/config";

// Toastify for popup informations
import { toast } from "react-toastify";

export const getResumeByUser = (user_id) => {
  return (dispatch, getState) => {
    const token = getState().auth.token; // get the token from store state

    // Make headers configurations
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    findResumeByUserId(user_id, token)
      .then((res) => {
        // Dispatch event
        dispatch({
          type: "GET_RESUME",
          resume: res.data,
        });
      })
      .catch((err) => {
        toast.error(JSON.stringify(err.response?.data.error), {
          position: toast.POSITION.TOP_RIGHT,
        });

        // Dispatch event to logout user
        dispatch({
          type: "EMPTY_RESUME",
        });
      });
  };
};

export const addResume = (data, user_id) => {
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
        `${APP_URL_RESUME}/create-resume`,
        {
          formations: data.formations,
          experiences: data.experiences,
          skills: data.skills,
          hobbies: data.hobbies,
          languages: data.languages,
          summary: data.summary,
          user: user_id,
        },
        config
      )
      .then((res) => {
        toast.success("Resume added successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        findResumeByUserId(user_id, token).then((response) => {
          // Dispatch event
          dispatch({
            type: "GET_RESUME",
            resume: response.data,
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

export const editSkill = (data, user_id) => {
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
        `${APP_URL_RESUME}/edit-resume/${data.resume._id}`,
        {
          formations: data.formations,
          experiences: data.experiences,
          skills: data.skills,
          hobbies: data.hobbies,
          languages: data.languages,
          summary: data.resume.summary,
          user: user_id,
        },
        config
      )
      .then((res) => {
        toast.success("Resume updated successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        findResumeByUserId(user_id, token).then((response) => {
          // Dispatch event
          dispatch({
            type: "GET_RESUME",
            resume: response.data,
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

export const deleteSkill = (resume_id, user_id) => {
  return (dispatch, getState) => {
    const token = getState().auth.token; // get the token from store state

    // Make headers configurations
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${APP_URL_RESUME}/delete-resume/${resume_id}`, config)
      .then((res) => {
        toast.success("Resume deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        findResumeByUserId(user_id, token).then((response) => {
          // Dispatch event
          dispatch({
            type: "GET_RESUME",
            resume: response.data,
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

export const loadResume = () => {
  return (dispatch, getState) => {
    const resume = getState().resume.resume; // get skills from store state

    if (resume) {
      // Dispatch event
      dispatch({
        type: "RESUME_LOADED",
        resume,
      });
    } else return null;
  };
};

const findResumeByUserId = (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.get(`${APP_URL_RESUME}/show-user-resume/${userId}`, config);
};
