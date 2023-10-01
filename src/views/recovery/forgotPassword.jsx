import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { execForgotPassword } from "../../services/auth-services/auth";

function forgotPassword() {
	const [email, setEmail] = useState("");
	const [err, setErr] = useState(null);
	const [loading, setLoading] = useState(false);
	const handleEmailChange = (e) => setEmail(e.target.value);
	const navigate = useNavigate();

	const handleForgotPassword = async (e) => {
		e.preventDefault();
		setLoading(!loading);
		setErr(await execForgotPassword(email));
		if (!err) {
			return;
		} else {
			setTimeout(() => {
				setLoading(false);
				setErr(false);
				navigate("/confirm_reset_otp");
			}, 1200);
		}
	};

	const Progress = () => (
		<div className="hollow-dots-spinner">
			<div className="dot"></div>
			<div className="dot"></div>
			<div className="dot"></div>
		</div>
	);

	return (
		<div className="bg-gray-100 h-screen py-12 font-body">
			<form id="reset_form_main" onSubmit={handleForgotPassword}>
				{!!err && <div className="w-[400px] px-3 py-2 rounded-sm bg-red-500 text-slate-100">User does not exists in our database</div>}
				{err && <div className="w-[400px] px-3 py-2 rounded-sm bg-green-500 text-slate-100">User does not exists in our database</div>}
				<section className="w-full h-[10%]">
					<h2 className="py-2 text-xl md:text-2xl font-semibold ">RESET PASSWORD</h2>
				</section>
				<span className="input_span">
					<label htmlFor="username">Username</label>
					<input className="input_span_input" type="email" value={email} placeholder="Email" onChange={handleEmailChange} />
				</span>

				<section className="flex flex-col gap-2">
					<button className="signin_submit_btn" type="submit">
						{!!loading && <Progress />}
						{!loading && "Reset Password"}
					</button>
					<p className="flex items-center gap-2 text-slate-800">
						Click here to{" "}
						<Link className="text-amber-600" to="/signin">
							signIn
						</Link>
					</p>
				</section>
			</form>
		</div>
	);
}

export default forgotPassword;
