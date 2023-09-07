import { ReactSVG } from "react-svg";
import React, { useState } from "react";
import view from "../../../assets/view.svg";
import { useSpring, animated } from "react-spring";
import successSV from "../../../assets/success.svg";
import { execSignUpStaff } from "../../../services/auth-services/auth";

function addStaff() {
	const [showAnimatedDiv, setShowAnimatedDiv] = useState(false);
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

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = { email, username, firstname: firstName, mobile: phone, password };
		await execSignUpStaff(data);

		setTimeout(() => {
			setUsername("");
			setEmail("");
			setFirst("");
			setPhone("");
			setPassword("");
			setConfirmPassword("");
		}, 300);
		setTimeout(() => {
			setShowAnimatedDiv(true);
		}, 2000);
		setTimeout(() => {
			setShowAnimatedDiv(false);
		}, 3000);
	};

	const successMessageStyles = useSpring({
		from: { transform: "translateX(-100%)" },
		to: async (next) => {
			await next({ transform: "translateX(0)" });
			// await delay(4000);
			await next({ transform: "translateX(-100%)" });
		},
	});

	const passwordMatch = password === confirmPassword;
	const confirmPasswordStyle = passwordMatch ? {} : { border: "2px solid red" };

	return (
		<div className="h-[70%] w-full md:w-[80%] bg-transparent flex flex-col gap-4 py-2 px-0 md:p-2 absolute top-20">
			{showAnimatedDiv && (
				<animated.div
					style={successMessageStyles}
					id="success"
					className="w-[330px] absolute flex flex-row gap-3 items-center bg-green-500 text-stone-50 px-5 py-3 ml-4 md:ml-14 rounded-md"
				>
					<ReactSVG src={successSV} />
					Staff added successfully!
				</animated.div>
			)}

			<section className="flex flex-row justify-between px-4 py-2 md:px-0">
				<h2 className="text-xl font-semibold text-gray-100">Add Staff</h2>
				<button onClick={() => useToggleState("addStaff")} className="reduce_btn" type="submit">
					Manage Staff
				</button>
			</section>

			<form id="staff_form_main" onSubmit={handleSubmit}>
				<section className="w-full h-[15%] border-b border-gray-100">
					<h2 className="px-3 py-2 text-xl font-semibold md:px-0 md:text-2xl">Add Staff</h2>
				</section>

				<section id="staff-signup_formSection">
					<span className="flex flex-col justify-between h-full p-2 w-full md:w-[50%]">
						<div className="staff-input_section">
							<span className="input_span">
								<label htmlFor="username">First name</label>
								<input className="input_span_input" type="text" value={firstName} placeholder="First name" onChange={handleFirstname} />
							</span>
						</div>
						<div className="staff-input_section">
							<span className="input_span">
								<label htmlFor="username">Email</label>
								<input className="input_span_input" type="text" value={email} placeholder="Email" onChange={handleEmail} />
							</span>
						</div>
						<div className="staff-input_section">
							<span className="input_span">
								<label htmlFor="username">Password</label>
								<input
									className="input_span_input"
									value={password}
									placeholder="Password"
									type={showPassword ? "text" : "password"}
									onChange={handlePassword}
								/>
							</span>
						</div>
					</span>

					<span className="flex flex-col justify-between h-full p-2 w-full md:w-[50%]">
						<div className="staff-input_section">
							<span className="input_span">
								<label htmlFor="username">Username</label>
								<input className="input_span_input" value={username} type="text" placeholder="Username" onChange={handleUsername} />
							</span>
						</div>
						<div className="staff-input_section">
							<span className="input_span">
								<label htmlFor="username">Phone number</label>
								<input className="input_span_input" value={phone} type="number" placeholder="Phone number" onChange={handlePhone} />
							</span>
						</div>
						<div className="staff-input_section">
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
