import React, { useEffect, useState, useContext } from "react";
// import { EventContext } from "../../../main";

function viewPaymentMethod() {
	const [coin, setCoin] = useState("");
	const [address, setAddress] = useState("");

	// const emitter = useContext(EventContext);

	// useEffect(() => {
	// 	// const handler = (val) => setCoin(val);
	// 	const handler = (val) => setCoin(val);

	// 	emitter.on("toggleCoin", handler);

	// 	return () => emitter.off("toggleCoin", handler);
	// }, [emitter]);

	const handleSubmit = () => {};
	const handleCoinChange = (e) => setCoin(e.target.value);
	const handleAddressChange = (e) => setAddress(e.target.value);

	return (
		<div className="bg-transparent flex flex-col gap-8 p-2 absolute h-[70%] w-[80%] top-20">
			<section className="flex flex-row justify-between py-2">
				<h2 className="text-xl font-semibold text-gray-100">View Payment Method</h2>
				<button className="reduce_btn" type="submit">
					Deposit
				</button>
			</section>

			<form id="deposit_form_main" onSubmit={handleSubmit}>
				<section className="w-full h-[15%] border-b border-gray-100">
					<h2 className="py-2 text-xl md:text-xl font-medium">VIEW PAYMENT METHOD</h2>
				</section>

				<section id="signup_form_section">
					<div id="input_section">
						<span className="input_span">
							<label htmlFor="username">Coin Name</label>
							<input className="input_span_input" type="text" placeholder="Coin" onChange={handleCoinChange} />
						</span>
					</div>
					<div id="input_section">
						<span className="input_span">
							<label htmlFor="username">Coin Address</label>
							<input className="input_span_input" type="text" placeholder="Username" onChange={handleAddressChange} />
						</span>
					</div>
				</section>

				<span>
					<button type="submit" className="reduce_submit_btn relative bottom-6">
						Confirm
					</button>
				</span>
			</form>
		</div>
	);
}

export default viewPaymentMethod;
