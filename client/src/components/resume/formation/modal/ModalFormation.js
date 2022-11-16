import { useState } from "react";

// From redux - dispatch event && get store state status
import { useDispatch } from "react-redux";
import {
  addFormation,
  editFormation,
} from "../../../../store/actions/formationActions";

// Toastify for popup informations
import { toast } from "react-toastify";

import "../../../../assets/scss/modal.scss";

export default function ModalFormation(props) {
  const dispatch = useDispatch(); // dispatch events
  const [createFormation, setCreateFormation] = useState(props.formation);

  const handleCreateFormation = (e) => {
    e.stopPropagation();

    if (
      createFormation.degree != null &&
      createFormation.establishment != null &&
      createFormation.start_date != null &&
      createFormation.address != null
    )
      try {
        dispatch(addFormation(createFormation, props.user_id));
        props.setFormations((formations) => [...formations, createFormation]);
      } catch (error) {
        console.log(error);
      }
    else
      toast.error("Données invalides", {
        position: toast.POSITION.TOP_RIGHT,
      });

    props.closeOpenModal(false);
  };

  const handleEditFormation = (e) => {
    e.stopPropagation();

    try {
      dispatch(editFormation(createFormation, props.user_id));
      // Pour arranger l'affichage lors de la modification pour éviter de dupliquer la ligne
      props.setFormations(
        props.formations.map((item, index) =>
          item.id === index ? { ...item, createFormation } : item
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
            <h5 className="heading">Ajouter une formation</h5>
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
                  <div className="w-48">
                    <div className="form-content">
                      <label htmlFor="degree" className="form-label">
                        Diplôme / Certification
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="par ex. Licence en Sciences"
                        id="degree"
                        name="degree"
                        value={
                          createFormation !== null
                            ? createFormation.degree ?? ""
                            : ""
                        }
                        onChange={(e) => {
                          e.stopPropagation();
                          setCreateFormation({
                            ...createFormation,
                            degree: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-48">
                    <div className="form-content">
                      <label htmlFor="establishment" className="form-label">
                        Établissement d'obtention
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="establishment"
                        name="establishment"
                        value={
                          createFormation !== null
                            ? createFormation.establishment ?? ""
                            : ""
                        }
                        onChange={(e) => {
                          e.stopPropagation();
                          setCreateFormation({
                            ...createFormation,
                            establishment: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="w-48">
                    <div className="form-content">
                      <label className="form-label">Début / Fin</label>
                      <div className="d-flex justify-content-between">
                        <input
                          type="month"
                          className="form-control"
                          id="start_date"
                          name="start_date"
                          defaultValue={
                            createFormation !== null
                              ? createFormation.start_date != null
                                ? createFormation.start_date.split("T")[0]
                                : ""
                              : ""
                          }
                          onChange={(e) => {
                            e.stopPropagation();
                            setCreateFormation({
                              ...createFormation,
                              start_date: e.target.value,
                            });
                          }}
                        />
                        <input
                          type="month"
                          className="form-control"
                          id="end_date"
                          name="end_date"
                          defaultValue={
                            createFormation !== null
                              ? createFormation.end_date != null
                                ? createFormation.end_date.split("T")[0]
                                : ""
                              : ""
                          }
                          onChange={(e) => {
                            e.stopPropagation();
                            setCreateFormation({
                              ...createFormation,
                              end_date: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-48">
                    <div className="form-content">
                      <label htmlFor="address" className="form-label">
                        Lieu
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="par ex. Akwa, Douala"
                        id="address"
                        name="address"
                        value={
                          createFormation !== null
                            ? createFormation.address ?? ""
                            : ""
                        }
                        onChange={(e) => {
                          e.stopPropagation();
                          setCreateFormation({
                            ...createFormation,
                            address: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-content">
                    <label htmlFor="description" className="form-label">
                      Mentionnez plus de 200 caractéristiques pour augmenter les
                      chances d'entretien
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="description"
                      name="description"
                      placeholder="par ex. Création et mise en oeuvre de plans de leçon fondés sur les intérêts et les curiosités des enfants."
                      rows={5}
                      value={
                        createFormation !== null
                          ? createFormation.description ?? ""
                          : ""
                      }
                      onChange={(e) => {
                        e.stopPropagation();
                        setCreateFormation({
                          ...createFormation,
                          description: e.target.value,
                        });
                      }}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <div className="actions-container">
              {createFormation !== null && createFormation._id !== undefined ? (
                <button
                  className="btn btn-primary"
                  onClick={handleEditFormation}
                >
                  Modifier
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={handleCreateFormation}
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
