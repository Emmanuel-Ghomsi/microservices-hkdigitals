// Toastify for popup informations
import { toast } from "react-toastify";

// Initial state
const initialState = {
  formations: null,
};

const formationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_FORMATIONS":
    case "FORMATION_LOADED":
      // return new state
      return {
        ...initialState,
        formations: action.formations,
      };
    case "EMPTY_FORMATIONS":
      // return empty state
      return {
        formations: null,
      };
    default:
      return state;
  }
};

export default formationReducer;
