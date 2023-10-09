import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
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

  const [errors, setErrors] = useState([]);

  const sectionState = useSelector(state => state.sections ? state.sections : {})
  const sectionArr = Object.values(sectionState.allSections)

  console.log("section test", sectionArr[0].id);

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
        console.log("This is what you're sending", task)
        const res = await dispatch(taskActions.updateTaskThunk(task));
        closeModal();
        console.log("This is what's coming back in the component", res)
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


  return (
    <>
    <div className="login-modal-div">
      <form
        onSubmit={handleSubmit}
        // encType="multipart/form-data"
        >

        {formType === "Create" ?
          <div className="log-in-title">
            <h1>Add Task</h1>
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
          <div className="task-form-textarea">
            <textarea
              rows="8" cols="56"
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
          <div className="task-form-label-input-div">
            <input
              id="label-input-field"
              className={formType === "Create" ? "create-project-input" : "update-project-input"}
              type="text"
              name="labels"
              size={60}
              onChange={(e) => setLabelChunk(e.target.value)}
              value={labelChunk}
              placeholder="Labels"
            />
            <span>
              <button onClick={appendLabel} type="button">Add Label</button>
            </span>
          </div>
          {errors.name && (<div className="errorsDiv">{errors.name}</div>)}
        </div>

        <div>
            <span className="task-form-add-label-label">Labels:</span>
          <div className="task-form-added-label-div" size={60}>
            {labels.split(",").map((label) => (
            <div className="task-form-added-label-span">{label}</div>
          ))}
          </div>
        </div>

        <div className="inputs-and-login-button">
          <button>
            {formType === "Create" ? "Add Task" : "Save"}
          </button>
        </div>

      </form>
    </div>
    </>
  )
}

export default TaskForm
