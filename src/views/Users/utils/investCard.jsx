import { ReactSVG } from "react-svg";
import cancel from "../../../assets/close.svg";
import React, { useEffect, useState } from "react";
import { execCreateInvestment } from "../../../services/user-services/invest";

function InvestCard({ email, btn, pack, percent, hideCard, title, wallet, updateWallet }) {
	const [success, setSuccess] = useState(false);
	const [failure, setFailure] = useState(false);

	const [amount, setAmount] = useState(0);
	const [resp, setResp] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		execCreateInvestment({ deposit: amount, pack: pack, percent: percent, wallet })
			.then((val) => {
				updateWallet((prevVal) => prevVal - amount);
				setSuccess(val);
			})
			.catch((e) => setFailure(e));

		setTimeout(() => {
			setFailure(false);
			setSuccess(false);
		}, 2000);
	};

	return (
		<div className="flex flex-col justify-between py-8 bg-stone-100 absolute w-[350px] h-[380px] rounded-md">
			{success ? <p className="w-full py-3 text-center bg-green-700 rounded text-stone-50">Successfully Invested ${amount}</p> : null}
			{failure ? <p className="w-full py-3 text-center bg-red-700 rounded text-stone-50">Insufficient funds to invest</p> : null}

			<ReactSVG
				onClick={hideCard}
				src={cancel}
				className="absolute p-1 text-lg text-red-700 duration-200 rounded-full -right-4 -top-10 hover:bg-stone-500 bg-stone-300"
			/>

			<span className="flex flex-col items-center gap-4">
				<p className="text-stone-900">{title}</p>
				<h2 className="text-lg font-extrabold uppercase text-stone-900"> {pack || "null"} </h2>
			</span>
			<form className="flex flex-col items-center w-full gap-3">
				<span className="flex flex-row items-center justify-center w-full">
					<p className="absolute font-semibold text-black left-10">USD</p>
					<input type="text" className="w-[80%] p-2 pl-14 bg-white text-stone-900 shadow-md rounded-md" onChange={(e) => setAmount(e.target.value)} />
				</span>
				<button onClick={handleSubmit} className="px-4 py-2 rounded-md bg-stone-900 text-stone-100">
					{btn}
				</button>
			</form>
		</div>
	);
}
export default InvestCard;
