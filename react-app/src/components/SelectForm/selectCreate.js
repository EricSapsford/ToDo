import { useState } from "react";
import TaskForm from "../TaskForm";

function SelectFormCreate({ projectId, sectionId }) {

  const [createTaskToggle, setCreateTaskToggle] = useState(false)

  const toggleCreateSelectForm = () => {
    setCreateTaskToggle(!createTaskToggle)
  }


  let select = {
    name: "",
    time: "",
    alignment: "",
    sectionId,
    projectId
  }

  return (
    <>
      {/* <TaskForm task={task} formType={"Create"} /> */}
      {createTaskToggle ?
        <>
          <TaskForm select={select} formType={"Create"} />
          <button
            onClick={toggleCreateSelectForm}
            className="task-form-create-cancel-button"
          >
            Cancel
          </button>
        </>
        :
          <button
            className="task-form-create-add-task-button"
            onClick={toggleCreateSelectForm}
          >
            <i class="fa-solid fa-plus"></i> Add task
          </button>
        }
    </>
  )
}

export default SelectFormCreate
