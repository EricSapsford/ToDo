import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";

import { login } from "../../store/session";
import { useHistory } from "react-router-dom";

function selectSplash(userInfo) {
	const dispatch = useDispatch();
  const history = useHistory();

	const firstName = userInfo.firstName
	const lastName = userInfo.lastName
	const username = userInfo.username

	const [email, setEmail] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

  const [toggleForm, setToggleForm] = useState(true)

  const clickToggleForm = () => {
    setToggleForm(!toggleForm)
		setErrors([])
  }

	const user = {
		username,
		email,
		password,
		firstName,
		lastName
	}


  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (!data.id) {
      setErrors(data);
    } else {
      console.log("login Project fetch going off")
      history.push("/projects")
      // await dispatch(projectActions.getAllProjectsForAUserThunk(data.id));
    }
  };

  const handleDemoUser = async (e) => {
    e.preventDefault()
    let demoEmail = 'user@demo.io'
    let demoPassword = 'password'
    const data = await dispatch(login(demoEmail, demoPassword));
    closeModal()
    history.push("/projects")
  };


	return (
		<>
    {
    <div className="section-form-overdiv">

      <form
        onSubmit={handleSubmit}
        // encType="multipart/form-data"
      >

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
      </div>

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

    </div>
    }
		</>
	);
}

export default selectSplash;
