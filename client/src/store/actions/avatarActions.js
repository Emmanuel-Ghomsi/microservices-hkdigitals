// Send data in HTTP protocole to the server
import axios from "axios";

// Data from config files
import { APP_URL_IMAGE } from "../../config/config";

// Toastify for popup informations
import { toast } from "react-toastify";

export const getImageById = (id) => {
  return (dispatch, getState) => {
    const token = getState().auth.token; // get the token from store state

    // Make headers configurations
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    findImageByImageableId(id, token)
      .then((res) => {
        // Dispatch event
        dispatch({
          type: "GET_IMAGE",
          image: res.data,
        });
      })
      .catch((err) => {
        toast.error(JSON.stringify(err.response?.data.error), {
          position: toast.POSITION.TOP_RIGHT,
        });

        // Dispatch event to logout user
        dispatch({
          type: "EMPTY_IMAGE",
        });
      });
  };
};

export const addImage = (imageObject, id) => {
  return (dispatch, getState) => {
    const token = getState().auth.token; // get the token from store state

    // Send to cloudinary
    const imgData = new FormData();
    imgData.append("file", imageObject.file);
    imgData.append("upload_preset", "emmanuel");

    // Make headers configurations
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post("https://api.cloudinary.com/v1_1/emmanuelsan/image/upload", imgData)
      .then((res) => {
        axios
          .post(
            `${APP_URL_IMAGE}/create-image`,
            {
              url: res.data.secure_url,
              imageable_type: imageObject.type,
              imageable_id: id,
            },
            config
          )
          .then((res) => {
            toast.success("Image added successfully!", {
              position: toast.POSITION.TOP_RIGHT,
            });

            findImageByImageableId(id, token).then((response) => {
              // Dispatch event
              dispatch({
                type: "GET_IMAGE",
                image: response.data,
              });
            });
          })
          .catch((err) => {
            toast.error(JSON.stringify(err.response?.data.error), {
              position: toast.POSITION.TOP_RIGHT,
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

export const editImage = (imageId, imageObject, id) => {
  return (dispatch, getState) => {
    const token = getState().auth.token; // get the token from store state

    // Send to cloudinary
    const imgData = new FormData();
    imgData.append("file", imageObject.file);
    imgData.append("upload_preset", "emmanuel");

    // Make headers configurations
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post("https://api.cloudinary.com/v1_1/emmanuelsan/image/upload", imgData)
      .then((res) => {
        axios
          .post(
            `${APP_URL_IMAGE}/edit-image/${imageId}`,
            {
              url: res.data.secure_url,
              imageable_type: imageObject.type,
              imageable_id: id,
            },
            config
          )
          .then((res) => {
            toast.success("Image added successfully!", {
              position: toast.POSITION.TOP_RIGHT,
            });

            findImageByImageableId(id, token).then((response) => {
              // Dispatch event
              dispatch({
                type: "GET_IMAGE",
                image: response.data,
              });
            });
          })
          .catch((err) => {
            toast.error(JSON.stringify(err.response?.data.error), {
              position: toast.POSITION.TOP_RIGHT,
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

export const loadImage = () => {
  return (dispatch, getState) => {
    const image = getState().image.image; // get skills from store state

    if (image) {
      // Dispatch event
      dispatch({
        type: "IMAGE_LOADED",
        image,
      });
    } else return null;
  };
};

const findImageByImageableId = (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.get(`${APP_URL_IMAGE}/show-image-by-imageable-id/${id}`, config);
};
