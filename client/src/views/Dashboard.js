import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// From redux - dispatch event && get store state status
import { useDispatch, useSelector } from "react-redux";

import FormResume from "../components/resume/FormResume";
import ModalExperience from "../components/resume/experience/modal/ModalExperience";
import ModalFormation from "../components/resume/formation/modal/ModalFormation";
import ModalSocial from "../components/resume/social/modal/ModalSocial";
import ModalSkill from "../components/resume/skill/modal/ModalSkill";
import ModalLanguage from "../components/resume/language/modal/ModalLanguage";
import ModalHobby from "../components/resume/hobby/modal/ModalHobby";
import Resume from "../components/resume/Resume";

// Actions
import { getUser } from "../store/actions/userActions";
import { getExperiencesByUser } from "../store/actions/experienceActions";
import { getFormationsByUser } from "../store/actions/formationActions";
import { getSocialsByUser } from "../store/actions/socialActions";
import { getSkillsByUser } from "../store/actions/skillActions";
import { getLanguagesByUser } from "../store/actions/languageActions";
import { getHobbiesByUser } from "../store/actions/hobbyActions";
import { getResumeByUser } from "../store/actions/resumeActions";

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
  const socialsInState = useSelector((state) => state.social.socials); // get store state status from socials
  const skillsInState = useSelector((state) => state.skill.skills); // get store state status from skills
  const languagesInState = useSelector((state) => state.language.languages); // get store state status from languages
  const hobbiesInState = useSelector((state) => state.hobby.hobbies); // get store state status from hobbies
  const resumeInState = useSelector((state) => state.resume.resume); // get store state status from resume

  const [user, setUser] = useState({});
  const [experiences, setExperiences] = useState([]);
  const [experience, setExperience] = useState(null);
  const [formations, setFormations] = useState([]);
  const [formation, setFormation] = useState(null);
  const [socials, setSocials] = useState([]);
  const [social, setSocial] = useState(null);
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState(null);
  const [hobbies, setHobbies] = useState([]);
  const [hobby, setHobby] = useState(null);
  const [resume, setResume] = useState(null);
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

      // Get Socials
      if (user._id && socialsInState === null)
        dispatch(getSocialsByUser(user._id));
      else setSocials(socialsInState);

      // Get Skills
      if (user._id && skillsInState === null)
        dispatch(getSkillsByUser(user._id));
      else setSkills(skillsInState);

      // Get Languages
      if (user._id && languagesInState === null)
        dispatch(getLanguagesByUser(user._id));
      else setLanguages(languagesInState);

      // Get Hobbies
      if (user._id && hobbiesInState === null)
        dispatch(getHobbiesByUser(user._id));
      else setHobbies(hobbiesInState);

      // Get Resume
      if (user._id && resumeInState === null)
        dispatch(getResumeByUser(user._id));
      else setResume(resumeInState);
    }
  }, [
    auth,
    userInState,
    experiencesInState,
    formationsInState,
    socialsInState,
    skillsInState,
    languagesInState,
    hobbiesInState,
    resumeInState,
  ]);

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
          socials={socials}
          setSocials={setSocials}
          setSocial={setSocial}
          skills={skills}
          setSkills={setSkills}
          setSkill={setSkill}
          hobbies={hobbies}
          setHobbies={setHobbies}
          setHobby={setHobby}
          languages={languages}
          resume={resume}
          setResume={setResume}
          setLanguages={setLanguages}
          setLanguage={setLanguage}
          setOpenModal={setOpenModal}
          setModalType={setModalType}
        />

        <div className="live-resume">
          <div className="container">
            <Resume
              user={user}
              experiences={experiences}
              formations={formations}
              socials={socials}
              skills={skills}
              hobbies={hobbies}
              languages={languages}
              resume={resume}
            />
          </div>
        </div>
      </div>

      {openModal && modalType === "experience" ? (
        <ModalExperience
          user_id={user._id}
          closeOpenModal={setOpenModal}
          experience={experience}
          experiences={experiences}
          setExperiences={setExperiences}
        />
      ) : null}

      {openModal && modalType === "formation" ? (
        <ModalFormation
          user_id={user._id}
          closeOpenModal={setOpenModal}
          formation={formation}
          formations={formations}
          setFormations={setFormations}
        />
      ) : null}

      {openModal && modalType === "social" ? (
        <ModalSocial
          user_id={user._id}
          closeOpenModal={setOpenModal}
          social={social}
          socials={socials}
          setSocials={setSocials}
        />
      ) : null}

      {openModal && modalType === "skill" ? (
        <ModalSkill
          user_id={user._id}
          closeOpenModal={setOpenModal}
          skill={skill}
          skills={skills}
          setSkills={setSkills}
        />
      ) : null}

      {openModal && modalType === "language" ? (
        <ModalLanguage
          user_id={user._id}
          closeOpenModal={setOpenModal}
          language={language}
          languages={languages}
          setLanguages={setLanguages}
        />
      ) : null}

      {openModal && modalType === "hobby" ? (
        <ModalHobby
          user_id={user._id}
          closeOpenModal={setOpenModal}
          hobby={hobby}
          hobbies={hobbies}
          setHobbies={setHobbies}
        />
      ) : null}
    </div>
  );
}
