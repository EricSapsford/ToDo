import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import * as taskActions from "../../store/task"

import TodayTaskFormUpdate from '../TodayTaskFormUpdate';
import TaskFormCreate from '../TaskFormCreate';


import "./Today.css"
import { useDispatch } from 'react-redux';

function Today () {
  const dispatch = useDispatch();

  const [ isLoaded, setIsLoaded ] = useState(false)

  const taskState = useSelector(state => state.tasks ? state.tasks : {})
  const taskArr = Object.values(taskState.todaysTasks)

  const projectState = useSelector(state => state.projects ? state.projects : {})
  const projectArr = Object.values(projectState.allProjects)


  let projectIdSet = new Set;
  let projectNameObj = {}

  if (isLoaded && taskArr && projectArr) {
    taskArr.map((task) => (
      projectIdSet.has(task.projectId) ? null : projectIdSet.add(task.projectId)
    ))

    projectArr.map((project) => (
      projectNameObj[project.id] = project.name
    ))
    // console.log("projectNameObj", projectNameObj)
  }

  useEffect(() => {
    dispatch(taskActions.getAllTasksForTodayThunk())
    setIsLoaded(true)
    console.log("splash useEffect just went off")
  }, [dispatch])

  return (
    <>
      {isLoaded && projectIdSet.size > 0 && projectArr.length !== 0 && (
        taskArr.length !== 0 ?
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
        :
        <div className='task-card-center-div'>
          <div>
            <h1>No tasks due today. Good work!</h1>
          </div>
        </div>
      )}
    </>
  )
}

export default Today
