import React from "react";
import { Link } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import ProjectFormUpdate from "../ProjectFormUpdate";
import ProjectFormDelete from "../ProjectFormDelete";
import "./ProjectCard.css"

function ProjectCard({ project }) {

  return (
    <>
    <div className="project-card-name">
      <Link to={`/projects/${project.id}`} style={{textDecoration: "none"}}>
        <div className="project-name-div">
        {project.name}
        </div>
      </Link>
      <div className="project-card-modal-button-edit">
        <OpenModalButton
          buttonText={<i class="fa-solid fa-pen-to-square fa-xl"></i>}
          modalComponent={<ProjectFormUpdate project={project}/>}
          />
      </div>
      <div className="project-card-modal-button-delete">
          <OpenModalButton
          buttonText={<i class="fa-regular fa-trash-can fa-xl"></i>}
          modalComponent={<ProjectFormDelete projectId={project.id}/>}
          />
      </div>
    </div>
    </>
  )
}

export default ProjectCard
