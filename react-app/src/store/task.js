const today = Date()
const dayStringArr = today.split(" ")
const dayString = `${dayStringArr[0]}, ${dayStringArr[2]} ${dayStringArr[1]} ${dayStringArr[3]} 00:00:00 GMT`


//=================================== CONSTANTS ===================================
//=================================== CONSTANTS ===================================
//=================================== CONSTANTS ===================================
//=================================== CONSTANTS ===================================

const GET_ALL_TASKS_FOR_A_PROJECT = "tasks/getAllTasksForAProject"
const GET_ALL_TASKS_FOR_TODAY = "tasks/getAllTasksForToday"
const CREATE_TASK = "tasks/createTask"
const UPDATE_TASK = "tasks/updateTask"
const DELETE_TASK = "tasks/deleteTask"
const COMPLETE_TASK = "tasks/completeTask"

const DRAG_BETWEEN_TASK = "tasks/dragBetweenTask"

//================================ ACTION CREATORS ================================
//================================ ACTION CREATORS ================================
//================================ ACTION CREATORS ================================
//================================ ACTION CREATORS ================================

const getAllTasksForAProject = (tasks) => {
  return {
    type: GET_ALL_TASKS_FOR_A_PROJECT,
    tasks
  }
}

const getAllTasksForToday = (tasks) => {
  return {
    type: GET_ALL_TASKS_FOR_TODAY,
    tasks
  }
}

const createTask = (task) => {
  return {
    type: CREATE_TASK,
    task
  }
}

const updateTask = (task) => {
  return {
    type: UPDATE_TASK,
    task
  }
}

const deleteTask = (task) => {
  return {
    type: DELETE_TASK,
    task
  }
}

const completeTask = (task) => {
  return {
    type: COMPLETE_TASK,
    task
  }
}

export const dragBetweenTask = (grabBag) => {
  return {
    type: DRAG_BETWEEN_TASK,
    grabBag
  }
}

//===================================== THUNKS ====================================
//===================================== THUNKS ====================================
//===================================== THUNKS ====================================
//===================================== THUNKS ====================================

// GET ALL TASKS FOR A PROJECT
export const getAllTasksForAProjectThunk = (projectId) => async (dispatch) => {
  const res = await fetch(`/api/projects/${projectId}/tasks`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  if (res.ok) {
    const { tasks } = await res.json();

    dispatch(getAllTasksForAProject(tasks))
    return tasks
  } else {
    const errors = await res.json();
    return errors
  }
}

// GET ALL TASKS FOR TODAY
export const getAllTasksForTodayThunk = () => async (dispatch) => {
  const res = await fetch(`/api/tasks/today`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  if (res.ok) {
    const { tasks } = await res.json();

    dispatch(getAllTasksForToday(tasks))
    return tasks
  } else {
    const errors = await res.json();
    return errors
  }
}

// CREATE A TASK
export const createTaskThunk = (createdTask) => async (dispatch) => {
  const { name, description, dueDate, labels, sectionId, projectId } = createdTask
  const res = await fetch(`/api/projects/${projectId}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      description,
      labels,
      due_date: dueDate,
      section_id: sectionId
    })
  })
  if (res.ok) {
    const data = await res.json();
    dispatch(createTask(data));
    return data
  } else {
    const errors = await res.json();
    return errors
  }
}

// UPDATE A TASK
export const updateTaskThunk = (updatedTask) => async (dispatch) => {
  const { name, description, labels, dueDate, sectionId, taskId } = updatedTask
  console.log("task coming into thunk", updatedTask)

  const res = await fetch(`/api/tasks/${taskId}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      description,
      labels,
      due_date: dueDate,
      section_id: sectionId
    })
  })
  // console.log("res inside thunk", res)
  if (res.ok) {
    const data = await res.json();
    // console.log("res.ok data", data)
    dispatch(updateTask(data));
    return data
  } else {
    const errors = await res.json();
    // console.log("res not ok errors", errors)
    return errors
  }
}

// DELETE A TASK
export const deleteTaskThunk = (task) => async (dispatch) => {
  const res = await fetch(`/api/tasks/${task.id}/delete`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.ok) {
    const data = await res.json();
    dispatch(deleteTask(task));
    return data;
  } else {
    const errors = await res.json()
    return errors;
  }
}

// COMPLETE A TASK
export const completeTaskThunk = () => async (dispatch) => {
  const res = await fetch(`/api/tasks/${taskId}/complete`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  if (res.ok) {
    const { task } = await res.json();

    dispatch(completeTask(task))
    return task
  } else {
    const errors = await res.json();
    return errors
  }
}

//===================================== REDUCER ===================================
//===================================== REDUCER ===================================
//===================================== REDUCER ===================================
//===================================== REDUCER ===================================

const initialState = {
  allTasks: {},
  todaysTasks: {},
  completedTask: {}
}

const taskReducer = (state = initialState, action) => {

  switch (action.type) {

    case GET_ALL_TASKS_FOR_A_PROJECT: {
      const newState = { ...state, allTasks: {} }
      action.tasks.forEach((taskObj) => {
        newState.allTasks[taskObj.id] = taskObj
      });
      return newState
    }

    case GET_ALL_TASKS_FOR_TODAY: {
      const newState = { ...state, todaysTasks: {} }
      if (action.tasks) {
        action.tasks.forEach((taskObj) => {
          newState.todaysTasks[taskObj.id] = taskObj
        });
        return newState
      } else {
        return newState
      }
    }

    case CREATE_TASK: {
      if (action.task.id) {
        const newState = { ...state, allTasks: { ...state.allTasks }, todaysTasks: { ...state.todaysTasks } }
        newState.allTasks[action.task.id] = action.task
        if (action.task.dueDate === dayString) {
          newState.todaysTasks[action.task.id] = action.task
        }
        return newState;
      } else if (action.task.errors) {
        return state
      } else {
        return state
      }
    }

    case UPDATE_TASK: {
      if (action.task.id) {
        const newState = { ...state, allTasks: { ...state.allTasks }, todaysTasks: { ...state.todaysTasks } }
        newState.allTasks[action.task.id] = action.task
        if (action.task.dueDate === dayString) {
          newState.todaysTasks[action.task.id] = action.task
        }
        return newState;
      } else if (action.task.errors) {
        return state
      } else {
        return state
      }
    }

    case DELETE_TASK: {
      const newState = { ...state, allTasks: { ...state.allTasks }, todaysTasks: { ...state.todaysTasks } }
      delete newState.allTasks[action.task.id]
      if (action.task.dueDate === dayString) {
        delete newState.todaysTasks[action.task.id]
      }
      return newState
    }

    case COMPLETE_TASK: {
      const newState = { ...state, completeTask: { ...state.completedTask} }
      if (action.task) {
        newState.completeTask[task.id]
        return newState
      } else {
        return newState
      }
    }

    case DRAG_BETWEEN_TASK: {
      const newState = { ...state, allTasks: { ... state.allTasks } }
      newState.allTasks[action.grabBag.task.id] = action.grabBag.task

      return newState
    }

    default: {
      return state
    }
  }
}

export default taskReducer
