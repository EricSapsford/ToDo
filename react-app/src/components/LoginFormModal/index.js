import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

import * as projectActions from "../../store/project";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (!data.id) {
      setErrors(data);
    } else {
      console.log("login Project fetch going off")
      closeModal()
      // await dispatch(projectActions.getAllProjectsForAUserThunk(data.id));
    }
  };

  const handleDemoUser = async (e) => {
    e.preventDefault()
    let demoEmail = 'user@demo.io'
    let demoPassword = 'password'
    const data = await dispatch(login(demoEmail, demoPassword));
    closeModal()
    history.push("/projects")
  };

  return (
    <>
    <div className="login-form-div">
        <div className="log-in-title">
        </div>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="login-buttons-and-inputs-div">
            <div className="login-inputs-div">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
                />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                />
            </div>
            <div className="login-buttons-div">
              <button type="submit">Log In</button>
              <button onClick={handleDemoUser}>
                Log In as Demo User
              </button>
              <button type="button">Not a user? Sign up here!</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
