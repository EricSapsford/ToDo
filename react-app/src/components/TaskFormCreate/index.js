import TaskForm from "../TaskForm";

function TaskFormCreate({ projectId }) {

  let task = {
    name: "",
    description: "",
    labels: "",
    sectionId: null,
    projectId
  }

  return (
    <TaskForm task={task} formType={"Create"} />
  )
}

export default TaskFormCreate
