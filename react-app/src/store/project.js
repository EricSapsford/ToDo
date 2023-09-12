//=================================== CONSTANTS ===================================
//=================================== CONSTANTS ===================================
//=================================== CONSTANTS ===================================
//=================================== CONSTANTS ===================================

const GET_ALL_PROJECTS_FOR_A_USER = "projects/getAllProjectsForAUser"
const GET_ONE_PROJECT = "projects/getOneProject"
const CREATE_PROJECT = "projects/createProject"
const UPDATE_PROJECT = "projects/updateProject"
const DELETE_PROJECT = "projects/deleteProject"

//================================ ACTION CREATORS ================================
//================================ ACTION CREATORS ================================
//================================ ACTION CREATORS ================================
//================================ ACTION CREATORS ================================

const getAllProjectsForAUser = (projects) => {
  return {
    type: GET_ALL_PROJECTS_FOR_A_USER,
    projects
  }
}

const getOneProject = (project) => {
  return {
    type: GET_ONE_PROJECT,
    project
  }
}

const createProject = (project) => {
  return {
    type: CREATE_PROJECT,
    project
  }
}

const updateProject = (project) => {
  return {
    type: UPDATE_PROJECT,
    project
  }
}

const deleteProject = (projectId) => {
  return {
    type: DELETE_PROJECT,
    projectId
  }
}

//===================================== THUNKS ====================================
//===================================== THUNKS ====================================
//===================================== THUNKS ====================================
//===================================== THUNKS ====================================

// GET ALL PROJECTS FOR A USER
export const getAllProjectsForAUserThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/projects/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  if (res.ok) {
    const { projects } = await res.json();

    dispatch(getAllProjectsForAUser(projects))
    return projects
  } else {
    const errors = await res.json();
    return errors
  }
}

// GET ONE PROJECT

// CREATE A PROJECT
export const createProjectThunk = (createdProject) => async (dispatch) => {
  const { name, color, view } = createdProject
  const res = await fetch("/api/projects/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      color,
      view
    })
  })
  if (res.ok) {
    const data = await res.json();
    dispatch(createProject(data));
    return data
  } else {
    const errors = await res.json();
    return errors
  }
}

// UPDATE A PROJECT
export const updateProjectThunk = (updatedProject) => async (dispatch) => {
  const { name, color, view, projectId } = updateProject
  const res = await fetch(`/api/projects/${projectId}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      color,
      view
    })
  })
  if (res.ok) {
    const data = await res.json();
    dispatch(updateProject(data));
    return data
  } else {
    const errors = await res.json();
    return errors
  }
}

// DELETE A PROJECT
export const deleteProjectThunk = (projectId) => async (dispatch) => {
  const res = await fetch(`/api/restaurants/${projectId}/delete`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.ok) {
    const data = await res.json();
    dispatch(deleteProject(projectId));
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
  allProjects: {},
  singleProject: {}
}

const projectReducer = (state = initialState, action) => {

  switch (action.type) {

    case GET_ALL_PROJECTS_FOR_A_USER: {
      const newState = { ...state, allProjects: {} }
      action.projects.forEach((projectObj) => {
        newState.allProjects[projectObj.id] = projectObj
      });
      return newState
    }

    case CREATE_PROJECT: {
      if (action.project.id) {
        const newState = { ...state, allProjects: { ...state.allProjects } }
        newState.allProjects[action.project.id] = action.project
        return newState;
      } else if (action.project.errors) {
        return state
      } else {
        return state
      }
    }

    case UPDATE_PROJECT: {
      if (action.project.id) {
        const newState = { ...state, allProjects: { ...state.allProjects } }
        newState.allProjects[action.project.id] = action.project
        return newState;
      } else if (action.project.errors) {
        return state
      } else {
        return state
      }
    }

    case DELETE_PROJECT: {
      const newState = { ...state, allProjects: { ...state.allProjects } }
      delete newState.allProjects[action.projectId]
      return newState
    }

    default: {
      return state
    }
  }
}

export default projectReducer
