import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import arrowDown from "../../../assets/arrow-down.svg";

function reduceFunds() {
	const [username, setUsername] = useState("");
	const [showDrop, setShowDrop] = useState(false);
	const [walletType, setWalletType] = useState("Referral demo");
	const [subjectAmount, setSubjectAmount] = useState("");

	const handleWalletChange = (type) => {
		setWalletType(type), setShowDrop(false);
	};
	const handleUsernameChange = (e) => setUsername(e.target.value);
	const handleAmountChange = (e) => setSubjectAmount(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className="bg-transparent flex flex-col gap-4 p-2 absolute md:h-[70%] w-full md:w-[80%] top-20">
			<section className="flex flex-row justify-between py-2">
				<h2 className="text-xl font-semibold text-gray-100">Reduce Fund</h2>
				<button className="reduce_btn" type="submit">
					List Product
				</button>
			</section>

			<form id="reduce_form_main" onSubmit={handleSubmit}>
				<section className="w-full h-[15%] border-b border-gray-100">
					<h2 className="py-2 text-xl md:text-2xl font-semibold">Reduce Fund</h2>
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
							<label htmlFor="username">Select the wallet type</label>
							<p
								onClick={() => setShowDrop(!showDrop)}
								className="px-4 py-2 flex flex-row justify-between items-center border rounded-md hover:border-gray-400 focus:ring-2 focus:ring-amber-400 focus:outline-none"
							>
								{walletType || "Referral demo"} <ReactSVG src={arrowDown} />
							</p>
							{showDrop && (
								<span class=" w-[460px] h-[100px] mt-16 border absolute rounded bg-gray-300">
									<button className="reduce_Drop" onClick={() => handleWalletChange("Referral bonus")}>
										Referral bonus
									</button>
									<button className="reduce_Drop" onClick={() => handleWalletChange("Profit")}>
										Profit
									</button>
									<button className="reduce_Drop" onClick={() => handleWalletChange("Wallet")}>
										Wallet
									</button>
								</span>
							)}
						</span>
					</div>

					<div id="input_section">
						<span className="input_span">
							<label htmlFor="username">Enter Subject</label>
							<input className="input_span_input" type="number" placeholder="Amount" onChange={handleAmountChange} />
						</span>
					</div>

					<span>
						<button type="submit" className="reduce_submit_btn">
							Reduce Fund
						</button>
					</span>
				</section>
			</form>
		</div>
	);
}

export default reduceFunds;
