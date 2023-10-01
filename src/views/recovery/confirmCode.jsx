import React, { useState } from "react";
import { Link } from "react-router-dom";
import { execForgotPassword } from "../../services/auth-services/auth";

function confirmCode() {
	const [code, setCode] = useState("");
	const [loading, setLoading] = useState(false);
	const handleCodeChange = (e) => setCode(e.target.value);

	const handleResetCode = (e) => {
		e.preventDefault()
		setLoading(!loading);

		setTimeout(() => {
			setLoading(false)
		}, 1200);
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

			<form id="reset_form_main" onSubmit={handleResetCode}>
				<div className="w-[400px] px-3 py-2 rounded-sm bg-green-500 text-slate-100">Please enter the Reset Password sent to your Mail</div>
                <section className="w-full h-[10%]">
                <h2 className="py-2 text-xl md:text-2xl font-semibold ">CONFIRM RESET CODE</h2>
                </section>
				<span className="input_span">
					<label htmlFor="username">Enter Reset Code</label>
					<input className="input_span_input" type="email" value={code} placeholder="Email" onChange={handleCodeChange} />
				</span>

				<section className="flex flex-col gap-2">
					<button className="signin_submit_btn" type="submit">
						{!!loading && <Progress />}
						{!loading && "Confirm Reset Code"}
					</button>
					<p className="flex items-center gap-2 text-slate-800">
						Click here to <Link className="text-amber-600" to="/signin">signIn</Link>
					</p>
				</section>
			</form>
		</div>
	);
}

export default confirmCode;
