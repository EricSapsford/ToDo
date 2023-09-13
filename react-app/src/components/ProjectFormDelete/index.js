import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as projectActions from "../../store/project"


function ProjectFormDelete({ projectId }) {
  // console.log("here's what's coming in", projectId)
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const res = await dispatch(projectActions.deleteProjectThunk(projectId))
      if (res.message) {
        closeModal();
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
      <div>
        <div>
          Delete this Project?
        </div>
        <button onClick={closeModal}>
          No, keep
        </button>
        <button onClick={handleDelete}>
          Yes, delete
        </button>
      </div>
    </>
  )
}

export default ProjectFormDelete
