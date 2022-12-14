import { useState, useEffect } from "react";

// From redux - dispatch event && get store state status
import { useDispatch } from "react-redux";
import { addSkill, editSkill } from "../../../../store/actions/skillActions";

import CreatableSelect from "react-select/creatable";

// Toastify for popup informations
import { toast } from "react-toastify";

import "../../../../assets/scss/modal.scss";

export default function ModalSkill(props) {
  const dispatch = useDispatch(); // dispatch events
  const [skill, setSkill] = useState(props.skill);
  const [skillNames, setSkillNames] = useState([]);

  useEffect(() => {
    let tab = [];
    // transform option array into string array and set to state
    props.skills.map((opt) => {
      tab.push(opt.name);
    });
    setSkillNames(tab);
  }, []);

  const skillOptions = [
    { value: "Microsoft Office", label: "Microsoft Office" },
    { value: "Management", label: "Management" },
  ];

  const skillValues = skillOptions.filter(
    (sk) => !skillNames.includes(sk.value)
  );

  const handleCreateSkill = (e) => {
    e.stopPropagation();

    if (skill.name != null && skill.level != null)
      try {
        dispatch(addSkill(skill, props.user_id));
        props.setSkills((skills) => [...skills, skill]);
      } catch (error) {
        console.log(error);
      }
    else
      toast.error("Données invalides", {
        position: toast.POSITION.TOP_RIGHT,
      });

    props.closeOpenModal(false);
  };

  const handleEditSkill = (e) => {
    e.stopPropagation();

    try {
      dispatch(editSkill(skill, props.user_id));
      // Pour arranger l'affichage lors de la modification pour éviter de dupliquer la ligne
      props.setSkills(
        props.skills.map((item, index) =>
          item.id === index ? { ...item, skill } : item
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
        <div className="modal modal-sm">
          <div className="modal-header">
            <h5 className="heading">Ajouter une compétence</h5>
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
                      Libellé de la compétence
                    </label>
                    {skill !== null && skill._id !== undefined ? (
                    <input
                      type="text"
                      className="form-control"
                      placeholder="par ex. Microsoft Office"
                      id="name"
                      name="name"
                      value={skill !== null ? skill.name ?? "" : ""}
                      onChange={(e) => {
                        e.stopPropagation();
                        setSkill({
                          ...skill,
                          name: e.target.value,
                        });
                      }}
                    />
                    ) : (
                      <CreatableSelect
                        options={skillValues}
                        placeholder="par ex. Microsoft Office"
                        onChange={(option) =>
                          setSkill({
                            ...skill,
                            name: option.value,
                          })
                        }
                      />
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-content">
                    <label htmlFor="link" className="form-label">
                      Niveau (%)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="level"
                      name="level"
                      value={skill !== null ? skill.level ?? "" : ""}
                      onChange={(e) => {
                        e.stopPropagation();
                        // Force value between [1, 100]
                        setSkill({
                          ...skill,
                          level: Math.max(1, Math.min(100, e.target.value)),
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
              {skill !== null && skill._id !== undefined ? (
                <button className="btn btn-primary" onClick={handleEditSkill}>
                  Modifier
                </button>
              ) : (
                <button className="btn btn-primary" onClick={handleCreateSkill}>
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
