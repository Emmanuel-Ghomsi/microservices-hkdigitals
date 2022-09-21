import { useState, useRef } from "react";

// From redux - dispatch event && get store state status
import { useDispatch } from "react-redux";
import {
  addExperience,
  editExperience,
} from "../../../../store/actions/experienceActions";

import "../../../../assets/scss/modal.scss";

// Editor
import { Editor } from "@tinymce/tinymce-react";

export default function ModalExperience(props) {
  const dispatch = useDispatch(); // dispatch events
  const [createExperience, setCreateExperience] = useState(props.experience);

  const editorRef = useRef(null);

  const handleCreateExperience = (e) => {
    e.stopPropagation();

    try {
      dispatch(addExperience(createExperience, props.user_id));
      props.setExperiences((experiences) => [...experiences, createExperience]);
    } catch (error) {
      console.log(error);
    }
    props.closeOpenModal(false);
  };

  const handleEditExperience = (e) => {
    e.stopPropagation();

    try {
      dispatch(editExperience(createExperience, props.user_id));
      // Pour arranger l'affichage lors de la modification pour éviter de dupliquer la ligne
      props.setExperiences(
        props.experiences.map((item, index) =>
          item.id === index ? { ...item, createExperience } : item
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
            <h5 className="heading">Ajouter une experience</h5>
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
                      <label htmlFor="role" className="form-label">
                        Titre du Poste
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="par ex. Enseignant"
                        id="role"
                        name="role"
                        value={
                          createExperience !== null
                            ? createExperience.role ?? ""
                            : ""
                        }
                        onChange={(e) => {
                          e.stopPropagation();
                          setCreateExperience({
                            ...createExperience,
                            role: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-48">
                    <div className="form-content">
                      <label htmlFor="company" className="form-label">
                        Employeur
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="company"
                        name="company"
                        value={
                          createExperience !== null
                            ? createExperience.company ?? ""
                            : ""
                        }
                        onChange={(e) => {
                          e.stopPropagation();
                          setCreateExperience({
                            ...createExperience,
                            company: e.target.value,
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
                          type="date"
                          className="form-control"
                          id="start_date"
                          name="start_date"
                          defaultValue={
                            createExperience !== null
                              ? createExperience.start_date != null
                                ? createExperience.start_date.split("T")[0]
                                : ""
                              : ""
                          }
                          onChange={(e) => {
                            e.stopPropagation();
                            setCreateExperience({
                              ...createExperience,
                              start_date: e.target.value,
                            });
                          }}
                        />
                        <input
                          type="date"
                          className="form-control"
                          id="end_date"
                          name="end_date"
                          defaultValue={
                            createExperience !== null
                              ? createExperience.end_date != null
                                ? createExperience.end_date.split("T")[0]
                                : ""
                              : ""
                          }
                          onChange={(e) => {
                            e.stopPropagation();
                            setCreateExperience({
                              ...createExperience,
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
                          createExperience !== null
                            ? createExperience.address ?? ""
                            : ""
                        }
                        onChange={(e) => {
                          e.stopPropagation();
                          setCreateExperience({
                            ...createExperience,
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
                    <input
                      id="my-file"
                      type="file"
                      name="my-file"
                      style={{ display: "none" }}
                    />
                    <Editor
                      apiKey="u2cpycvgufhmuz5rij4htoelepggzmztfwk6g4o6vzho6qjd"
                      placeholder="par ex. Création et mise en oeuvre de plans de leçon fondés sur les intérêts et les curiosités des enfants."
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      defaultValue={
                        createExperience !== null
                          ? createExperience.description ?? ""
                          : ""
                      }
                      init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                          "advlist",
                          "autolink",
                          "lists",
                          "link",
                          "image",
                          "charmap",
                          "preview",
                          "anchor",
                          "searchreplace",
                          "visualblocks",
                          "code",
                          "fullscreen",
                          "insertdatetime",
                          "media",
                          "table",
                          "help",
                          "wordcount",
                        ],
                        toolbar:
                          "undo redo | blocks | " +
                          "bold italic backcolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | link image | code | help",
                        image_title: true,
                        automatic_uploads: true,
                        file_picker_types: "image media",
                        file_picker_callback: function (callback, value, meta) {
                          if (meta.filetype == "image") {
                            var input = document.getElementById("my-file");
                            input.click();
                            input.onchange = function () {
                              var file = input.files[0];
                              var reader = new FileReader();
                              reader.onload = function (e) {
                                callback(e.target.result, {
                                  alt: file.name,
                                });
                              };
                              reader.readAsDataURL(file);
                            };
                          }
                        },
                        paste_data_images: true,
                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      }}
                      onChange={(e) => {
                        e.stopPropagation();
                        setCreateExperience({
                          ...createExperience,
                          description: editorRef.current.getContent(),
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
              {createExperience !== null &&
              createExperience._id !== undefined ? (
                <button
                  className="btn btn-primary"
                  onClick={handleEditExperience}
                >
                  Modifier
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={handleCreateExperience}
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
