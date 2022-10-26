import { useState } from "react";

import "../../../../assets/scss/modal.scss";

export default function ModalSelectTemplate(props) {
  //const [createExperience, setCreateExperience] = useState(props.experience);

  const handleSelectTemplate = (template) => {
    if (localStorage.getItem("selectedTemplate") == null)
      localStorage.setItem("selectedTemplate", template);
    else {
      localStorage.removeItem("selectedTemplate");
      localStorage.setItem("selectedTemplate", template);
    }
    props.setTemplate(template);
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
            <h5 className="heading">Selectionner un modèle</h5>
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
              <div className="template-group">
                <div className="template-preview">
                  <img
                    className="template-img"
                    src={require("../img/Default-resume.webp")}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectTemplate("default");
                    }}
                  />
                </div>
                <div className="template-preview">
                  <img
                    className="template-img"
                    src={require("../img/Medicale-bleu.jpeg")}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectTemplate("medical");
                    }}
                  />
                </div>
                <div className="template-preview">
                  <img
                    className="template-img"
                    src={require("../img/Moderne-vert.jpeg")}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectTemplate("modern");
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
