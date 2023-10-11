import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import TaskcardCard from "../TaskcardCard";
import TaskFormCreate from "../TaskFormCreate";
import TaskFormDelete from "../TaskFormDelete";
import TaskFormUpdate from "../TaskFormUpdate";
import SectionFormUpdate from "../SectionFormUpdate"
import SectionFormCreate from "../SectionFormCreate"

import * as taskActions from "../../store/task";
import * as sectionActions from "../../store/section";

import "./TaskCard.css"

function TaskCard() {
const dispatch = useDispatch();
const { projectId } = useParams();

const [isLoaded, setIsLoaded] = useState(false)

const taskState = useSelector(state => state.tasks ? state.tasks : {})
const taskArr = Object.values(taskState.allTasks)

const project = useSelector(state => state.projects.allProjects[projectId] ? state.projects.allProjects[projectId] : {})

const sectionState = useSelector(state => state.sections ? state.sections : {})
const sectionsArr = Object.values(sectionState.allSections)

useEffect(() => {
  dispatch(sectionActions.getAllSectionsForAUserThunk(projectId))
  dispatch(taskActions.getAllTasksForAProjectThunk(projectId))
  setIsLoaded(true)
}, [dispatch, projectId])

return (
  <>
      {isLoaded && sectionsArr.length > 0 && taskArr.length === 0 && project.view === "List" && (
      <>
      <div className="task-card-center-div-empty">
        <h1>Looks like this project is empty.</h1>
        <h1>Click the button below to add some tasks</h1>
        <div className="add-task-button-div">
          <OpenModalButton
            buttonText={"Add Task"}
            modalComponent={<TaskFormCreate projectId={projectId} sectionId={sectionsArr[0].id}/>}
          />
        </div>
      </div>
      </>
      )}

      {isLoaded && sectionsArr.length > 0 && project.view === "List" && taskArr.length > 0 && (
      <>
      <div className="task-card-center-div">
        <div>
          <h1>{project.name}</h1>
        </div>
        {taskArr.map((task) => (
          <div key={task.id} className="task-update-button">
            <TaskFormUpdate task={task} />
          </div>
        ))}

        <div className="add-task-button-div">
          <OpenModalButton
            buttonText={"Add Task"}
            modalComponent={<TaskFormCreate projectId={projectId} sectionId={sectionsArr[0].id}/>}
          />
        </div>
      </div>
      </>
      )}

      {isLoaded && project.view === "Board" && (
        <>
          <div className="project-name-div">
            <h1>{project.name}</h1>
          </div>
          <div className="section-center-div">
            <div className="section-column-overdiv">
              {sectionsArr.map((section) => (
                <div key={section.id} className="section-map-div">
                  <SectionFormUpdate section={section} sectionId={section.id}/>
                  {taskArr.map((task) => (
                    task.sectionId === section.id ?
                    <div key={task.id} className="task-update-button">
                      <TaskFormUpdate task={task} />
                    </div>
                    :
                    null
                    ))}

                  <div className="add-task-button-div">
                    <OpenModalButton
                      buttonText={"Add Task"}
                      modalComponent={<TaskFormCreate projectId={projectId} sectionId={section.id}/>}
                    />
                  </div>

                </div>
              ))}

              <span>
                <SectionFormCreate projectId={projectId}/>
              </span>
            </div>


          </div>
        </>
      )}
  </>

)
}

export default TaskCard
