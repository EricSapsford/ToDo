import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import TaskcardCard from "../TaskcardCard";

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
        <div key={task.id}>
          <TaskcardCard task={task} />
        </div>
      ))}
    </div>
  </>
)
}

export default TaskCard
