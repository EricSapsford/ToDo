import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";

import { login } from "../../store/session";
import { useHistory } from "react-router-dom";

function SelectForm() {
	const dispatch = useDispatch();
  const history = useHistory();

	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
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

	const handleSignup = async (e) => {
		e.preventDefault();
    console.log("user in handle", user)
		if (password === confirmPassword) {
			const data = await dispatch(signUp(user));
			if (data) {
				setErrors(data);
			} else {
				history.push("/projects");
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

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
		<div className="signup-form-div">
			<form onSubmit={handleSignup}>
				<div className="error-message-div">
					<div>
						{errors.map((error, idx) => (
							<div key={idx}>{error}</div>
							))}
					</div>
				</div>
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
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						placeholder="Username"
            />
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
						placeholder="First Name"
            />
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
						placeholder="Last Name"
            />
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						placeholder="Password"
            />
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						placeholder="Confirm Password"
            />
          </div>
          <div className="login-buttons-div">
				    <button type="submit">Sign Up</button>
            <button type="button" onClick={clickToggleForm}>Have an Account? Log in!</button>
          </div>
			</div>
			</form>
			</div>
    }
		</>
	);
}

export default SelectForm
