import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import ProjectFormUpdate from "../ProjectFormUpdate";
import ProjectFormDelete from "../ProjectFormDelete";
import "./ProjectCard.css"

function Projection({ project }) {

  const colorObj = {
    "BerryRed": "rgb(184, 37, 111)",
    "Red": "rgb(219, 64, 53)",
    "Orange": "rgb(255, 153, 51)",
    "Yellow": "rgb(250, 208, 0)",
    "OliveGreen": "rgb(175, 184, 59)",
    "LimeGreen": "rgb(126, 204, 73)",
    "Green": "rgb(41, 148, 56)",
    "MintGreen": "rgb(106, 204, 188)",
    "Teal": "rgb(21, 143, 173)",
    "SkyBlue": "rgb(20, 170, 245)",
    "LightBlue": "rgb(150, 195, 235)",
    "Blue": "rgb(64, 115, 255)",
    "Grape": "rgb(136, 77, 255)",
    "Violet":"rgb(175, 56, 235)",
    "Lavender": "rgb(135, 150, 235)",
    "Magenta": "rgb(224, 81, 148)",
    "Salmon": "rgb(255, 141, 133)",
    "Charcoal": "rgb(128, 128, 128)",
    "Grey": "rgb(184, 184, 184)",
    "Taupe": "rgb(204, 172, 147)",
  }

  return (
    <>
    <div className="project-card-name">
      <Link to={`/projects/${project.id}`} style={{textDecoration: "none"}}>
        <div className="project-name-div">
          <svg
          width="24"
          height="24"
          viewBox="0 0 26 26"
          style={{color: colorObj[project.color]}}
          >
            <path
              fill="currentColor"
              d="M12 7a5 5 0 1 1 0 10 5 5 0   0 1 0-10z"
            >
            </path>
          </svg>
          <div alt={project.name}>{project.name}</div>
        </div>
      </Link>
        <div className='today-project-center-div'>
          <div className='today-project-column-overdiv'>
            {[...projectIdSet].map((projectId) =>(
            <div key={projectId} className='today-project-header'>
              <Link
                to={`/projects/${projectId}`}
                style={{textDecoration: "none"}}
              >
                <h2>{projectNameObj[projectId]}</h2>
              </Link>
              {taskArr.map((task) => (
                task.projectId === projectId ?
                <div key={task.id} className="task-update-button">
                  <TodayTaskFormUpdate task={task} />
                </div>
              :
                null
              ))}
            </div>
            ))}
          </div>
        </div>
    </div>
    </>
  )
}

export default Projection
