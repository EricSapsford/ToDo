import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const user = {
		username,
		email,
		password,
		firstName,
		lastName
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(user));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<>
		<div className="login-modal-div">
		<div className="log-in-title">
			<h1>Sign Up</h1>
			</div>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<div className="inputs-and-login-button">
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
				<button type="submit">Sign Up</button>
			</div>
			</form>
			</div>
		</>
	);
}

export default SignupFormModal;
