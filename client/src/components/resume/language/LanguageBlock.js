import { useDispatch } from "react-redux";
import { deleteLanguage } from "../../../store/actions/languageActions";

import "../../../assets/scss/experience.scss";

export default function LanguageBlock(props) {
  const dispatch = useDispatch(); // dispatch events

  const handleDeleteLanguage = (language_id) => {
    // If user confirm the deletion
    if (
      window.confirm(
        "Attention cette action est irréversible ! Voulez-vous réelement supprimer cette langue ?"
      )
    ) {
      try {
        dispatch(deleteLanguage(language_id, props.user_id));
        props.setLanguages(
          props.languages.filter((item) => item._id !== language_id)
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="block-group">
      <h4>Langue(s)</h4>
      <span className="span-info">
        Quelle(s) est(sont) la(les) langue(s) que vous parlez ?
      </span>
      <div className="fw-semibold ml-2">
        <a
          href="#"
          onClick={(event) => {
            event.stopPropagation();
            props.setOpenModal(true);
            props.setModalType("language");
            props.setLanguage(null);
          }}
        >
          + Ajouter une langue
        </a>
        <div className="experiences-header">
          <ul className="skills">
            {props.languages !== null
              ? props.languages.map((language, index) => {
                  return (
                    <li index={index} key={language._id}>
                      <div className="experiences-content">
                        <div className="experiences-role">
                          <p>{language.name}</p>
                        </div>
                        <p>: {language.level}</p>
                      </div>
                      <div className="experiences-actions">
                        <a
                          href="#"
                          onClick={(event) => {
                            event.stopPropagation();
                            props.setOpenModal(true);
                            props.setModalType("language");
                            props.setLanguage(language);
                          }}
                        >
                          <i className="fas fa-edit text-secondary mx-2"></i>
                        </a>
                        <a
                          href="#"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDeleteLanguage(language._id);
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
