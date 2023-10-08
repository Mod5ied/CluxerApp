import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { createMethod } from "../../../services/user-services/invest";
import { ReactSVG } from "react-svg";
import success from "../../../assets/success.svg"

function addMethod() {
	const [showSuccess, setShowSuccess] = useState(false);
	const [address, setAddress] = useState();
	const [coin, setCoin] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (await createMethod(coin, address)) setShowSuccess(true);
        else throw new Error("Failed to set method!")
		setTimeout(() => {
			setShowSuccess(false);
            document.getElementById("deposit_form_main").reset();
		}, 1200);
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
		<div className="bg-transparent flex flex-col gap-8 p-2 absolute md:h-[70%] w-full md:w-[80%] top-20">
			{showSuccess && (
				<animated.div
					style={successMessageStyles}
					id="success"
					className="w-[300px] absolute flex flex-row gap-3 items-center bg-green-500 text-stone-50 px-5 py-3 ml-4 rounded-md"
				>
					<ReactSVG src={success} />
					Method added successfully! Now, logout and sign-in to refresh.
				</animated.div>
			)}
			<form id="deposit_form_main" onSubmit={handleSubmit}>
				<section className="w-full h-[15%] border-b border-gray-100">
					<h2 className="py-2 text-xl font-semibold md:text-2xl">Add New Payment Method</h2>
				</section>

				<section id="signup_form_section">
					<div id="input_section">
						<span className="input_span">
							<label htmlFor="coin">Enter Coin</label>
							<input className="input_span_input" type="text" placeholder="Coin" onChange={(e) => setCoin(e.target.value)} />
						</span>
					</div>

					<div id="input_section">
						<span className="input_span">
							<label htmlFor="address">Enter Address</label>
							<input className="input_span_input" type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
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

export default addMethod;
