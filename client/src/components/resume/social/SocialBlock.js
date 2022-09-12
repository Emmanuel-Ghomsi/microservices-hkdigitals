import { useDispatch } from "react-redux";
import { deleteSocial } from "../../../store/actions/socialActions";

import "../../../assets/scss/experience.scss";

export default function SocialBlock(props) {
  const dispatch = useDispatch(); // dispatch events

  const handleDeleteSocial = (social_id) => {
    // If user confirm the deletion
    if (
      window.confirm(
        "Attention cette action est irréversible ! Voulez-vous réelement supprimer cet élément ?"
      )
    ) {
      try {
        dispatch(deleteSocial(social_id, props.user_id));
        props.setSocials(
          props.socials.filter((item) => item._id !== social_id)
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="block-group">
      <h4>Site web et lien sociaux</h4>
      <span className="span-info">
        Vous pouvez ajouter des liens vers des sites web que les recruteurs
        verront ! Cela peut être un lien vers votre Portfolio, votre profil
        LinkedIn ou votre site web personnel.
      </span>
      <div className="fw-semibold ml-2">
        <a
          href="#"
          onClick={(event) => {
            event.stopPropagation();
            props.setOpenModal(true);
            props.setModalType("social");
            props.setSocial(null);
          }}
        >
          + Ajouter un lien
        </a>
        <div className="experiences-header">
          <ul className="socials">
            {props.socials !== null
              ? props.socials.map((social, index) => {
                  return (
                    <li index={index} key={social._id}>
                      <div className="experiences-content">
                        <div className="experiences-role">
                          <p>{social.name}</p>
                        </div>
                        <p>: {social.link}</p>
                      </div>
                      <div className="experiences-actions">
                        <a
                          href="#"
                          onClick={(event) => {
                            event.stopPropagation();
                            props.setOpenModal(true);
                            props.setModalType("social");
                            props.setSocial(social);
                          }}
                        >
                          <i className="fas fa-edit text-secondary mx-2"></i>
                        </a>
                        <a
                          href="#"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDeleteSocial(social._id);
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
