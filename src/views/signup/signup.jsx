import { ReactSVG } from "react-svg";
import React, { useEffect, useState } from "react";
import view from "../../assets/view.svg";
import success from "../../assets/success.svg";
import { useSpring, animated } from "react-spring";
import { Link, useNavigate } from "react-router-dom";
import { execSignUp } from "../../services/auth-services/auth";
import { CountryDropdown } from "react-country-region-selector";

function signUp() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [resp, setResp] = useState(false);
	const [number, setNumber] = useState("");
	const [country, setCountry] = useState("");
	const [password, setPassword] = useState("");
	const [fullName, setFullname] = useState("");
	const [userName, setUsername] = useState("");
	const [referral, setReferral] = useState("");
	const [loading, setLoading] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSetCountry = (val) => setCountry(val);
	const handlePasswordChange = (e) => setPassword(e.target.value);
	const toggleShowPassword = () => setShowPassword(!showPassword);
	const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
	/*  */
	const handleEmailChange = (e) => setEmail(e.target.value);
	const handleNumberChange = (e) => setNumber(e.target.value);
	const handleFullnameChange = (e) => setFullname(e.target.value);
	const handleUsernameChange = (e) => setUsername(e.target.value);
	const handleReferralChange = (e) => setReferral(e.target.value);

	const Progress = () => (
		<div className="hollow-dots-spinner">
			<div className="dot"></div>
			<div className="dot"></div>
			<div className="dot"></div>
		</div>
	);

	// handleSignUp Method to send data to backend
	const handleSignUp = async (event) => {
		event.preventDefault();
		setLoading(!loading);

		const data = {
			country: country.toLowerCase(),
			email: email.toLowerCase(),
			fullname: fullName.toLowerCase(),
			username: userName.toLowerCase(),
			mobile: number,
			password,
			ref_name: referral.toLowerCase(),
		};

		setResp(await execSignUp(data));
	};

	useEffect(() => {
		if (resp) {
			setShowSuccess(true);
			setTimeout(() => {
				setLoading(!loading);
				setShowSuccess(false);
				navigate("/signin");
			}, 4000);
		}
	}, [resp]);

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
		<div className="h-screen py-12 bg-gray-100 font-body">
			{showSuccess && (
				<animated.div
					style={successMessageStyles}
					id="success"
					className="w-[300px] absolute flex flex-row gap-3 items-center bg-green-500 text-stone-50 px-5 py-3 ml-4 rounded-md"
				>
					<ReactSVG src={success} />
					Account created successfully!
				</animated.div>
			)}
			<form onSubmit={handleSignUp} id="signup_form_main">
				<section className="w-full h-[10%]">
					<h2 className="py-2 text-xl font-semibold border-b md:text-2xl border-slate-200">SIGN-UP</h2>
				</section>

				<section id="signup_form_section">
					<div id="input_section">
						<span className="input_span">
							<input className="input_span_input" type="text" placeholder="Fullname" onChange={handleFullnameChange} />
						</span>
						<span className="input_span">
							<input className="input_span_input" type="text" placeholder="Username" onChange={handleUsernameChange} />
						</span>
						<span className="input_span">
							<input className="input_span_input" type="email" placeholder="Email" onChange={handleEmailChange} />
						</span>
						<span className="input_span">
							<input className="input_span_input" type="number" placeholder="Mobile Number" onChange={handleNumberChange} />
						</span>

						<span className="input_span">
							<CountryDropdown className="input_span_input" value={country} onChange={handleSetCountry} />
						</span>

						<span className="input_span">
							<input className="input_span_input" type="text" placeholder="Referral Name" onChange={handleReferralChange} />
						</span>
						<span className="input_span">
							<input placeholder="Password" className="input_span_input" onChange={handlePasswordChange} type={showPassword ? "text" : "password"} />
							<ReactSVG onClick={toggleShowPassword} src={view} className="absolute mt-3 ml-[70%] md:ml-[28%]" />
						</span>
						<span className="input_span">
							<input
								style={confirmPasswordStyle}
								className="input_span_input"
								placeholder="Confirm Password"
								onChange={handleConfirmPasswordChange}
								type={showPassword ? "text" : "password"}
							/>
							<ReactSVG onClick={toggleShowPassword} src={view} className="absolute mt-3 ml-[70%] md:ml-[28%]	]" />
						</span>
					</div>

					<div id="signup_submit_section">
						<span className="flex flex-row items-center gap-2 p-2">
							<input type="checkbox" />
							<p className="text-stone-800">I accept the conditions</p>
						</span>
						<section className="flex justify-center p-2">
							<button onClick={handleSignUp} type="submit" className="signin_submit_btn">
								{loading ? <Progress /> : "SignUp"}
							</button>
						</section>
						<section className="md:p-2">
							<p className="flex flex-row items-center gap-1 p-2 text-gray-800 md:font-semibold">
								Already have an account?
								<Link className="text-amber-600" to="/signin">
									click to sign-in
								</Link>
							</p>
						</section>
					</div>
				</section>
			</form>
		</div>
	);
}

export default signUp;
