import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import TaskFormDelete from "../TaskFormDelete";
import * as taskActions from "../../store/task";
import "./TaskForm.css"

function TaskForm ({ task, formType }) {
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  // const { projectId } = useParams()

  // use this over useParam so this component works when on the "today" page
  const projectId = task.projectId

  const [name, setName] = useState(task?.name)
  const [description, setDescription] = useState(task?.description)
  const [labelChunk, setLabelChunk] = useState("")
  const [labels, setLabels] = useState(task?.labels)
  const [dueDate, setDueDate] = useState(task?.dueDate)
  // const [sectionId, setSectionId] = useState(task?.sectionId)

  const [editTaskToggle, setEditTaskToggle] = useState(formType === "Create" ? true : false)
  const [disabled, setDisabled] = useState(true)
  const [errors, setErrors] = useState([]);

  const sectionState = useSelector(state => state.sections ? state.sections : {})
  const sectionArr = Object.values(sectionState.allSections)

  const projectView = useSelector(state => state.projects ? state.projects.allProjects[projectId].view : {})

  let labelsArr = task.labels.split(",")

  const dateObj = {
    "Jan": "01",
    "Feb": "02",
    "Mar": "03",
    "Apr": "04",
    "May": "05",
    "Jun": "06",
    "Jul": "07",
    "Aug": "08",
    "Sep": "09",
    "Oct": "10",
    "Nov": "11",
    "Dec": "12"
  }
  let dueDateArr = [];
  let day = "";
  // let valueChunk = "";

  if (task.dueDate) {
    dueDateArr = task.dueDate.split(" ")
    day = dueDateArr[0].slice(0, -1)
  }

  // if (dueDateArr.length !== 0) {
  //   valueChunk = `${dueDateArr[3]}-${dateObj[dueDateArr[2]]}-${dueDateArr[1]}`
  // }

  // useEffect(() => {
  //   console.log("dueDate", dueDate)
  //   if (task.dueDate) {
  //     dueDateArr = task.dueDate.split(" ")
  //     day = dueDateArr[0].slice(0, -1)
  //   }

  //   if (dueDateArr.length !== 0) {
  //     valueChunk = `${dueDateArr[3]}-${dateObj[dueDateArr[2]]}-${dueDateArr[1]}`
  //   }
  // }, [dueDate, setDueDate])




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
      dueDate,
      taskId: task.id,
    }

    if (formType === "Create") {

      try {
        setName("")
        setDescription("")
        setLabelChunk("")
        setLabels("")
        // setDueDate("")
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
        // console.log("This is what you're sending", task)
        const res = await dispatch(taskActions.updateTaskThunk(task));
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
      setLabelChunk("")
    } else {
      setLabels(`${labels},${labelChunk}`)
      setLabelChunk("")
    }
    // console.log("Current Label String", labels)
  }

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
              className="task-form-input"
              type="text"
              name="name"
              size={projectView === "List" ? 60 : 32}
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
              className="task-form-input"
              rows={projectView === "List" ? 8 : 1}
              cols={projectView === "List" ? 56 : 30}
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
          <div className="task-form-label-div">
            <input
              className="task-form-label-input"
              type="text"
              name="labels"
              size={projectView === "List" ? 60 : 23}
              onChange={(e) => setLabelChunk(e.target.value)}
              value={labelChunk}
              placeholder={formType === "Create" ? "Labels (optional)" : "Labels"}
            />
            <div>
              <button
                className="add-label-button"
                onClick={appendLabel}
                type="button"
                style={formType === "Update" ? {display: "block"} : {}}
                disabled={disabled}
              >
                Add Label
              </button>
            </div>
          </div>
          {errors.name && (<div className="errorsDiv">{errors.name}</div>)}
        </div>

        <div>
          <div className="task-form-added-label-div" size={60}>
            {labels.split(",").map((label) => (
            <div className={labels.length === 0 ? "" : "task-form-added-label-span"}>{label}</div>
            ))}
          </div>
        </div>

        {/* <div>
          <div>
            Due date:
            <input
              className="task-form-input"
              type="date"
              name="date"
              size={projectView === "List" ? 60 : 32}
              onChange={(e) => setDueDate(e.target.value)}
              value={valueChunk}
            />
            (optional)
          </div>
          {errors.name && (<div className="errorsDiv">{errors.name}</div>)}
        </div> */}

        <div className="task-form-buttons-div">

          <div>
            <button
              className="task-form-submit-button"
              style={formType === "Update" ? {display: "block"} : {}}
              >
              {formType === "Create" ? "Add Task" : <i class="fa-regular fa-floppy-disk fa-2xl"></i>}
            </button>
          </div>

          {formType === "Update" ?
          <div>
            <button
              className="task-form-update-cancel-button"
              onClick={toggleUpdateForm}
              style={formType === "Update" ? {display: "block"} : {}}
              >
              <i class="fa-solid fa-x fa-2xl"></i>
            </button>
          </div>
          :
          null
          }
        </div>

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
          modalComponent={<TaskFormDelete task={task}/>}
        />
      </div>

      <div className="task-card-card-description-div">
        {task.description}
      </div>

      {labels === "" ?
      null
      :
      <div className="task-card-card-label-div">
        {labelsArr.map((label) => (
          <span className="task-card-card-label-span">{label}</span>
        ))}
      </div>
      }

      <div>
        {dueDateArr.length > 0 ? <span>Due {day}, {dueDateArr[2]} {dueDateArr[1]}</span> : null}
      </div>
    </div>
    }
    </>
  )
}

export default TaskForm
