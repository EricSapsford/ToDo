import { useState } from "react";
import TaskForm from "../TaskForm";

function TaskFormCreate({ projectId, sectionId }) {

  const [createTaskToggle, setCreateTaskToggle] = useState(false)

  const toggleCreateTaskForm = () => {
    setCreateTaskToggle(!createTaskToggle)
  }


  let task = {
    name: "",
    description: "",
    labels: "",
    // dueDate: "",
    sectionId,
    projectId
  }

  return (
    <>
      {/* <TaskForm task={task} formType={"Create"} /> */}
      {createTaskToggle ?
        <>
          <TaskForm task={task} formType={"Create"} />
          <button
            onClick={toggleCreateTaskForm}
            className="task-form-create-cancel-button"
          >
            Cancel
          </button>
        </>
        :
          <button
            className="task-form-create-add-task-button"
            onClick={toggleCreateTaskForm}
          >
            <i class="fa-solid fa-plus"></i> Add task
          </button>
        }
    </>
  )
}

export default TaskFormCreate
