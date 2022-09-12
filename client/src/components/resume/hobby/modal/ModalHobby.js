import { useState } from "react";

// From redux - dispatch event && get store state status
import { useDispatch } from "react-redux";
import { addHobby, editHobby } from "../../../../store/actions/hobbyActions";

import "../../../../assets/scss/modal.scss";

export default function ModalHobby(props) {
  const dispatch = useDispatch(); // dispatch events
  const [hobby, setHobby] = useState(props.hobby);

  const handleCreateHobby = (e) => {
    e.stopPropagation();

    try {
      dispatch(addHobby(hobby, props.user_id));
      props.setHobbies((hobbies) => [...hobbies, hobby]);
    } catch (error) {
      console.log(error);
    }
    props.closeOpenModal(false);
  };

  const handleEditHobby = (e) => {
    e.stopPropagation();
    try {
      dispatch(editHobby(hobby, props.user_id));
      // Pour arranger l'affichage lors de la modification pour éviter de dupliquer la ligne
      props.setHobbies(
        props.hobbies.map((item, index) =>
          item.id === index ? { ...item, hobby } : item
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
            <h5 className="heading">Ajouter une activité</h5>
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
                      Libellé de l'activité
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="par ex. Lecture"
                      id="name"
                      name="name"
                      value={hobby !== null ? hobby.name ?? "" : ""}
                      onChange={(e) => {
                        e.stopPropagation();
                        setHobby({
                          ...hobby,
                          name: e.target.value,
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
              {hobby !== null && hobby._id !== undefined ? (
                <button className="btn btn-primary" onClick={handleEditHobby}>
                  Modifier
                </button>
              ) : (
                <button className="btn btn-primary" onClick={handleCreateHobby}>
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
