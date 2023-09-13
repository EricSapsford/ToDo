import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as taskActions from "../../store/task";

function TaskForm ({ task, formType }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const { closeModal } = useModal()
  const { projectId } = useParams()

  const [name, setName] = useState(task?.name)
  const [description, setDescription] = useState(task?.description)
  const [labelChunk, setLabelChunk] = useState("")
  const [labels, setLabels] = useState(task?.labels)
  const [sectionId, setSectionId] = useState(task?.sectionId)

  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    task = {
      ...task,
      name,
      description,
      labels,
      sectionId: null,
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
        // console.log("This is what you're sending", task)
        const res = await dispatch(taskActions.updateTaskThunk(task));
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
    }
  }

  const appendLabel = (e) => {
    if (labels === "") {
      setLabels(labelChunk)
    } else {
      setLabels(`${labels},${labelChunk}`)
    }
    // console.log("Current Label String", labels)
  }


  return (
    <>
      <form
        onSubmit={handleSubmit}
        // encType="multipart/form-data"
      >

        {formType === "Create" ?
          <div>
            Add Task
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
          <div>
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
          <button>
            {formType === "Create" ? "Add Task" : "Save"}
          </button>
        </div>

      </form>
    </>
  )
}

export default TaskForm
