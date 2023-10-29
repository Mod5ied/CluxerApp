import { ReactSVG } from "react-svg";
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import successSV from "../../../assets/success.svg";
import arrowDown from "../../../assets/arrow-down.svg";
import { execReduceFund } from "../../../services/user-services/account";

function reduceFunds({ deposits }) {
	const [showDrop, setShowDrop] = useState(false);
	const [username, setUsername] = useState("");
	const [walletType, setWalletType] = useState("");
	const [subjectAmount, setSubjectAmount] = useState("");
	const [showAnimatedDiv, setShowAnimatedDiv] = useState(false);

	const handleWalletChange = (type) => {
		setWalletType(type);
		setShowDrop(false);
	};
	const handleUsernameChange = (e) => setUsername(e.target.value);
	const handleAmountChange = (e) => setSubjectAmount(e.target.value);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = { username, wallet_type: walletType, amount: subjectAmount };
		//todo: edit this function to check if amount is > or < the funds.amount;
		await execReduceFund(data);

		setTimeout(() => {
			setSubjectAmount("");
			setWalletType("");
			setUsername("");
		}, 500);
		setTimeout(() => {
			setShowAnimatedDiv(true);
		}, 1000);
		setTimeout(() => {
			setShowAnimatedDiv(false);
		}, 7000);
	};

	const successMessageStyles = useSpring({
		from: { transform: "translateX(-20%)" },
		to: async (next) => {
			await next({ transform: "translateX(-20)" });
			// await delay(4000);
			await next({ transform: "translateX(-20%)" });
		},
	});

	return (
		<div className="bg-transparent flex flex-col gap-4 p-2 absolute md:h-[70%] w-full md:w-[80%] top-20">
			{showAnimatedDiv && (
				<animated.div
					style={successMessageStyles}
					id="success"
					// className="w-[330px] absolute flex flex-row gap-3 items-center bg-green-500 text-stone-50 px-5 py-3 ml-4 md:ml-8 rounded-md"
					className="absolute flex flex-row items-center gap-3 px-5 py-3 ml-4 bg-green-500 rounded-md text-stone-50 md:ml-8"
				>
					Funds reduced from customers account. It would reflect on their next login!
				</animated.div>
			)}

			<section className="flex flex-row justify-between py-2">
				<h2 className="text-xl font-semibold text-gray-100">Reduce Fund</h2>
				<button className="reduce_btn" type="submit">
					List Product
				</button>
			</section>

			<form id="reduce_form_main" onSubmit={handleSubmit}>
				<section className="w-full h-[15%] border-b border-gray-100">
					<h2 className="py-2 text-xl font-semibold md:text-2xl">Reduce Fund</h2>
				</section>

				<section id="signup_form_section">
					<div id="input_section">
						<span className="input_span">
							<label htmlFor="username">Enter Username</label>
							<input className="input_span_input" type="text" value={username} placeholder="Username" onChange={handleUsernameChange} />
						</span>
					</div>

					<div id="input_section">
						<span className="input_span">
							<label htmlFor="username">Select the wallet type</label>
							<p
								onClick={() => setShowDrop(!showDrop)}
								className="flex flex-row items-center justify-between px-4 py-2 text-gray-700 border rounded-md hover:border-gray-400 focus:ring-2 focus:ring-amber-400 focus:outline-none"
							>
								{walletType || "Fund type"} <ReactSVG src={arrowDown} className="text-gray-900" />
							</p>
							{showDrop && (
								<span class=" w-[460px] h-[100px] mt-16 border absolute rounded bg-gray-300">
									<button className="reduce_Drop" onClick={() => handleWalletChange("bonus")}>
										Referral bonus
									</button>
									<button className="reduce_Drop" onClick={() => handleWalletChange("profit")}>
										Profit
									</button>
									<button className="reduce_Drop" onClick={() => handleWalletChange("deposits")}>
										Wallet
									</button>
								</span>
							)}
						</span>
					</div>

					<div id="input_section">
						<span className="input_span">
							<label htmlFor="username">Enter Subject</label>
							<input className="input_span_input" type="number" value={subjectAmount} placeholder="Amount" onChange={handleAmountChange} />
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
