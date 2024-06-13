import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as projectActions from "../../store/project";
import "./ProjectForm.css"

function ProjectForm({ project, formType }) {
  // console.log("project coming in from update", project)
  // console.log("and here's the project id", project.id)
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal()

  const [name, setName] = useState(project?.name)
  const [color, setColor] = useState(project?.color)
  const [view, setView ] = useState(project.view ? project.view : "List")

  const [errors, setErrors] = useState([]);
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (name.length > 0 && color !== "") {
      setDisabled(false)
    }
  }, [name, color])

  const handleSubmit = async (e) => {
    e.preventDefault();

    project = {
      ...project,
      name,
      color,
      view,
      projectId: project.id
    }

    if (formType === "Create") {

      try {
        // console.log("This is what you're sending", project)
        const res = await dispatch(projectActions.createProjectThunk(project));
        closeModal();
        // console.log("This is what's coming back in the component", res)
        console.log("res id", res.id)
        {res.errors ? setErrors(res.errors) : setErrors([]); }
        if (res.id) {
          setErrors([]);
          history.push(window.location.pathname === "/projects" ? `projects/${res.id}` : `${res.id}`)
        } else {
          return res
        }
      } catch (res) {
        const data = res
        if (data && data.errors) {
          setErrors(data.errors);
        }
      }
    } else if (formType === "Update") {

      try {
        // console.log("This is what you're sending", project)
        const res = await dispatch(projectActions.updateProjectThunk(project));
        closeModal();
        // console.log("This is what's coming back in the component", res)
        {res.errors ? setErrors(res.errors) : setErrors([]); }
        if (res.project.id) {
          setErrors([]);
        } else {
          return res
        }
      } catch (res) {
        const data = res
        if (data && data.errors) {
          setErrors(data.errors);
        }
      }
    }
  }

  return (
    <>
    <div className="project-form-modal-div">
      <form
        onSubmit={handleSubmit}
        // encType="multipart/form-data"
        >

        {formType === "Create" ?
        <div className="log-in-title">
          <h1>Add Project</h1>
        </div>
        :
        <div className="log-in-title">
          <h1>Edit</h1>
        </div>
        }

        <div>
          <div className="project-form-name-input">
            <input
              className={formType === "Create" ? "create-project-input" : "update-project-input"}
              type="text"
              name="name"
              size={40}
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Name"
              required
              />
          </div>
          {errors.name && (<div className="errorsDiv">{errors.name}</div>)}
        </div>

        <div>
          {errors.color && (<div className="errorsDiv">{errors.color}</div>)}
        </div>

        <div className="project-view-radio-overdiv">
            <div className="project-view-radio-divs">
            <div
              className="project-input-radio-div"
              id={view === "List" ? "project-input-active" : ""}
            >
              <input
                className="project-list-input"
                id="list"
                type="radio"
                name="view"
                value="List"
                onChange={(e) => setView(e.target.value)}
                defaultChecked
              />
              <label for="list" className="project-radio-label">
                <svg
                  className="svg-demo"
                  width={24}
                  height={25}
                  fill="none"
                  viewBox="0 0 24 25"
                >
                </svg>
                <div>
                  List
                </div>
              </label>
            </div>
            <div
              className="project-input-radio-div"
              id={view === "Board" ? "project-input-active" : ""}
            >
              <input
                className="project-board-input"
                id="board"
                type="radio"
                name="view"
                value="Board"
                onChange={(e) => setView(e.target.value)}
              />
              <label for="board" className="project-radio-label">
                <svg
                  width={24}
                  height={25}
                  fill="none"
                  viewBox="0 0 24 25"
                >
                </svg>
                <div>Board</div>
              </label>
              </div>
            </div>
        </div>

        <div className="project-form-add-cancel-buttons">
          <button
            className="project-form-add-button"
            disabled={disabled}
          >
            {formType === "Create" ? "Add" : "Save"}
          </button>
          <button
            className="project-form-cancel-button"
            type="button"
            onClick={() => closeModal()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
    </>
  )
}

export default ProjectForm
