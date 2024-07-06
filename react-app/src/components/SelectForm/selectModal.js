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
    <>
      <button onClick={toggleMenu} className="projects-button-actual">
        Projects
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div>
              <div className="projects-menu-overdiv">

                <div className="projects-today-link">
                  <Link
                    to={`/projects`}
                    style={{textDecoration: "none"}}
                  >
                    <div className="project-name-div">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g>
                        <path
                          d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v2.5h-15V6A1.5 1.5 0 0 1 6 4.5z"
                          opacity=".1"
                        >
                        </path>
                        <path
                          d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
                        >
                        </path>
                        <text
                          className="project-today-svg-text"
                          font-size="9"
                          transform="translate(4 2)"
                        >
                          <tspan x="8" y="15" text-anchor="middle">{todaysDate}</tspan>
                        </text>
                      </g>
                    </svg>
                      <div>Today</div>
                    </div>
                  </Link>
                </div>

              <div className="projects-title-and-add-button-div">
                <h3>
                  Projects
                  <span className="create-project-button-div">
                    <OpenModalButton
                    buttonText={<i class="fa-solid fa-plus"></i>}
                    modalComponent={<ProjectFormCreate />}
                    />
                  </span>
                </h3>
              </div>
                {projArr.map((project) => (
                  <div className="project-update-button" key={project.id}
                  >
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="user-control-login-buttons">
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
              />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
              />
          </div>
        )}
      </ul>
    </>
    </>
  )
}

export default SelectModal
