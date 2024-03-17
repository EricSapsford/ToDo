import { dragBetweenTask } from "./task"

//=================================== CONSTANTS ===================================
//=================================== CONSTANTS ===================================
//=================================== CONSTANTS ===================================
//=================================== CONSTANTS ===================================

const GET_ALL_SECTIONS_FOR_A_USER = "sections/getAllSectionsForAUser"
const GET_ONE_SECTION = "sections/getOneSection"
const CREATE_SECTION = "sections/createSection"
const UPDATE_SECTION = "sections/updateSection"
const DELETE_SECTION = "sections/deleteSection"

const DRAG_BETWEEN_SECTION = "sections/dragBetweenSection"

//================================ ACTION CREATORS ================================
//================================ ACTION CREATORS ================================
//================================ ACTION CREATORS ================================
//================================ ACTION CREATORS ================================

const getAllSectionsForAUser = (sections) => {
  return {
    type: GET_ALL_SECTIONS_FOR_A_USER,
    sections
  }
}

const createSection = (section) => {
  return {
    type: CREATE_SECTION,
    section
  }
}

const updateSection = (section) => {
  return {
    type: UPDATE_SECTION,
    section
  }
}

const deleteSection = (sectionId) => {
  return {
    type: DELETE_SECTION,
    sectionId
  }
}

const dragBetweenSection = (grabBag) => {
  return {
    type: DRAG_BETWEEN_SECTION,
    grabBag
  }
}

//===================================== THUNKS ====================================
//===================================== THUNKS ====================================
//===================================== THUNKS ====================================
//===================================== THUNKS ====================================

// GET ALL SECTIONS FOR A PROJECT
export const getAllSectionsForAUserThunk = (projectId) => async (dispatch) => {
  const res = await fetch(`/api/projects/${projectId}/sections`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  if (res.ok) {
    const { sections } = await res.json();

    dispatch(getAllSectionsForAUser(sections))
    return sections
  } else {
    const errors = await res.json();
    return errors
  }
}

// CREATE A SECTION
export const createSectionThunk = (createdSection) => async (dispatch) => {
  const { name, projectId } = createdSection
  const res = await fetch(`/api/projects/${projectId}/section/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name
    })
  })
  if (res.ok) {
    const data = await res.json();
    dispatch(createSection(data));
    return data
  } else {
    const errors = await res.json();
    return errors
  }
}

// UPDATE A SECTION
export const updateSectionThunk = (updatedSection) => async (dispatch) => {
  const { name, taskOrder, sectionId } = updatedSection
  // console.log("name in thunk", name)
  // console.log("id in thunk", sectionId)
  // console.log("taskOrder in thunk", taskOrder)
  // console.log("What we'll be doing to it and sending to the db", taskOrder.join())
  // const taskOrderString = taskOrder.join()
  // console.log("Encoded string", taskOrderString)
  const res = await fetch(`/api/sections/${sectionId}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      task_order: taskOrder.join()
    })
  })
  if (res.ok) {
    const data = await res.json();
    dispatch(updateSection(data));
    return data
  } else {
    const errors = await res.json();
    return errors
  }
}

// DELETE A SECTION
export const deleteSectionThunk = (sectionId) => async (dispatch) => {
  const res = await fetch(`/api/sections/${sectionId}/delete`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.ok) {
    const data = await res.json();
    dispatch(deleteSection(sectionId));
    return data;
  } else {
    const errors = await res.json()
    return errors;
  }
}

// DRAG A TASK BETWEEN SECTIONS
export const dragBetweenSectionThunk = (grabBag) => async (dispatch) => {
  const { sourceSection, destinationSection, sourceNewTaskOrder, destinationNewTaskOrder, taskId} = grabBag
  // console.log("grabbag in thunk", grabBag)
  const res = await fetch(`/api/sections/dragBetween`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      task_id: taskId,
      source_section_id: sourceSection,
      destination_section_id: destinationSection,
      source_task_order: sourceNewTaskOrder,
      destination_task_order: destinationNewTaskOrder
    })
  })

  if (res.ok) {
    const data = await res.json();
    dispatch(dragBetweenSection(data));
    dispatch(dragBetweenTask(data));
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
  allSections: {},
  singleSection: {}
}

const sectionReducer = (state = initialState, action) => {

  switch (action.type) {

    case GET_ALL_SECTIONS_FOR_A_USER: {
      const newState = { ...state, allSections: {} }
      action.sections.forEach((sectionObj) => {
        newState.allSections[sectionObj.id] = sectionObj
      });
      return newState
    }

    case CREATE_SECTION: {
      if (action.section.id) {
        const newState = { ...state, allSections: { ...state.allSections } }
        newState.allSections[action.section.id] = action.section
        return newState;
      } else if (action.section.errors) {
        return state
      } else {
        return state
      }
    }

    case UPDATE_SECTION: {
      if (action.section.id) {
        const newState = { ...state, allSections: { ...state.allSections } }
        newState.allSections[action.section.id] = action.section
        return newState;
      } else if (action.section.errors) {
        return state
      } else {
        return state
      }
    }

    case DELETE_SECTION: {
      const newState = { ...state, allSections: { ...state.allSections } }
      delete newState.allSections[action.sectionId]
      return newState
    }

    //! UPDATE
    case DRAG_BETWEEN_SECTION: {
      console.log("action object in reducer", action)
      const newState = { ...state, allSections: { ...state.allSections } }

      //source section
      newState.allSections[action.grabBag.source.id] = action.grabBag.source

      //destination section
      newState.allSections[action.grabBag.destination.id] = action.grabBag.destination

      return newState
    }

    default: {
      return state
    }
  }
}

export default sectionReducer
