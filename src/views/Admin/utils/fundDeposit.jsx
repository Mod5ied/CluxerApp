import React, { useState } from "react";
import { depositToWallet, execFundDeposit } from "../../../services/user-services/deposits";

function fundDeposit() {
	const [username, setUsername] = useState("");
	const [subjectAmount, setSubjectAmount] = useState("");
	const [showAnimatedDiv, setShowAnimatedDiv] = useState(false);



	const handleUsernameChange = (e) => setUsername(e.target.value);
	const handleSubjectAmountChange = (e) => setSubjectAmount(e.target.value);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await execFundDeposit(username, subjectAmount)
			setTimeout(() => {
				setUsername("");
				setSubjectAmount("")
			}, 3000);
			setTimeout(() => {
				setShowAnimatedDiv(true);
			}, 3000);
			setTimeout(() => {
				setShowAnimatedDiv(false);
			}, 4000);
		} catch (error) {
			console.error("Error making a deposit: ", error);
		}
	};

	return (
		<div className="bg-transparent flex flex-col gap-4 p-2 absolute md:h-[70%] w-full md:w-[80%] top-20">
			{showAnimatedDiv && (
				<animated.div
					style={successMessageStyles}
					id="success"
					className="w-[330px] absolute flex flex-row gap-3 items-center bg-green-500 text-stone-50 px-5 py-3 ml-4 rounded-md"
				>
					<ReactSVG src={successSV} />
					Profit added successfully!
				</animated.div>
			)}
			<section className="flex flex-row justify-between py-2">
				<h2 className="text-xl font-semibold text-gray-100">Fund Deposit</h2>
				<button className="reduce_btn" type="submit">
					List Product
				</button>
			</section>

			<form id="deposit_form_main" onSubmit={handleSubmit}>
				<section className="w-full h-[15%] border-b border-gray-100">
					<h2 className="py-2 text-xl font-semibold md:text-2xl">Fund Deposit</h2>
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
							<input className="input_span_input" type="number" placeholder="Amount" onChange={handleSubjectAmountChange} />
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

export default fundDeposit;
