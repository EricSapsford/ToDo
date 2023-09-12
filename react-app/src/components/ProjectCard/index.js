import React from "react";
import { Link } from "react-router-dom";

function ProjectCard({ project }) {

  return (
    <>
      <Link to={`/projects/${project.id}`}>
        {project.name}
      </Link>
    </>
  )
}

export default ProjectCard
