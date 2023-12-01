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

let experiemtnalTorder = []
let sectionsOrder = []

if (sectionsArr) {
  for (let i = 0; i < sectionsArr.length; i++) {
    experiemtnalTorder = [ ...experiemtnalTorder, ...sectionsArr[i].taskOrder ]
  }

  for (let j = 0; j < sectionsArr.length; j++) {
    sectionsOrder.push(String(sectionsArr[j].id))
  }
}

if (taskArr) {

  let taskOrderNum = experiemtnalTorder.map(Number)
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

// console.log("taskOrder", taskOrder)
// console.log("sectionArr", sectionsArr)
// console.log("taskArr", taskArr)
// console.log(sectionsOrder)

useEffect(() => {
  // console.log("use effect going off")
  dispatch(sectionActions.getAllSectionsForAUserThunk(projectId))
  dispatch(taskActions.getAllTasksForAProjectThunk(projectId))
  setIsLoaded(true)
}, [dispatch, projectId])

const toggleCreateTaskForm = () => {
  // console.log(createTaskToggle)
  setCreateTaskToggle(!createTaskToggle)
}

const handleDragEnd = async (result) => {
  const { destination, source, draggableId } = result
  console.log("destation, source, draggableId", destination, source, draggableId)

  // TASK WAS PICKED UP AND DROPPED OUTSIDE OF DRAGDROPCONTEXT
  if (!destination) {
    return;
  }

  // TASK WAS PICKED UP AND DROPPED BACK WHERE IT STARTED
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  // TASK WAS PICKED UP AND DROPPED WITHIN SAME SECTION
  if (destination.droppableId === source.droppableId) {
  const section = sectionState.allSections[source.droppableId]
  // console.log("section in handleDragEnd", section)

  const sliceTaskArr = section.taskOrder
  const newTaskIds = experiemtnalTorder
  // console.log("newTaskIds in handleDragEnd", newTaskIds)

  const sliceFunc = (element) => element === sliceTaskArr[0]
  const slicePoint = newTaskIds.findIndex(sliceFunc)

  newTaskIds.splice(source.index, 1);
  newTaskIds.splice(destination.index, 0, draggableId);

  const taskOrderSlice = experiemtnalTorder.slice(slicePoint, slicePoint + sliceTaskArr.length)

  const newSection = {
    ...section,
    sectionId: section.id,
    taskOrder: taskOrderSlice
  }

  // console.log("section, but now it's", newSection)

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

  // TASK WAS PICKED UP AND DROPPED WITHIN A DIFFERENT SECTION
  if (destination.droppableId !== source.droppableId) {

    if (sectionsOrder.indexOf(destination.droppableId) > sectionsOrder.indexOf(source.droppableId)) {
      destination.index = destination.index - 1
    }

    const startingSection = sectionState.allSections[source.droppableId]
    const endingSection = sectionState.allSections[destination.droppableId]

    const startingSliceTaskArr = startingSection.taskOrder
    const endingSliceTaskArr = endingSection.taskOrder
    const newTaskIds = experiemtnalTorder

    newTaskIds.splice(source.index, 1);

    const endingSlicePoint = newTaskIds.indexOf(endingSliceTaskArr[0])

    newTaskIds.splice(destination.index, 0, draggableId);

    const draggableIdSlicePoint = startingSliceTaskArr.indexOf(draggableId)

    // mutate original task order array from source section to be sent to DB
    startingSliceTaskArr.splice(draggableIdSlicePoint, 1)

    // new task order array from destination section now ready to be sent to DB
    const endingTaskOrderSlice = newTaskIds.slice(endingSlicePoint, endingSlicePoint + endingSliceTaskArr.length + 1)

    const grabBag = {
      sourceSection: source.droppableId,
      destinationSection: destination.droppableId,
      sourceNewTaskOrder: startingSliceTaskArr,
      destinationNewTaskOrder: endingTaskOrderSlice,
      taskId: draggableId
    }

    // console.log("grabBag", grabBag)

    try {
      // console.log("This is what you're sending", section)
      const res = await dispatch(sectionActions.dragBetweenSectionThunk(grabBag));
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

              <DragDropContext
                onDragEnd={handleDragEnd}
              >
              {sectionsArr.map((section) => (
                <div key={section.id} className="section-map-div">
                  <SectionFormUpdate section={section} sectionId={section.id}/>


                    <Droppable
                      droppableId={`${section.id}`}
                    >
                      {(provided) => (
                        <div
                          ref = {provided.innerRef}
                          {...provided.droppableProps}
                        >
                        {taskArr.map((task, index) => (
                          task.sectionId === section.id ?
                          <div key={task.id} className="task-update-button">
                            <TaskFormUpdate key={task.id} task={task} index={index} />
                          </div>
                          :
                          null
                        ))}
                        {provided.placeholder}
                        </div>
                      )}
                    </Droppable>

                  <div className="add-task-button-div">
                    <TaskFormCreate projectId={projectId} sectionId={section.id}/>
                  </div>
                </div>
              ))}
              </DragDropContext>

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
