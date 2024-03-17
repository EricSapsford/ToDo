import TaskForm from "../TaskForm";
import { Draggable } from "react-beautiful-dnd";

function TaskFormUpdate({task, index}) {

  return (
    <>
      <Draggable
        draggableId={`${task.id}`}
        index={index}
      >
        {(provided, snapshot) => (
          <div
            ref = {provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="task-card-card-overdiv"
          >
            <TaskForm task={task} index={index} formType={"Update"} />
          </div>
        )}
      </Draggable>
    </>
  )
}

export default TaskFormUpdate
