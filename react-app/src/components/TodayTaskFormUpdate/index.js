import TaskForm from "../TaskForm";

function TodayTaskFormUpdate({task}) {

  return (
    <>
      <div className="task-card-card-overdiv">
        <TaskForm task={task} formType={"Update"} />
      </div>
    </>
  )
}

export default TodayTaskFormUpdate
