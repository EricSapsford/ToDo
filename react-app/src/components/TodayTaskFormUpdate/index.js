import TaskForm from "../TaskForm";

function TodayTaskFormUpdate({task}) {

  return (
    <>
        <TaskForm task={task} formType={"Update"} />
    </>
  )
}

export default TodayTaskFormUpdate
