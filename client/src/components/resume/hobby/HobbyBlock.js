import { useDispatch } from "react-redux";
import { deleteHobby } from "../../../store/actions/hobbyActions";

import "../../../assets/scss/experience.scss";

export default function HobbyBlock(props) {
  const dispatch = useDispatch(); // dispatch events

  const handleDeleteHobby = (hobby_id) => {
    // If user confirm the deletion
    if (
      window.confirm(
        "Attention cette action est irréversible ! Voulez-vous réelement supprimer cette activité ?"
      )
    ) {
      try {
        dispatch(deleteHobby(hobby_id, props.user_id));
        props.setHobbies(props.hobbies.filter((item) => item._id !== hobby_id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="block-group">
      <h4>Centre(s) d'intérêt(s)</h4>
      <span className="span-info">Quelle(s) activité(s) pratiquez-vous ?</span>
      <div className="fw-semibold ml-2">
        <a
          href="#"
          onClick={(event) => {
            event.stopPropagation();
            props.setOpenModal(true);
            props.setModalType("hobby");
            props.setHobby(null);
          }}
        >
          + Ajouter une activité
        </a>
        <div className="experiences-header">
          <ul className="skills">
            {props.hobbies !== null
              ? props.hobbies.map((hobby, index) => {
                  return (
                    <li index={index} key={hobby._id}>
                      <div className="experiences-content">
                        <div className="experiences-role">
                          <p>{hobby.name}</p>
                        </div>
                      </div>
                      <div className="experiences-actions">
                        <a
                          href="#"
                          onClick={(event) => {
                            event.stopPropagation();
                            props.setOpenModal(true);
                            props.setModalType("hobby");
                            props.setHobby(hobby);
                          }}
                        >
                          <i className="fas fa-edit text-secondary mx-2"></i>
                        </a>
                        <a
                          href="#"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDeleteHobby(hobby._id);
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
