//=================================== CONSTANTS ===================================
//=================================== CONSTANTS ===================================
//=================================== CONSTANTS ===================================
//=================================== CONSTANTS ===================================

const GET_ALL_TASKS_FOR_A_PROJECT = "tasks/getAllTasksForAProject"
const CREATE_TASK = "tasks/createTask"
const UPDATE_TASK = "tasks/updateTask"
const DELETE_TASK = "tasks/deleteTask"

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

const deleteTask = (taskId) => {
  return {
    type: DELETE_TASK,
    taskId
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

// CREATE A TASK
export const createTaskThunk = (createdTask) => async (dispatch) => {
  const { name, description, labels, section_id, projectId } = createdTask
  const res = await fetch(`/api/projects/${projectId}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      description,
      labels,
      section_id
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
  const { name, description, labels, section_id, taskId } = updatedTask
  console.log("task coming into thunk", updatedTask)

  const res = await fetch(`/api/tasks/${taskId}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      description,
      labels,
      section_id
    })
  })
  console.log("res inside thunk", res)
  if (res.ok) {
    const data = await res.json();
    console.log("res.ok data", data)
    dispatch(updateTask(data));
    return data
  } else {
    const errors = await res.json();
    console.log("res not ok errors", errors)
    return errors
  }
}

// DELETE A TASK
export const deleteTaskThunk = (taskId) => async (dispatch) => {
  const res = await fetch(`/api/tasks/${taskId}/delete`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.ok) {
    const data = await res.json();
    dispatch(deleteTask(taskId));
    return data;
  } else {
    const errors = await res.json()
    return errors;
  }
}

//===================================== REDUCER ===================================
//===================================== REDUCER ===================================
//===================================== REDUCER ===================================
//===================================== REDUCER ===================================

const initialState = {
  allTasks: {},
  singleTask: {}
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

    case CREATE_TASK: {
      if (action.task.id) {
        const newState = { ...state, allTasks: { ...state.allTasks } }
        newState.allTasks[action.task.id] = action.task
        return newState;
      } else if (action.task.errors) {
        return state
      } else {
        return state
      }
    }

    case UPDATE_TASK: {
      if (action.task.id) {
        const newState = { ...state, allTasks: { ...state.allTasks } }
        newState.allTasks[action.task.id] = action.task
        return newState;
      } else if (action.task.errors) {
        return state
      } else {
        return state
      }
    }

    case DELETE_TASK: {
      const newState = { ...state, allTasks: { ...state.allTasks } }
      delete newState.allTasks[action.taskId]
      return newState
    }

    default: {
      return state
    }
  }
}

export default taskReducer
