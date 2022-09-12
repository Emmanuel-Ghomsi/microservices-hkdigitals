// Send data in HTTP protocole to the server
import axios from "axios";

// Data from config files
import { APP_URL_RESUME } from "../../config/config";

// Toastify for popup informations
import { toast } from "react-toastify";

export const getSkillsByUser = (user_id) => {
  return (dispatch, getState) => {
    const token = getState().auth.token; // get the token from store state

    // Make headers configurations
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    findSkillsByUserId(user_id, token)
      .then((res) => {
        // Dispatch event
        dispatch({
          type: "GET_SKILLS",
          skills: res.data,
        });
      })
      .catch((err) => {
        toast.error(JSON.stringify(err.response?.data.error), {
          position: toast.POSITION.TOP_RIGHT,
        });

        // Dispatch event to logout user
        dispatch({
          type: "EMPTY_SKILLS",
        });
      });
  };
};

export const addSkill = (skill, user_id) => {
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
        `${APP_URL_RESUME}/create-skill`,
        {
          name: skill.name,
          level: skill.level,
          user: user_id,
        },
        config
      )
      .then((res) => {
        toast.success("Skill added successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        findSkillsByUserId(user_id, token).then((response) => {
          // Dispatch event
          dispatch({
            type: "GET_SKILLS",
            skills: response.data,
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

export const editSkill = (skill, user_id) => {
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
        `${APP_URL_RESUME}/edit-skill/${skill._id}`,
        {
          name: skill.name,
          level: skill.level,
          user: user_id,
        },
        config
      )
      .then((res) => {
        toast.success("Skill updated successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        findSkillsByUserId(user_id, token).then((response) => {
          // Dispatch event
          dispatch({
            type: "GET_SKILLS",
            skills: response.data,
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

export const deleteSkill = (skill_id, user_id) => {
  return (dispatch, getState) => {
    const token = getState().auth.token; // get the token from store state

    // Make headers configurations
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${APP_URL_RESUME}/delete-skill/${skill_id}`, config)
      .then((res) => {
        toast.success("Skill deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        findSkillsByUserId(user_id, token).then((response) => {
          // Dispatch event
          dispatch({
            type: "GET_SKILLS",
            skills: response.data,
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

export const loadSkills = () => {
  return (dispatch, getState) => {
    const skills = getState().skill.skills; // get skills from store state

    if (skills) {
      // Dispatch event
      dispatch({
        type: "SKILL_LOADED",
        skills,
      });
    } else return null;
  };
};

const findSkillsByUserId = (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.get(`${APP_URL_RESUME}/show-user-skill/${userId}`, config);
};
