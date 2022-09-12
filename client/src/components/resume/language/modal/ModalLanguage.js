import { useState } from "react";

// From redux - dispatch event && get store state status
import { useDispatch } from "react-redux";
import {
  addLanguage,
  editLanguage,
} from "../../../../store/actions/languageActions";

import "../../../../assets/scss/modal.scss";

export default function ModalLanguage(props) {
  const dispatch = useDispatch(); // dispatch events
  const [language, setLanguage] = useState(props.language);

  const handleCreateLanguage = (e) => {
    e.stopPropagation();

    try {
      dispatch(addLanguage(language, props.user_id));
      props.setLanguages((languages) => [...languages, language]);
    } catch (error) {
      console.log(error.getMessage());
    }
    props.closeOpenModal(false);
  };

  const handleEditLanguage = (e) => {
    e.stopPropagation();
    try {
      dispatch(editLanguage(language, props.user_id));
      // Pour arranger l'affichage lors de la modification pour éviter de dupliquer la ligne
      props.setLanguages(
        props.languages.map((item, index) =>
          item.id === index ? { ...item, language } : item
        )
      );
    } catch (error) {
      console.log(error.getMessage());
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
            <h5 className="heading">Ajouter une langue</h5>
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
                      Libellé de la langue
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="par ex. Français"
                      id="name"
                      name="name"
                      value={language !== null ? language.name ?? "" : ""}
                      onChange={(e) => {
                        e.stopPropagation();
                        setLanguage({
                          ...language,
                          name: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-content">
                    <label htmlFor="link" className="form-label">
                      Choisir le niveau
                    </label>
                    <select
                      className="form-control"
                      id="level"
                      name="level"
                      value={language !== null ? language.level ?? "" : ""}
                      onChange={(e) => {
                        e.stopPropagation();
                        setLanguage({
                          ...language,
                          level: e.target.value,
                        });
                      }}
                    >
                      <option value="Débutant">Débutant</option>
                      <option value="Intermédiare">Intermédiare</option>
                      <option value="Expert">Expert</option>
                      <option value="Maternelle">Maternelle</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <div className="actions-container">
              {language !== null && language._id !== undefined ? (
                <button
                  className="btn btn-primary"
                  onClick={handleEditLanguage}
                >
                  Modifier
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={handleCreateLanguage}
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
