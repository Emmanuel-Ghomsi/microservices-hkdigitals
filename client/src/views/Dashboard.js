import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// From redux - dispatch event && get store state status
import { useDispatch, useSelector } from "react-redux";

import FormResume from "../components/resume/FormResume";
import ModalExperience from "../components/resume/experience/modal/ModalExperience";
import ModalFormation from "../components/resume/formation/modal/ModalFormation";

// Actions
import { getUser } from "../store/actions/userActions";
import { getExperiencesByUser } from "../store/actions/experienceActions";
import { getFormationsByUser } from "../store/actions/formationActions";

import "../assets/scss/dashboard.scss";

export default function Dashboard() {
  const navigate = useNavigate(); // redirect and navigate
  const dispatch = useDispatch(); // dispatch events

  const auth = useSelector((state) => state.auth); // get store state status from auth
  const userInState = useSelector((state) => state.user.user); // get store state status from users
  const experiencesInState = useSelector(
    (state) => state.experience.experiences
  ); // get store state status from experiences
  const formationsInState = useSelector((state) => state.formation.formations); // get store state status from formations

  const [user, setUser] = useState({});
  const [experiences, setExperiences] = useState([]);
  const [experience, setExperience] = useState(null);
  const [formations, setFormations] = useState([]);
  const [formation, setFormation] = useState(null);
  const [openModal, setOpenModal] = useState(false); // open and close modals
  const [modalType, setModalType] = useState(""); // open and close modals

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

      // Get Formations
      if (user._id && formationsInState === null)
        dispatch(getFormationsByUser(user._id));
      else setFormations(formationsInState);
    }
  }, [auth, userInState, experiencesInState, formationsInState]);

  return (
    <div className="body-wrap">
      <div className="page-content">
        <FormResume
          user={user}
          setUser={setUser}
          experiences={experiences}
          setExperiences={setExperiences}
          setExperience={setExperience}
          formations={formations}
          setFormations={setFormations}
          setFormation={setFormation}
          setOpenModal={setOpenModal}
          setModalType={setModalType}
        />

        <div className="live-resume">
          <div className="container">Resume</div>
        </div>
      </div>

      {openModal && modalType === "experience" ? (
        <ModalExperience
          user_id={user._id}
          closeOpenModal={setOpenModal}
          experience={experience}
          setExperiences={setExperiences}
        />
      ) : null}

      {openModal && modalType === "formation" ? (
        <ModalFormation
          user_id={user._id}
          closeOpenModal={setOpenModal}
          formation={formation}
          setFormations={setFormations}
        />
      ) : null}
    </div>
  );
}
