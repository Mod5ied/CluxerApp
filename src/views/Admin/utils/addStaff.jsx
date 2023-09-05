import view from "../../../assets/view.svg";
import React, { useState } from "react";
import { ReactSVG } from "react-svg";
// import { adminState, useToggleState } from "../../../services/state/state";

function addStaff() {
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [firstName, setFirst] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");

	const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);
	const toggleShowPassword = () => setShowPassword(!showPassword);
	const handlePassword = (e) => setPassword(e.target.value);
	const handleUsername = (e) => setUsername(e.target.value);
	const handleFirstname = (e) => setFirst(e.target.value);
	const handleEmail = (e) => setEmail(e.target.value);
	const handlePhone = (e) => setPhone(e.target.value);
	const handleSubmit = () => true;

	const passwordMatch = password === confirmPassword;
	const confirmPasswordStyle = passwordMatch ? {} : { border: "2px solid red" };

	return (
		<div className="h-[70%] w-full md:w-[80%] bg-transparent flex flex-col gap-4 py-2 px-0 md:p-2 absolute top-20">
			<section className="flex flex-row justify-between py-2 px-4 md:px-0">
				<h2 className="text-xl font-semibold text-gray-100">Add Staff</h2>
				<button onClick={() => useToggleState("addStaff")} className="reduce_btn" type="submit">
					Manage Staff
				</button>
			</section>

			<form id="staff_form_main" onSubmit={handleSubmit}>
				<section className="w-full h-[15%] border-b border-gray-100">
					<h2 className="py-2 px-3 md:px-0 text-xl md:text-2xl font-semibold">Add Staff</h2>
				</section>

				<section id="staff-signup_formSection">
					<span className="flex flex-col justify-between h-full p-2 w-full md:w-[50%]">
						<div class="staff-input_section">
							<span className="input_span">
								<label htmlFor="username">First name</label>
								<input className="input_span_input" type="text" placeholder="First name" onChange={handleFirstname} />
							</span>
						</div>
						<div class="staff-input_section">
							<span className="input_span">
								<label htmlFor="username">Email</label>
								<input className="input_span_input" type="number" placeholder="Email" onChange={handleEmail} />
							</span>
						</div>
						<div class="staff-input_section">
							<span className="input_span">
								<label htmlFor="username">Password</label>
								<input className="input_span_input" placeholder="Password" type={showPassword ? "text" : "password"} onChange={handlePassword} />
							</span>
						</div>
					</span>

					<span className="flex flex-col justify-between h-full p-2 w-full md:w-[50%]">
						<div class="staff-input_section">
							<span className="input_span">
								<label htmlFor="username">Username</label>
								<input className="input_span_input" type="number" placeholder="Username" onChange={handleUsername} />
							</span>
						</div>
						<div class="staff-input_section">
							<span className="input_span">
								<label htmlFor="username">Phone number</label>
								<input className="input_span_input" type="number" placeholder="Phone number" onChange={handlePhone} />
							</span>
						</div>
						<div class="staff-input_section">
							<span className="input_span">
								<label htmlFor="username">Confirm Password</label>
								<input
									style={confirmPasswordStyle}
									type={showPassword ? "text" : "password"}
									className="input_span_input"
									placeholder="Confirm password"
									onChange={handleConfirmPassword}
								/>
								<ReactSVG onClick={toggleShowPassword} src={view} className="absolute mt-[2.2rem] ml-[70%] md:ml-[22%]	]" />
							</span>
						</div>
					</span>
				</section>

				<span className="px-3 md:px-0">
					<button disabled={!passwordMatch} type="submit" className="reduce_submit_btn">
						Add Staff
					</button>
				</span>
			</form>
		</div>
	);
}

export default addStaff;
