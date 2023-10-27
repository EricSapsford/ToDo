import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as projectActions from "../../store/project"

import "./ProjectFormDelete.css"


function ProjectFormDelete({ projectId }) {
  // console.log("here's what's coming in", projectId)
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const res = await dispatch(projectActions.deleteProjectThunk(projectId))
      if (res.message) {
        closeModal();
        history.push("/projects")
      }
    } catch (res) {
      console.log("res", res)
      const data = await res.json();
      if (data && data.errors) {
        console.log(data, data.errors)
        return data.errors
      }
    }
  }

  return (
    <>
      <div className="project-form-modal-div">
        <div className="log-in-title">
          <h1>Delete this Project?</h1>
        </div>
        <div className="project-form-modal-buttons">
          <button onClick={closeModal}>
            No, keep
          </button>
          <button onClick={handleDelete}>
            Yes, delete
          </button>
        </div>
      </div>
    </>
  )
}

export default ProjectFormDelete
