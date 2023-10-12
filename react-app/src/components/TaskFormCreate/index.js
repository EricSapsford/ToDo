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
    sectionId,
    projectId
  }

  return (
    <>
      {/* <TaskForm task={task} formType={"Create"} /> */}
      {createTaskToggle ?
        <>
          <TaskForm task={task} formType={"Create"} />
          <button onClick={toggleCreateTaskForm}>
            Cancel
          </button>
        </>
        :
          <button onClick={toggleCreateTaskForm}>
            + Create task
          </button>
        }
    </>
  )
}

export default TaskFormCreate
