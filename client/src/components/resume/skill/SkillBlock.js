import { useDispatch } from "react-redux";
import { deleteSkill } from "../../../store/actions/skillActions";

import "../../../assets/scss/experience.scss";

export default function SkillBlock(props) {
  const dispatch = useDispatch(); // dispatch events

  const handleDeleteSkill = (skill_id) => {
    // If user confirm the deletion
    if (
      window.confirm(
        "Attention cette action est irréversible ! Voulez-vous réelement supprimer cette compétence ?"
      )
    ) {
      try {
        dispatch(deleteSkill(skill_id, props.user_id));
        props.setSkills(props.skills.filter((item) => item._id !== skill_id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="block-group">
      <h4>Compétences(s)</h4>
      <span className="span-info">
        Dressez la liste de vos compétences et de vos niveaux d'expériences afin
        de visualiser vos forces et d'optimiser vos mots-clés.
      </span>
      <div className="fw-semibold ml-2">
        <a
          href="#"
          onClick={(event) => {
            event.stopPropagation();
            props.setOpenModal(true);
            props.setModalType("skill");
            props.setSkill(null);
          }}
        >
          + Ajouter une compétence
        </a>
        <div className="experiences-header">
          <ul className="skills">
            {props.skills !== null
              ? props.skills.map((skill, index) => {
                  return (
                    <li index={index} key={index + "s"}>
                      <div className="experiences-content">
                        <div className="experiences-role">
                          <p>{skill.name}</p>
                        </div>
                        <p className="space">{skill.level}</p>
                      </div>
                      <div className="experiences-actions">
                        <a
                          href="#"
                          onClick={(event) => {
                            event.stopPropagation();
                            props.setOpenModal(true);
                            props.setModalType("skill");
                            props.setSkill(skill);
                          }}
                        >
                          <i className="fas fa-edit text-secondary mx-2"></i>
                        </a>
                        <a
                          href="#"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDeleteSkill(skill._id);
                          }}
                        >
                          <i className="fas fa-trash alt text-danger mx-2"></i>
                        </a>
                      </div>
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
}
