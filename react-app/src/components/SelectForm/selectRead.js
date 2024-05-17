import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

import TodayTaskFormUpdate from '../TodayTaskFormUpdate';
import Footer from '../Footer';


import "./Today.css"

function selectRead () {

  const [ isLoaded, setIsLoaded ] = useState(false)

  const taskState = useSelector(state => state.tasks ? state.tasks : {})
  const taskArr = Object.values(taskState.todaysTasks)

  const projectState = useSelector(state => state.projects ? state.projects : {})
  const projectArr = Object.values(projectState.allProjects)


  let projectIdSet = new Set;
  let projectNameObj = {}

  return (
    <>
      {isLoaded && projectIdSet.size > 0 && projectArr.length !== 0 && (
          <div className='task-card-center-div'>
            <div>
              <h1>Today's tasks</h1>
            </div>

            <div className='today-project-center-div'>
              <div className='today-project-column-overdiv'>
                {[...projectIdSet].map((projectId) =>(
                <div key={projectId} className='today-project-header'>
                  <Link
                    to={`/projects/${projectId}`}
                    style={{textDecoration: "none"}}
                  >
                    <h2>{projectNameObj[projectId]}</h2>
                  </Link>
                  {taskArr.map((task) => (
                    task.projectId === projectId ?
                    <div key={task.id} className="task-update-button">
                      <TodayTaskFormUpdate task={task} />
                    </div>
                  :
                    null
                  ))}
                  {/* <div className="add-task-button-div">
                    <TaskFormCreate projectId={0} sectionId={0}/>
                  </div> */}
                </div>
                ))}
              </div>
            </div>
          </div>
      )}

      {isLoaded && projectIdSet.size === 0 && (
    <>
    <div className="task-card-card-overdiv">

      <div className="task-card-card-first-row-div">
        <div className="task-card-card-name-div">
          {task.name}
        </div>
          <OpenModalButton
            buttonText={<i class="fa-solid fa-pen-to-square fa-xl"></i>}
            modalComponent={<TaskFormUpdate task={task}/>}
          />
          <button
            className="update-task-button"
            onClick={toggleUpdateForm}
          >
            <i class="fa-solid fa-pen-to-square fa-xl"></i>
          </button>
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
      )}
    </>
  )
}

export default selectRead
