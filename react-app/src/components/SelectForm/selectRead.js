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
    </>
  )
}

export default selectRead
