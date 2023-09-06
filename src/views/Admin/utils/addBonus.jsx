import { ReactSVG } from "react-svg";
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import successSV from "../../../assets/success.svg";
import { execAddToBonus } from "../../../services/user-services/account";

function addBonus() {
	const [username, setUsername] = useState("");
	const [subjectAmount, setSubjectAmount] = useState("");
	const [showAnimatedDiv, setShowAnimatedDiv] = useState(false);

	const handleUsernameChange = (e) => setUsername(e.target.value);
	const handleSubjectAmtChange = (e) => setSubjectAmount(e.target.value);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = {username, amount: subjectAmount };
		await execAddToBonus(data);

		setTimeout(() => {
			setUsername("");
			setSubjectAmount("");
		}, 3000);
		setTimeout(() => {
			setShowAnimatedDiv(true);
		}, 3000);
		setTimeout(() => {
			setShowAnimatedDiv(false);
		}, 4000);
	};

	const successMessageStyles = useSpring({
		from: { transform: "translateX(-100%)" },
		to: async (next) => {
			await next({ transform: "translateX(0)" });
			// await delay(4000);
			await next({ transform: "translateX(-100%)" });
		},
	});

	return (
		<div className="bg-transparent flex flex-col gap-4 p-2 absolute md:h-[70%] w-full md:w-[80%] top-20">
			{showAnimatedDiv && (
				<animated.div
					style={successMessageStyles}
					id="success"
					className="w-[330px] absolute flex flex-row gap-3 items-center bg-green-500 text-stone-50 px-5 py-3 ml-4 md:ml-8 rounded-md"
				>
					<ReactSVG src={successSV} />
					Bonus added successfully!
				</animated.div>
			)}
			
			<section className="flex flex-row justify-between py-2">
				<h2 className="text-xl font-semibold text-gray-100">Add Bonus</h2>
				<button className="reduce_btn" type="submit">
					List Product
				</button>
			</section>

			<form id="deposit_form_main" onSubmit={handleSubmit}>
				<section className="w-full h-[15%] border-b border-gray-100">
					<h2 className="py-2 text-xl font-semibold md:text-2xl">Add Bonus</h2>
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
