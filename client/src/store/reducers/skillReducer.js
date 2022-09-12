// Toastify for popup informations
import { toast } from "react-toastify";

// Initial state
const initialState = {
  skills: null,
};

const skillReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SKILLS":
    case "SKILL_LOADED":
      // return new state
      return {
        ...initialState,
        skills: action.skills,
      };
    case "EMPTY_SKILLS":
      // return empty state
      return {
        skills: null,
      };
    default:
      return state;
  }
};

export default skillReducer;
