//=================================== CONSTANTS ===================================
//=================================== CONSTANTS ===================================
//=================================== CONSTANTS ===================================
//=================================== CONSTANTS ===================================

const GET_ALL_SECTIONS_FOR_A_USER = "sections/getAllSectionsForAUser"
const GET_ONE_SECTION = "sections/getOneSection"
const CREATE_SECTION = "sections/createSection"
const UPDATE_SECTION = "sections/updateSection"
const DELETE_SECTION = "sections/deleteSection"

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
  const { name, sectionId } = updatedSection
  const res = await fetch(`/api/sections/${sectionId}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
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

    default: {
      return state
    }
  }
}

export default sectionReducer
