import React from "react";

function TaskcardCard({ task }) {

  return (
    <>
      <div>
        <span>{task.name}</span>
        <span>{task.description}</span>
        <span>{task.labels}</span>
        <span>{task.id}</span>
      </div>
    </>
  )

}

export default TaskcardCard
