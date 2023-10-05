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

//===================================== THUNKS ====================================
//===================================== THUNKS ====================================
//===================================== THUNKS ====================================
//===================================== THUNKS ====================================

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

    default: {
      return state
    }
  }
}

export default sectionReducer
