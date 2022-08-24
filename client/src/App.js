import { BrowserRouter, Routes, Route } from "react-router-dom";
import Router from "./routes/Router";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Actions
import { loadAuth } from "./store/actions/authActions";
import { loadUser } from "./store/actions/userActions";
import { loadExperiences } from "./store/actions/experienceActions";
import { loadFormations } from "./store/actions/formationActions";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAuth());
    dispatch(loadUser());
    dispatch(loadExperiences());
    dispatch(loadFormations());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Router />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
