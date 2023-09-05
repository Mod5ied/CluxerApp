import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import view from "../../../assets/view.svg";

function staff() {
	const [email, setEmail] = useState("");
	const [number, setNumber] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState("");

	const handlePasswordChange = (e) => setPassword(e.target.value);
	const toggleShowPassword = () => setShowPassword(!showPassword);
	const handleUsernameChange = (e) => setUsername(e.target.value);
	const handleEmailChange = (e) => setEmail(e.target.value);
	const handleNumberChange = (e) => setNumber(e.target.value);
	const handleFirstNameChange = (e) => setFirstName(e.target.value);
	const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

	const passwordMatch = password === confirmPassword;
	const confirmPasswordStyle = passwordMatch ? {} : { border: "2px solid red" };

	return (
		<div>
			<form onSubmit="">
				<section>
					<h2>Add Staff</h2>
				</section>

				<section className="px-2 py-4 bg-white">
					<div id="input_section">
						<span className="input_span">
							<label htmlFor="username">First name</label>
							<input className="input_span_input" type="text" placeholder="Username" onChange={handleFirstNameChange} />
						</span>
					</div>
					<div id="input_section">
						<span className="input_span">
							<label htmlFor="username">Username</label>
							<input className="input_span_input" type="text" placeholder="Username" onChange={handleUsernameChange} />
						</span>
					</div>
					<div id="input_section">
						<span className="input_span">
							<label htmlFor="username">Email</label>
							<input className="input_span_input" type="email" placeholder="Username" onChange={handleEmailChange} />
						</span>
					</div>
					<div id="input_section">
						<span className="input_span">
							<label htmlFor="username">PhoneNumber</label>
							<input className="input_span_input" type="number" placeholder="Username" onChange={handleNumberChange} />
						</span>
					</div>

					<div id="input_section">
						<span className="input_span">
							<input className="input_span_input" type={showPassword ? "text" : "password"} placeholder="Password" onChange={handlePasswordChange} />
							<ReactSVG onClick={toggleShowPassword} src={view} className="absolute mt-3 ml-[70%] md:ml-[28%]" />
						</span>
					</div>
					<div id="input_section">
						<span className="input_span">
							<input
								style={confirmPasswordStyle}
								className="input_span_input"
								placeholder="Confirm Password"
								type={showPassword ? "text" : "password"}
								onChange={handleConfirmPasswordChange}
							/>
							<ReactSVG onClick={toggleShowPassword} src={view} className="absolute mt-3 ml-[70%] md:ml-[28%]	]" />
						</span>
					</div>
				</section>
			</form>
		</div>
	);
}

export default staff;
