import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';

import { DragDropContext, Droppable } from "react-beautiful-dnd"

import TaskcardCard from "../TaskcardCard";
import TaskFormCreate from "../TaskFormCreate";
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
const [createTaskToggle, setCreateTaskToggle] = useState(false)

const [errors, setErrors] = useState([]);

const taskState = useSelector(state => state.tasks ? state.tasks : {})
const taskArr = Object.values(taskState.allTasks)

const project = useSelector(state => state.projects.allProjects[projectId] ? state.projects.allProjects[projectId] : {})

const sectionState = useSelector(state => state.sections ? state.sections : {})
const sectionsArr = Object.values(sectionState.allSections)
const taskOrder = sectionsArr[0] ? sectionsArr[0].taskOrder : []

let experiemtnalTorder = []

if (sectionsArr) {
  for (let i = 0; i < sectionsArr.length; i++) {
    experiemtnalTorder = [ ...experiemtnalTorder, ...sectionsArr[i].taskOrder ]
  }
}

console.log("experiment", experiemtnalTorder)

if (taskArr) {

  let taskOrderNum = taskOrder.map(Number)
  console.log("Numbers", taskOrderNum)

  const sortFunction = (a, b) => {
    let idA = a.id;
    let idB = b.id;

    let indexA = taskOrderNum.indexOf(idA)
    let indexB = taskOrderNum.indexOf(idB);

    return indexA - indexB
  }

  taskArr.sort(sortFunction)
}

console.log("taskOrder", taskOrder)
console.log("sectionArr", sectionsArr)
console.log("taskArr", taskArr)

useEffect(() => {
  dispatch(sectionActions.getAllSectionsForAUserThunk(projectId))
  dispatch(taskActions.getAllTasksForAProjectThunk(projectId))
  setIsLoaded(true)
}, [dispatch, projectId])

const toggleCreateTaskForm = () => {
  console.log(createTaskToggle)
  setCreateTaskToggle(!createTaskToggle)
}

const handleDragEnd = async (result) => {
  const { destination, source, draggableId } = result

  if (!destination) {
    return;
  }

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  const section = sectionState.allSections[source.droppableId]
  // console.log("section", section)

  const newTaskIds = section.taskOrder
  // console.log("newTaskIds", newTaskIds)

  newTaskIds.splice(source.index, 1);
  newTaskIds.splice(destination.index, 0, draggableId);
  // console.log("newTaskIds, but now it's", newTaskIds)

  const newSection = {
    ...section,
    sectionId: section.id,
    taskOrder: newTaskIds
  }

  console.log("section, but now it's", newSection)

  try {
    // console.log("This is what you're sending", section)
    const res = await dispatch(sectionActions.updateSectionThunk(newSection));
    {res.errors ? setErrors(res.errors) : setErrors([]); }
    if (res.ok) {
      setErrors([]);
    } else {
      return res
    }
  } catch (res) {
    const data = res
    if (data && data.errors) {
      setErrors(data.errors);
    }
  }
}



return (
  <>
      {isLoaded && sectionsArr.length > 0 && taskArr.length === 0 && project.view === "List" && (
      <>
        <div className="task-card-center-div-empty">
          <h1>Looks like this project is empty.</h1>
          <h1>Click the button below to add some tasks</h1>
        </div>
        <div className="add-task-button-empty-list-div">
          <TaskFormCreate projectId={projectId} sectionId={sectionsArr[0].id}/>
        </div>
      </>
      )}

      {isLoaded && sectionsArr.length > 0 && project.view === "List" && taskArr.length > 0 && (
      <>
      <div className="task-card-center-div">
        <div>
          <h1>{project.name}</h1>
        </div>

        <DragDropContext
          onDragEnd={handleDragEnd}
        >
          <Droppable
            droppableId={`${sectionsArr[0].id}`}
          >
            {(provided) => (
              <div
                //! GON BE HONEST, DON'T KNOW EXACTLY HOW TO USE THESE
                ref = {provided.innerRef}
                {...provided.droppableProps}
              >
              {taskArr.map((task, index) => (
                <div key={task.id} className="task-update-button">
                <TaskFormUpdate key={task.id} task={task} index={index}/>
              </div>
              ))}
              {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

          <div className="add-task-button-div">
              <TaskFormCreate projectId={projectId} sectionId={sectionsArr[0].id}/>
          </div>

      </div>
      </>
      )}

      {isLoaded && project.view === "Board" && (
        <>
          <div className="project-top-name-div">
            <h1>{project.name}</h1>
          </div>
          <div className="section-center-div">
            <div className="section-column-overdiv">


              {sectionsArr.map((section) => (

                <div key={section.id} className="section-map-div">
                  <SectionFormUpdate section={section} sectionId={section.id}/>


                   {taskArr.map((task, index) => (
                      task.sectionId === section.id ?
                      <div key={task.id} className="task-update-button">
                        <TaskFormUpdate key={task.id} task={task} index={index} />
                      </div>
                      :
                      null
                    ))}

                    <div className="add-task-button-div">
                      <TaskFormCreate projectId={projectId} sectionId={section.id}/>
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
