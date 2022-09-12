import { useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { deleteExperience } from "../../../store/actions/experienceActions";

import "../../../assets/scss/experience.scss";

export default function FormationBlock(props) {
  const dispatch = useDispatch(); // dispatch events

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(props.formations);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    props.setFormations(items);
  }

  const handleDeleteFormation = (formation_id) => {
    // If user confirm the deletion
    if (
      window.confirm(
        "Attention cette action est irréversible ! Voulez-vous réelement supprimer cette formation ?"
      )
    ) {
      try {
        dispatch(deleteExperience(formation_id, props.user_id));
        props.setFormations(
          props.formations.filter((item) => item._id !== formation_id)
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="block-group">
      <h4>Formation(s)</h4>
      <span className="span-info">
        S'il y a lieu, indiquez vos plus recents résultats académiques et les
        dates ici.
      </span>
      <div className="fw-semibold ml-2">
        <a
          href="#"
          onClick={(event) => {
            event.stopPropagation();
            props.setOpenModal(true);
            props.setModalType("formation");
            props.setFormation(null);
          }}
        >
          + Ajouter une formation
        </a>
        <div className="experiences-header">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="formations">
              {(provided) => (
                <ul
                  className="experiences"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {props.formations !== null
                    ? props.formations.map((formation, index) => {
                        return (
                          <Draggable
                            key={formation._id}
                            draggableId={formation._id}
                            index={index}
                          >
                            {(provided) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  version="1.1"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M8.5 4c0 .82843-.67157 1.5-1.5 1.5S5.5 4.82843 5.5 4 6.17157 2.5 7 2.5s1.5.67157 1.5 1.5zM7 11.5c.82843 0 1.5-.6716 1.5-1.5 0-.82843-.67157-1.5-1.5-1.5s-1.5.67157-1.5 1.5c0 .8284.67157 1.5 1.5 1.5zm0 6c.82843 0 1.5-.6716 1.5-1.5s-.67157-1.5-1.5-1.5-1.5.6716-1.5 1.5.67157 1.5 1.5 1.5zm6 0c.8284 0 1.5-.6716 1.5-1.5s-.6716-1.5-1.5-1.5-1.5.6716-1.5 1.5.6716 1.5 1.5 1.5zm1.5-7.5c0 .8284-.6716 1.5-1.5 1.5s-1.5-.6716-1.5-1.5c0-.82843.6716-1.5 1.5-1.5s1.5.67157 1.5 1.5zM13 5.5c.8284 0 1.5-.67157 1.5-1.5s-.6716-1.5-1.5-1.5-1.5.67157-1.5 1.5.6716 1.5 1.5 1.5z"></path>
                                </svg>
                                <div className="experiences-content">
                                  <div className="experiences-role">
                                    <p>{formation.degree}</p>
                                  </div>
                                  <p>: {formation.establishment}</p>
                                </div>
                                <div className="experiences-actions">
                                  <a
                                    href="#"
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      props.setOpenModal(true);
                                      props.setModalType("formation");
                                      props.setFormation(formation);
                                    }}
                                  >
                                    <i className="fas fa-edit text-secondary mx-2"></i>
                                  </a>
                                  <a
                                    href="#"
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      handleDeleteFormation(formation._id);
                                    }}
                                  >
                                    <i className="fas fa-trash alt text-danger mx-2"></i>
                                  </a>
                                </div>
                              </li>
                            )}
                          </Draggable>
                        );
                      })
                    : null}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}
