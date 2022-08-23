import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// From redux - dispatch event && get store state status
import { useDispatch, useSelector } from "react-redux";

import FormResume from "../components/resume/FormResume";
import ModalExperience from "../components/resume/experience/modal/ModalExperience";

// Actions
import { getUser } from "../store/actions/userActions";
import { getExperiencesByUser } from "../store/actions/experienceActions";

import "../assets/scss/dashboard.scss";

export default function Dashboard() {
  const navigate = useNavigate(); // redirect and navigate
  const dispatch = useDispatch(); // dispatch events

  const auth = useSelector((state) => state.auth); // get store state status from auth
  const userInState = useSelector((state) => state.user.user); // get store state status from users
  const experiencesInState = useSelector(
    (state) => state.experience.experiences
  ); // get store state status from experiences

  const [user, setUser] = useState({});
  const [experiences, setExperiences] = useState([]);
  const [experience, setExperience] = useState(null);
  const [openModal, setOpenModal] = useState(false); // open and close modals

  // Before mount, mount and update component
  useEffect(() => {
    // Check if user already authenticated and redirect to dashboard
    if (!auth.token && !auth._id) navigate("/signin");
    else {
      if (userInState === null) dispatch(getUser());
      else setUser(userInState);

      // Get Experiences
      if (user._id && experiencesInState === null)
        dispatch(getExperiencesByUser(user._id));
      else setExperiences(experiencesInState);
    }
  }, [auth, userInState, experiencesInState]);

  return (
    <div className="body-wrap">
      <div className="page-content">
        <FormResume
          user={user}
          experiences={experiences}
          setUser={setUser}
          setExperiences={setExperiences}
          setExperience={setExperience}
          setOpenModal={setOpenModal}
        />

        <div className="live-resume">
          <div className="container">Resume</div>
        </div>
      </div>

      {openModal ? (
        <ModalExperience
          user_id={user._id}
          closeOpenModal={setOpenModal}
          experience={experience}
          setExperiences={setExperiences}
        />
      ) : null}
    </div>
  );
}
