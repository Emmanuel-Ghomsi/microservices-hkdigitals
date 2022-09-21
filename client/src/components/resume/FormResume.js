import UserPersonnalInfoBlock from "./user/UserPersonnalInfoBlock";
import ExperienceBlock from "./experience/ExperienceBlock";
import FormationBlock from "./formation/FormationBlock";
import SocialBlock from "./social/SocialBlock";
import SkillBlock from "./skill/SkillBlock";
import LanguageBlock from "./language/LanguageBlock";
import HobbyBlock from "./hobby/HobbyBlock";

//import { useState } from "react";

export default function FormResume(props) {
  //const [resume, setResume] = useState(props.resume);

  return (
    <>
        <UserPersonnalInfoBlock
          user={props.user}
          setUser={props.setUser}
          setPresetImg={props.setPresetImg}
          setAvatarFinal={props.setAvatarFinal}
        />

        <div className="block-group">
          <h4>Résumé professionnel</h4>
          <div className="form-group">
            <div className="form-content">
              <label htmlFor="summary" className="form-label">
                Inclure 2 ou 3 phrases claires au sujet de votre expérience
                globale
              </label>
              <textarea
                type="text"
                className="form-control"
                id="summary"
                name="summary"
                placeholder="par ex. Professeur de science passionné avec plus de 8 ans d'expérience et un parcours professionnel de ..."
                rows={5}
                value={props.resume !== null ? props.resume.summary ?? "" : ""}
                onChange={(e) => {
                  e.stopPropagation();
                  props.setResume({
                    ...props.resume,
                    summary: e.target.value,
                  });
                }}
              ></textarea>
            </div>
          </div>
        </div>

        <ExperienceBlock
          user_id={props.user._id}
          experiences={props.experiences}
          setOpenModal={props.setOpenModal}
          setModalType={props.setModalType}
          setExperiences={props.setExperiences}
          setExperience={props.setExperience}
        />

        <FormationBlock
          user_id={props.user._id}
          formations={props.formations}
          setOpenModal={props.setOpenModal}
          setModalType={props.setModalType}
          setFormations={props.setFormations}
          setFormation={props.setFormation}
        />

        <SocialBlock
          user_id={props.user._id}
          socials={props.socials}
          setOpenModal={props.setOpenModal}
          setModalType={props.setModalType}
          setSocials={props.setSocials}
          setSocial={props.setSocial}
        />

        <SkillBlock
          user_id={props.user._id}
          skills={props.skills}
          setOpenModal={props.setOpenModal}
          setModalType={props.setModalType}
          setSkills={props.setSkills}
          setSkill={props.setSkill}
        />

        <HobbyBlock
          user_id={props.user._id}
          hobbies={props.hobbies}
          setOpenModal={props.setOpenModal}
          setModalType={props.setModalType}
          setHobbies={props.setHobbies}
          setHobby={props.setHobby}
        />

        <LanguageBlock
          user_id={props.user._id}
          languages={props.languages}
          setOpenModal={props.setOpenModal}
          setModalType={props.setModalType}
          setLanguages={props.setLanguages}
          setLanguage={props.setLanguage}
        />
      </>
  );
}
