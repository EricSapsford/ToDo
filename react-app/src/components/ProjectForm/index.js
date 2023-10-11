import { useState } from "react";
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
        {res.errors ? setErrors(res.errors) : setErrors([]); }
        if (res.ok) {
          setErrors([]);
          history.push(`projects/${res.project.id}`)
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
    <div className="login-modal-div">
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
          <div className="inputs-and-login-button">
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
          <div className="modal-select-div">
            <select
              onChange={(e) => setColor(e.target.value)}
              value={color}
              className={formType === "Create" ? "create-project-select" : "update-project-select"}
              required
              >
              <option value="" disabled selected>(select color)</option>
              <option key={"BerryRed"} value={"BerryRed"}>BerryRed</option>
              <option key={"Red"} value={"Red"}>Red</option>
              <option key={"Orange"} value={"Orange"}>Orange</option>
              <option key={"Yellow"} value={"Yellow"}>Yellow</option>
              <option key={"OliveGreen"} value={"OliveGreen"}>OliveGreen</option>
              <option key={"LimeGreen"} value={"LimeGreen"}>LimeGreen</option>
              <option key={"Green"} value={"Green"}>Green</option>
              <option key={"MintGreen"} value={"MintGreen"}>MintGreen</option>
              <option key={"Teal"} value={"Teal"}>Teal</option>
              <option key={"SkyBlue"} value={"SkyBlue"}>SkyBlue</option>
              <option key={"LightBlue"} value={"LightBlue"}>LightBlue</option>
              <option key={"Blue"} value={"Blue"}>Blue</option>
              <option key={"Grape"} value={"Grape"}>Grape</option>
              <option key={"Violet"} value={"Violet"}>Violet</option>
              <option key={"Lavender"} value={"Lavender"}>Lavender</option>
              <option key={"Magenta"} value={"Magenta"}>Magenta</option>
              <option key={"Salmon"} value={"Salmon"}>Salmon</option>
              <option key={"Charcoal"} value={"Charcoal"}>Charcoal</option>
              <option key={"Grey"} value={"Grey"}>Grey</option>
              <option key={"Taupe"} value={"Taupe"}>Taupe</option>
            </select>
          </div>
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
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M17.333 4.001A2.667 2.667 0 0 1 20 6.668v10.667A2.667 2.667 0 0 1 17.333 20H6.667A2.667 2.667 0 0 1 4 17.335V6.668A2.667 2.667 0 0 1 6.667 4h10.666Zm-.083 1H6.75a1.75 1.75 0 0 0-1.745 1.62L5 6.75v10.5a1.75 1.75 0 0 0 1.62 1.745l.13.005h10.5a1.75 1.75 0 0 0 1.745-1.62l.005-.13v-10.5a1.75 1.75 0 0 0-1.62-1.745l-.13-.005Zm-.75 7c0-.276-.183-.5-.41-.5H7.91l-.074.008c-.191.043-.336.247-.336.492 0 .276.183.5.41.5h8.18l.074-.008c.191-.042.336-.246.336-.492Zm-.41 3.5c.227 0 .41.224.41.5 0 .246-.145.45-.336.492l-.073.008H7.909c-.226 0-.409-.224-.409-.5 0-.245.145-.45.336-.492l.073-.008h8.182Zm.41-7.5c0-.276-.183-.5-.41-.5H7.91l-.074.008c-.191.043-.336.247-.336.492 0 .276.183.5.41.5h8.18l.074-.008c.191-.042.336-.246.336-.492Z"
                    clip-rule="evenodd"
                    >
                  </path>
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
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M17.333 4.001A2.667 2.667 0 0 1 20 6.668v10.667A2.667 2.667 0 0 1 17.333 20H6.667A2.667 2.667 0 0 1 4 17.335V6.668A2.667 2.667 0 0 1 6.667 4h10.666Zm-.083 1H6.75a1.75 1.75 0 0 0-1.745 1.62L5 6.75v10.5a1.75 1.75 0 0 0 1.62 1.745l.13.005h10.5a1.75 1.75 0 0 0 1.745-1.62l.005-.13v-10.5a1.75 1.75 0 0 0-1.62-1.745l-.13-.005Zm-4.758 2.836C12.45 7.646 12.245 7.5 12 7.5c-.276 0-.5.183-.5.41v8.181l.008.074c.042.19.247.335.492.335.276 0 .5-.183.5-.409V7.91l-.008-.073ZM8 7.5c.245 0 .45.145.492.336l.008.073v8.182c0 .226-.224.41-.5.41-.245 0-.45-.145-.492-.336l-.008-.074V7.91c0-.226.224-.409.5-.409Zm8.492.336C16.45 7.646 16.245 7.5 16 7.5c-.276 0-.5.183-.5.41v8.181l.008.074c.042.19.247.335.492.335.276 0 .5-.183.5-.409V7.91l-.008-.073Z"
                  clip-rule="evenodd"
                  >
                </path>
                </svg>
                <div>Board</div>
              </label>
              </div>
            </div>
        </div>

        <div className="inputs-and-login-button">
          <button>
            {formType === "Create" ? "Add" : "Save"}
          </button>
        </div>
      </form>
    </div>
    </>
  )
}

export default ProjectForm
