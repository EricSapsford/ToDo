import TaskForm from "../TaskForm";

function TaskFormUpdate({task}) {

  return (
    <>
      <div>
        <TaskForm task={task} formType={"Update"} />
      </div>
    </>
  )
}

export default TaskFormUpdate
