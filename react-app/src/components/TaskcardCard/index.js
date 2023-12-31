import React from "react";
import OpenModalButton from "../OpenModalButton";
import TaskFormDelete from "../TaskFormDelete";
import TaskFormUpdate from "../TaskFormUpdate";
import "./TaskcardCard.css"

function TaskcardCard({ task, projectId }) {

  let labelsArr = task.labels.split(",")

  let dueDateArr = [];
  let day = "";

  if (task.dueDate) {
    dueDateArr = task.dueDate.split(" ")
    day = dueDateArr[0].slice(0, -1)
  }

  return (
    <>
      <div className="task-card-card-overdiv">
        {/* <svg width="24" height="24">
          <path fill="currentColor" d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"></path>
        </svg> */}
        <div className="task-card-card-first-row-div">
          <div className="task-card-card-name-div">
            {task.name}
          </div>
            {/* <OpenModalButton
              buttonText={<i class="fa-solid fa-pen-to-square fa-xl"></i>}
              modalComponent={<TaskFormUpdate task={task}/>}
            /> */}
            {/* <button
              className="update-task-button"
              onClick={toggleUpdateForm}
              // style={{position: "relative", top: "-5px"}}
            >
              <i class="fa-solid fa-pen-to-square fa-xl"></i>
            </button> */}
            <OpenModalButton
              buttonText={<i class="fa-regular fa-trash-can fa-xl"></i>}
              modalComponent={<TaskFormDelete taskId={task.id}/>}
            />
        </div>
        <div className="task-card-card-description-div">{task.description}</div>
        <div className="task-card-card-label-div">Labels:
          {labelsArr.map((label) => (
            <span className="task-card-card-label-span">{label}</span>
          ))}
        </div>
        <div>
          {dueDateArr.length > 0 ? <span>{day} {dueDateArr[2]} {dueDateArr[1]}</span> : null}
        </div>
      </div>
    </>
  )

}

export default TaskcardCard
