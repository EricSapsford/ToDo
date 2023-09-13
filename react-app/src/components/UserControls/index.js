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
  const ulRef = useRef();

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
      dispatch(projectActions.getAllProjectsForAUserThunk(user.id));
    }
    console.log("projects sidebar Project fetch going off")
	}, [dispatch])

  const ulClassName = "profile-dropdown" + (showUserMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={toggleMenu}>
        Projects
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div>
              <div>
                {projArr.map((project) => (
                  <div className="update-button" key={project.id} style={{border: '1px solid gray'}}
                  >
                    <ProjectCard project={project} />
                    <OpenModalButton
                      buttonText={"Edit"}
                      modalComponent={<ProjectFormUpdate project={project}/>}
                    />
                      <OpenModalButton
                      buttonText={"Delete"}
                      modalComponent={<ProjectFormDelete projectId={project.id}/>}
                    />
                  </div>
                ))}
              </div>

              <OpenModalButton
                buttonText={"Create Project"}
                modalComponent={<ProjectFormCreate />}
              />
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </ul>
    </>
  );
}

export default UserControls;
