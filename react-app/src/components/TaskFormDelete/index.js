import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as taskActions from "../../store/task"
import * as sectionActions from "../../store/section"


function TaskFormDelete({ task }) {
  // console.log("here's what's coming in", taskId)
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const projectId = task.projectId

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const res = await dispatch(taskActions.deleteTaskThunk(task))
      await dispatch(sectionActions.getAllSectionsForAUserThunk(projectId))
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
      <div className="project-form-modal-div">
        <div className="log-in-title">
          <h1>Delete this Task?</h1>
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

export default TaskFormDelete
