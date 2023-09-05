import React, { useState } from "react";
import { Link } from "react-router-dom";

function forgotPassword() {
	const [email, setEmail] = useState("");
	const handleEmailChange = (e) => setEmail(e.target.value);

	const handleForgotPassword = () => {};

	return (
		<div className="bg-gray-100 h-screen py-12">
			<form id="reset_form_main" onSubmit={handleForgotPassword}>
                <section className="w-full h-[10%]">
                <h2 className="py-2 text-xl md:text-2xl font-semibold border-b border-slate-200">RESET PASSWORD</h2>
                </section>
				<span className="input_span">
					<label htmlFor="username">Username</label>
					<input className="input_span_input" type="email" value={email} placeholder="Email" onChange={handleEmailChange} />
				</span>

				<section className="flex flex-col gap-2">
					<button className="signin_submit_btn" type="submit">
						Reset Password
					</button>
					<p className="flex items-center gap-2">
						{" "}
						Click here to <Link className="text-amber-600" to="/signin">signIn</Link>{" "}
					</p>
				</section>
			</form>
		</div>
	);
}

export default forgotPassword;
