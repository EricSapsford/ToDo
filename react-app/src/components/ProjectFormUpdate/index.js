import ProjectForm from '../ProjectForm';

function ProjectFormUpdate(project) {

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
