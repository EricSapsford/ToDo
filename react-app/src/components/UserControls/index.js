import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UserControls.css"

import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import ProjectCard from "../ProjectCard";
import ProjectFormCreate from "../ProjectFormCreate";
import ProjectFormUpdate from "../ProjectFormUpdate";
import ProjectFormDelete from "../ProjectFormDelete";

import * as projectActions from "../../store/project";

function UserControls({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false)
  const ulRef = useRef();
  // console.log("user", user)

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

  return (
    <>
      <button onClick={toggleMenu} className="projects-button-actual">
        Projects
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div>
              <div style={{textAlign: "center"}}>
              <h1>Projects</h1>
                {projArr.map((project) => (
                  <div className="project-update-button" key={project.id}
                  >
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
              <div className="create-project-button-div">
              <OpenModalButton
                buttonText={"Create Project"}
                modalComponent={<ProjectFormCreate />}
                />
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

export default UserControls;
