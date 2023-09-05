import React, { useState } from "react";

function addBonus() {
	const [username, setUsername] = useState("");
	const [subjectAmount, setSubjectAmount] = useState("");

	const handleUsernameChange = (e) => setUsername(e.target.value);
	const handleSubjectAmtChange = (e) => setSubjectAmount(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className="bg-transparent flex flex-col gap-4 p-2 absolute md:h-[70%] w-full md:w-[80%] top-20">
			<section className="flex flex-row justify-between py-2">
				<h2 className="text-xl font-semibold text-gray-100">Add Bonus</h2>
				<button className="reduce_btn" type="submit">
					List Product
				</button>
			</section>

			<form id="deposit_form_main" onSubmit={handleSubmit}>
				<section className="w-full h-[15%] border-b border-gray-100">
					<h2 className="py-2 text-xl md:text-2xl font-semibold">Add Bonus</h2>
				</section>

				<section id="signup_form_section">
					<div id="input_section">
						<span className="input_span">
							<label htmlFor="username">Enter Username</label>
							<input className="input_span_input" type="text" placeholder="Username" onChange={handleUsernameChange} />
						</span>
					</div>

					<div id="input_section">
						<span className="input_span">
							<label htmlFor="username">Enter Subject</label>
							<input className="input_span_input" type="number" placeholder="Amount" onChange={handleSubjectAmtChange} />
						</span>
					</div>
				</section>

				<span>
					<button type="submit" className="reduce_submit_btn">
						Add Subject
					</button>
				</span>
			</form>
		</div>
	);
}

export default addBonus;
