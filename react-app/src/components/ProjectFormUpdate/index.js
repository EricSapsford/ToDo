import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as projectActions from "../../store/project"
import ProjectForm from '../ProjectForm';

function ProjectFormUpdate(project) {
  const dispatch = useDispatch();

  // const project = useSelector(state => state.projects.allProjects[projectId])

  return (
    <>
      <div>
        <ProjectForm project={project.project} formType={"Update"} />
      </div>
    </>
  )
}

export default ProjectFormUpdate
