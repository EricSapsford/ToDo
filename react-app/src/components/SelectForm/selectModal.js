import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import SectionFormDelete from "../SectionFormDelete"
import "./SectionForm.css"

function SelectModal ({ section, sectionId, projectId, formType }) {
  const dispatch = useDispatch()
  const { closeModal } = useModal()

  const [name, setName] = useState(section?.name)
  const [disabled, setDisabled] = useState(true)

  const [editSectionNameToggle, setEditSectionNameToggle] = useState(false)
  const [gutsToggle, setGutsToggle] = useState(false)

  const toggleSectionName = () => {
    setEditSectionNameToggle(!editSectionNameToggle)
    setGutsToggle(true)
  }

  const toggleGuts = () => {
    setGutsToggle(!gutsToggle)
  }

  useEffect(() => {
    if (name && name.length > 0) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [name])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("button clicked")

    section = {
      ...section,
      name,
      sectionId,
      projectId
    }
  }

  return (
    <>
    <div className="section-form-overdiv">
      {editSectionNameToggle ?
      <form
        onSubmit={handleSubmit}
        // encType="multipart/form-data"
      >

      {formType === "Update" ?
      <div>
        <div>
          <input
            className="section-name-input-div"
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder={section.name}
          />
        </div>
        {errors.name && (<div className="errorsDiv">{errors.name}</div>)}
      </div>
      :
      <div>
        <div>
          <input
            className="section-name-input-div"
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder={"Name this section"}
          />
        </div>
        {errors.name && (<div className="errorsDiv">{errors.name}</div>)}
      </div>}

      {isLoaded && sectionsArr.length > 0 && project.view === "List" && taskArr.length > 0 && (
      <>
      <div className="task-card-center-div">
        <div>
          <h1>{project.name}</h1>
        </div>

        <DragDropContext
          onDragEnd={handleDragEnd}
        >
          <Droppable
            droppableId={`${sectionsArr[0].id}`}
          >
            {(provided) => (
              <div
                //! GON BE HONEST, DON'T KNOW EXACTLY HOW TO USE THESE
                ref = {provided.innerRef}
                {...provided.droppableProps}
              >
              {taskArr.map((task, index) => (
                <div key={task.id} className="task-update-button">
                <TaskFormUpdate key={task.id} task={task} index={index}/>
              </div>
              ))}
              {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

          <div className="add-task-button-div">
            <TaskFormCreate projectId={projectId} sectionId={sectionsArr[0].id}/>
          </div>

      </div>

      <div className='whole-ass-footer'>
			  <Footer />
		  </div>
      </>
      )}

      </form>
      :
      formType === "Create" ?
      <button
        className="section-title-create-button"
        onClick={toggleSectionName}
        onMouseEnter={toggleGuts}
        onMouseLeave={toggleGuts}
      >
        <div className="section-form-create-button-div">Add Section</div>
      </button>
      :
      <span>
        <button className="section-title-edit-button" onClick={toggleSectionName}   aria-label={`${section.name} section. Click to edit`}>
          {section.name}
        </button>

        <span className="section-form-delete-button">
        <OpenModalButton
          buttonText={<i class="fa-regular fa-trash-can fa-xl"></i>}
          modalComponent={<SectionFormDelete sectionId={sectionId}/>}
        />
        </span>
      </span>
      }
    </div>
    </>
  )
}

export default SelectModal
