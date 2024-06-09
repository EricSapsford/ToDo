import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";

import { login } from "../../store/session";
import { useHistory } from "react-router-dom";

function selectSplash(userInfo) {
	const dispatch = useDispatch();
  const history = useHistory();

	const firstName = userInfo.firstName
	const lastName = userInfo.lastName
	const username = userInfo.username

	const [email, setEmail] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

  const [toggleForm, setToggleForm] = useState(true)

  const clickToggleForm = () => {
    setToggleForm(!toggleForm)
		setErrors([])
  }

	const user = {
		username,
		email,
		password,
		firstName,
		lastName
	}


  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (!data.id) {
      setErrors(data);
    } else {
      console.log("login Project fetch going off")
      history.push("/projects")
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
    {
      <div className="login-form-div">
        <div className="log-in-title">
        </div>
        <form onSubmit={handleLogin}>
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
              <button type="button" onClick={clickToggleForm}>Not a user? Sign up here!</button>
            </div>
          </div>
        </form>
      </div>
    }
		</>
	);
}

export default selectSplash;
