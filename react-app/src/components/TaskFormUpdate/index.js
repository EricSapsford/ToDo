import TaskForm from "../TaskForm";

function TaskFormUpdate({task}) {

  return (
    <>
      <TaskForm task={task} formType={"Update"} />
    </>
  )
}

export default TaskFormUpdate
