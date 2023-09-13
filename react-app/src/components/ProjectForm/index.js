import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as projectActions from "../../store/project";

function ProjectForm({ project, formType }) {
  // console.log("project coming in from update", project)
  // console.log("and here's the project id", project.id)
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal()

  const [name, setName] = useState(project?.name)
  const [color, setColor] = useState(project?.color)
  // const [view, setView ] = useState(project?.view)

  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    project = {
      ...project,
      name,
      color,
      view: "False",
      projectId: project.id
    }

    if (formType === "Create") {

      try {
        // console.log("This is what you're sending", project)
        const res = await dispatch(projectActions.createProjectThunk(project));
        closeModal();
        // console.log("This is what's coming back in the component", res)
        {res.errors ? setErrors(res.errors) : setErrors([]); }
        if (res.project.id) {
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
      <form
        onSubmit={handleSubmit}
        // encType="multipart/form-data"
      >

        {formType === "Create" ?
        <div>
          Add Project
        </div>
        :
        <div>
          Edit
        </div>
        }

        <div>
          <div>
            <input
              className={formType === "Create" ? "create-project-input" : "update-project-input"}
              type="text"
              name="name"
              size={60}
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Name"
              required
            />
          </div>
          {errors.name && (<div className="errorsDiv">{errors.name}</div>)}
        </div>

        <div>
          <div>
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

        <div>
          <button>
            {formType === "Create" ? "Add" : "Save"}
          </button>
        </div>
      </form>
    </>
  )
}

export default ProjectForm
