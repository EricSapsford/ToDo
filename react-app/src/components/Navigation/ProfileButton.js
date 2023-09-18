import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css"

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current?.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/")
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      { user ? (
      <>
        <button onClick={openMenu}>
          <i className="fas fa-user-circle" />
        </button>
        <div className={ulClassName} ref={ulRef} id="logged-in-user-menu-div">
          <div>Welcome {user.firstName} {user.last_name}</div>
          <div>{user.username}</div>
          <div>{user.email}</div>
          <div className="logged-in-user-menu-logout-button">
            <button onClick={handleLogout}>Log Out</button>
          </div>
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
    </>
  );
}

export default ProfileButton;
