import React from "react";
import "./TaskcardCard.css"

function TaskcardCard({ task, projectId }) {

  return (
    <>
      <div className="task-card-card-overdiv">
        <div>{task.name}</div>
        <div>{task.description}</div>
        <div>Labels: {task.labels}</div>
        {/* <span>{task.id}</span> */}
      </div>
    </>
  )

}

export default TaskcardCard
