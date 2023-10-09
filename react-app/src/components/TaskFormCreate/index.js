import TaskForm from "../TaskForm";

function TaskFormCreate({ projectId, sectionId }) {

  let task = {
    name: "",
    description: "",
    labels: "",
    sectionId,
    projectId
  }

  return (
    <TaskForm task={task} formType={"Create"} />
  )
}

export default TaskFormCreate
