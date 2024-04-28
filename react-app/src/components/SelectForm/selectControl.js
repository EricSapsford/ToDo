import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./UserControls.css"

import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import ProjectCard from "../ProjectCard";
import ProjectFormCreate from "../ProjectFormCreate";

import * as projectActions from "../../store/project";

function SelectControls({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false)
  const ulRef = useRef();
  // console.log("user", user)

  const [addToggle, setAddToggle] = useState(false)

  const date = new Date();
  let todaysDate = date.getDate();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const toggleMenu = (e) => {
    setShowUserMenu(!showUserMenu);
  }

  const projState = useSelector((state) => (state.projects ? state.projects : {}))
  const projArr = Object.values(projState.allProjects)

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  useEffect(() => {
    if (user) {
      dispatch(projectActions.getAllProjectsForAUserThunk(user.id)).then(() => setIsLoaded(true))
    }
    // dispatch(projectActions.getAllProjectsForAUserThunk(user.id)).then(() => setIsLoaded(true))
    // console.log("projects sidebar Project fetch going off")
	}, [dispatch, user])

  const ulClassName = "user-control-dropdown" + (showUserMenu ? "" : "-false");
  const closeMenu = () => setShowMenu(false);

  const toggleAdd = () => {
    setAddToggle(!addToggle)
  }

  return (
    <>
      <button onClick={toggleMenu} className="projects-button-actual">
        Projects
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div>
              <div className="projects-menu-overdiv">

                <div className="projects-today-link">
                  <Link
                    to={`/projects`}
                    style={{textDecoration: "none"}}
                  >
                    <div className="project-name-div">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g>
                        <path
                          d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v2.5h-15V6A1.5 1.5 0 0 1 6 4.5z"
                          opacity=".1"
                        >
                        </path>
                        <path
                          d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
                        >
                        </path>
                        <text
                          className="project-today-svg-text"
                          font-size="9"
                          transform="translate(4 2)"
                        >
                          <tspan x="8" y="15" text-anchor="middle">{todaysDate}</tspan>
                        </text>
                      </g>
                    </svg>
                      <div>Today</div>
                    </div>
                  </Link>
                </div>

              <div className="projects-title-and-add-button-div">
                <h3>
                  Projects
                  <span className="create-project-button-div">
                    <OpenModalButton
                    buttonText={<i class="fa-solid fa-plus"></i>}
                    modalComponent={<ProjectFormCreate />}
                    />
                  </span>
                </h3>
              </div>
                {projArr.map((project) => (
                  <div className="project-update-button" key={project.id}
                  >
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="user-control-login-buttons">
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
              />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
              />
          </div>
        )}
      </ul>
    </>
  );
}

export default SelectControls;
