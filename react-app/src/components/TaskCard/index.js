import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import TaskcardCard from "../TaskcardCard";
import TaskFormCreate from "../TaskFormCreate";
import TaskFormDelete from "../TaskFormDelete";
import TaskFormUpdate from "../TaskFormUpdate";

import * as taskActions from "../../store/task";

import "./TaskCard.css"

function TaskCard() {
const dispatch = useDispatch();
const { projectId } = useParams();
console.log(projectId)

const taskState = useSelector(state => state.tasks ? state.tasks : {})
const taskArr = Object.values(taskState.allTasks)

useEffect(() => {
  dispatch(taskActions.getAllTasksForAProjectThunk(projectId))
}, [dispatch, projectId])

return (
  <>
    <div className="task-card-center-div">
      {taskArr.map((task) => (
        <div key={task.id} className="task-update-button">
          <TaskcardCard task={task} projectId={projectId}/>
          <OpenModalButton
            buttonText={"Edit"}
            modalComponent={<TaskFormUpdate task={task}/>}
          />
          <OpenModalButton
            buttonText={"Delete"}
            modalComponent={<TaskFormDelete taskId={task.id}/>}
          />
        </div>
      ))}

      <OpenModalButton
        buttonText={"Add Task"}
        modalComponent={<TaskFormCreate projectId={projectId}/>}
      />
    </div>
  </>
)
}

export default TaskCard
