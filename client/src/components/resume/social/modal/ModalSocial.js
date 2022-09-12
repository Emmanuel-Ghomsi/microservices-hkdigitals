import { useState } from "react";

// From redux - dispatch event && get store state status
import { useDispatch } from "react-redux";
import { addSocial, editSocial } from "../../../../store/actions/socialActions";

import "../../../../assets/scss/modal.scss";

export default function ModalSocial(props) {
  const dispatch = useDispatch(); // dispatch events
  const [social, setSocial] = useState(props.social);

  const handleCreateSocial = (e) => {
    e.stopPropagation();

    try {
      dispatch(addSocial(social, props.user_id));
      props.setSocials((socials) => [...socials, social]);
    } catch (error) {
      console.log(error);
    }
    props.closeOpenModal(false);
  };

  const handleEditSocial = (e) => {
    e.stopPropagation();
    try {
      dispatch(editSocial(social, props.user_id));
      // Pour arranger l'affichage lors de la modification pour éviter de dupliquer la ligne
      props.setSocials(
        props.socials.map((item, index) =>
          item.id === index ? { ...item, social } : item
        )
      );
    } catch (error) {
      console.log(error);
    }
    props.closeOpenModal(false);
  };

  return (
    <>
      <div
        className="dark-bg"
        onClick={(e) => {
          e.stopPropagation();
          props.closeOpenModal(false);
        }}
      />
      <div className="centered">
        <div className="modal modal-md">
          <div className="modal-header">
            <h5 className="heading">Ajouter un lien vers un réseau social</h5>
          </div>
          <button
            className="close-btn"
            onClick={(e) => {
              e.stopPropagation();
              props.closeOpenModal(false);
            }}
          >
            X
          </button>

          <div className="modal-content">
            <div className="container">
              <div className="block-group">
                <div className="form-group">
                  <div className="form-content">
                    <label htmlFor="name" className="form-label">
                      Nom du réseau
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="par ex. Facebook"
                      id="name"
                      name="name"
                      value={social !== null ? social.name ?? "" : ""}
                      onChange={(e) => {
                        e.stopPropagation();
                        setSocial({
                          ...social,
                          name: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-content">
                    <label htmlFor="link" className="form-label">
                      Lien
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="par ex. facebook.com"
                      id="link"
                      name="link"
                      value={social !== null ? social.link ?? "" : ""}
                      onChange={(e) => {
                        e.stopPropagation();
                        setSocial({
                          ...social,
                          link: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <div className="actions-container">
              {social !== null && social._id !== undefined ? (
                <button className="btn btn-primary" onClick={handleEditSocial}>
                  Modifier
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={handleCreateSocial}
                >
                  Enregister
                </button>
              )}

              <button
                className="btn btn-secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  props.closeOpenModal(false);
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
