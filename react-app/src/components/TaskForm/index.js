import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import TaskFormDelete from "../TaskFormDelete";
import * as taskActions from "../../store/task";
import "./TaskForm.css"

function TaskForm ({ task, formType }) {
  const dispatch = useDispatch()
  const { closeModal } = useModal()

  const [name, setName] = useState(task?.name)
  const [description, setDescription] = useState(task?.description)
  const [labelChunk, setLabelChunk] = useState("")
  const [labels, setLabels] = useState(task?.labels)
  // const [sectionId, setSectionId] = useState(task?.sectionId)

  const [editTaskToggle, setEditTaskToggle] = useState(formType === "Create" ? true : false)
  const [disabled, setDisabled] = useState(true)
  const [errors, setErrors] = useState([]);

  const sectionState = useSelector(state => state.sections ? state.sections : {})
  const sectionArr = Object.values(sectionState.allSections)

  let labelsArr = task.labels.split(",")

  let dueDateArr = [];
  let day = "";

  if (task.dueDate) {
    dueDateArr = task.dueDate.split(" ")
    day = dueDateArr[0].slice(0, -1)
  }

  useEffect(() => {
    if (labelChunk && labelChunk.length > 0) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [labelChunk])

  const handleSubmit = async (e) => {
    e.preventDefault();

    task = {
      ...task,
      name,
      description,
      labels,
      taskId: task.id,
    }

    if (formType === "Create") {

      try {
        setName("")
        setDescription("")
        setLabelChunk("")
        setLabels("")
        // console.log("This is what you're sending", task)
        const res = await dispatch(taskActions.createTaskThunk(task));
        closeModal();
        // console.log("This is what's coming back in the component", res)
        {res.errors ? setErrors(res.errors) : setErrors([]); }
        if (res.task.id) {
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
    } else if (formType === "Update") {

      try {
        setEditTaskToggle(!editTaskToggle)
        const res = await dispatch(taskActions.updateTaskThunk(task));
        {res.errors ? setErrors(res.errors) : setErrors([]); }
        if (res.task.id) {
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

  const appendLabel = (e) => {
    if (labels === "") {
      setLabels(labelChunk)
      setLabelChunk("")
    } else {
      setLabels(`${labels},${labelChunk}`)
      setLabelChunk("")
    }
    // console.log("Current Label String", labels)
  }

  // const toggleFormToggle = () => {
  //   setFormToggle(!edit)
  // }

  const toggleUpdateForm = () => {
    setEditTaskToggle(!editTaskToggle)
  }


  return (
    <>
    {editTaskToggle ?
    <div>
      <form
        onSubmit={handleSubmit}
        // encType="multipart/form-data"
        >

        <div>
          <div>
            <input
              className={formType === "Create" ? "create-project-input" : "update-project-input"}
              type="text"
              name="name"
              size={formType === "Create" ? 60 : 36}
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Task name"
              required
            />
          </div>
          {errors.name && (<div className="errorsDiv">{errors.name}</div>)}
        </div>

        <div>
          <div>
            <textarea
              rows={formType === "Create" ? 8 : 4}
              cols={formType === "Create" ? 56 : 35}
              id="comments"
              name="description"
              onChange={e => setDescription(e.target.value)}
              value={description}
              placeholder="Description (optional)"
              />
          </div>
          {errors.description && (<div className="errorsDiv">{errors.description}</div>)}
        </div>

        <div>
          <div>
            <input
              id="label-input-field"
              className="create-task-label-input"
              type="text"
              name="labels"
              // size={formType === "Create" ? 60 : 36}
              onChange={(e) => setLabelChunk(e.target.value)}
              value={labelChunk}
              placeholder="Labels"
            />
            <span>
              <button
                className="add-label-button"
                onClick={appendLabel}
                type="button"
                style={formType === "Update" ? {display: "block"} : {}}
                disabled={disabled}
              >
                Add Label
              </button>
            </span>
          </div>
          {errors.name && (<div className="errorsDiv">{errors.name}</div>)}
        </div>

        <div>
            <span className="task-form-add-label-label">Labels:</span>
          <div className="task-form-added-label-div" size={60}>
            {labels.split(",").map((label) => (
            <div className={labels.length === 0 ? "" : "task-form-added-label-span"}>{label}</div>
            ))}
          </div>
        </div>

        <div>
          <button
            style={formType === "Update" ? {display: "block"} : {}}
          >
            {formType === "Create" ? "Add Task" : "Save"}
          </button>
        </div>

        {formType === "Update" ?
        <button
          onClick={toggleUpdateForm}
          style={formType === "Update" ? {display: "block"} : {}}
        >
          Cancel
        </button>
        :
        null
        }

      </form>
    </div>
    :
    <div className="task-card-card-overdiv">
      {/* <svg width="24" height="24">
      <path fill="currentColor" d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"></path>
      </svg> */}

      <div className="task-card-card-first-row-div">
        <div className="task-card-card-name-div">
          {task.name}
        </div>
        <button
          className="update-task-button"
          onClick={toggleUpdateForm}
        >
          <i class="fa-solid fa-pen-to-square fa-xl"></i>
        </button>
        <OpenModalButton
          buttonText={<i class="fa-regular fa-trash-can fa-xl"></i>}
          modalComponent={<TaskFormDelete taskId={task.id}/>}
        />
      </div>

      <div className="task-card-card-description-div">
        {task.description}
      </div>

      <div className="task-card-card-label-div">Labels:
        {labelsArr.map((label) => (
          <span className="task-card-card-label-span">{label}</span>
        ))}
      </div>

      <div>
        {dueDateArr.length > 0 ? <span>{day} {dueDateArr[2]} {dueDateArr[1]}</span> : null}
      </div>
    </div>
    }
    </>
  )
}

export default TaskForm
