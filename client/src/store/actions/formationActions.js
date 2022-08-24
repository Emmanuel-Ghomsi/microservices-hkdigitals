// Send data in HTTP protocole to the server
import axios from "axios";

// Data from config files
import { APP_URL_RESUME } from "../../config/config";

// Toastify for popup informations
import { toast } from "react-toastify";

export const getFormationsByUser = (user_id) => {
  return (dispatch, getState) => {
    const token = getState().auth.token; // get the token from store state

    // Make headers configurations
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    findFormationsByUserId(user_id, token)
      .then((res) => {
        // Dispatch event
        dispatch({
          type: "GET_FORMATIONS",
          formations: res.data,
        });
      })
      .catch((err) => {
        toast.error(JSON.stringify(err.response?.data.error), {
          position: toast.POSITION.TOP_RIGHT,
        });

        // Dispatch event to logout user
        dispatch({
          type: "EMPTY_FORMATIONS",
        });
      });
  };
};

export const addFormation = (formation, user_id) => {
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
        `${APP_URL_RESUME}/create-formation`,
        {
          degree: formation.degree,
          establishment: formation.establishment,
          start_date: formation.start_date,
          address: formation.address,
          end_date: formation.end_date,
          description: formation.description,
          user: user_id,
        },
        config
      )
      .then((res) => {
        toast.success("Formation added successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        findFormationsByUserId(user_id, token).then((response) => {
          // Dispatch event
          dispatch({
            type: "GET_FORMATIONS",
            formations: response.data,
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

export const editFormation = (formation, user_id) => {
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
        `${APP_URL_RESUME}/edit-formation/${formation._id}`,
        {
          degree: formation.degree,
          establishment: formation.establishment,
          start_date: formation.start_date,
          address: formation.address,
          end_date: formation.end_date,
          description: formation.description,
          user: user_id,
        },
        config
      )
      .then((res) => {
        toast.success("Formation updated successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        findFormationsByUserId(user_id, token).then((response) => {
          // Dispatch event
          dispatch({
            type: "GET_FORMATIONS",
            formations: response.data,
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

export const deleteFormation = (formation_id, user_id) => {
  return (dispatch, getState) => {
    const token = getState().auth.token; // get the token from store state

    // Make headers configurations
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${APP_URL_RESUME}/delete-formation/${formation_id}`, config)
      .then((res) => {
        toast.success("Formation deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        findFormationsByUserId(user_id, token).then((response) => {
          // Dispatch event
          dispatch({
            type: "GET_FORMATIONS",
            formations: response.data,
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

export const loadFormations = () => {
  return (dispatch, getState) => {
    const formations = getState().formation.formations; // get formations from store state

    if (formations) {
      // Dispatch event
      dispatch({
        type: "FORMATION_LOADED",
        formations,
      });
    } else return null;
  };
};

const findFormationsByUserId = (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.get(`${APP_URL_RESUME}/show-user-formation/${userId}`, config);
};
