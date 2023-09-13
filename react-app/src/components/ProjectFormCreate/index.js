import ProjectForm from "../ProjectForm";

function ProjectFormCreate() {

  let project = {
    name: "",
    color: "",
    // view: "",
  }

  return (
    <ProjectForm project={project} formType={"Create"} />
  )
}

export default ProjectFormCreate
