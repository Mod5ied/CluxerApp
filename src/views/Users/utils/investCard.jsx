import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import cancel from "../../../assets/close.svg";
import { investAmount } from "../../../services/user-services/invest";

function InvestCard({ pack, hideCard }) {
	const [amount, setAmount] = useState(0);
	const [success, setSuccess] = useState(false);
	const [failure, setFailure] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const resp = await investAmount(amount);
		if (resp) setSuccess(!success);
		else if (!resp) setFailure(!failure);

		setTimeout(() => {
			setFailure(false);
			setSuccess(false);
		}, 1100);
	};

	return (
		<div className="flex flex-col justify-between py-8 bg-stone-100 absolute w-[350px] h-[380px] rounded-md">
			{!!success && <p className="w-full rounded text-center py-3 bg-green-700 text-stone-50">Successfully Invested ${amount}</p>}
			{!!failure && <p className="w-full rounded text-center py-3 bg-red-700 text-stone-50">Insufficient funds to invest</p>}
			<ReactSVG
				onClick={hideCard}
				src={cancel}
				className="absolute -right-4 -top-10 p-1 hover:bg-stone-500 duration-200 bg-stone-300 rounded-full text-red-700 text-lg"
			/>
			<span className="flex flex-col items-center gap-4">
				<p className="text-stone-900">Select</p>
				<h2 className="text-stone-900 text-lg font-extrabold uppercase"> {pack || "null"} </h2>
			</span>
			<form onSubmit={handleSubmit} className="flex flex-col items-center gap-3 w-full">
				<span className="flex flex-row justify-center items-center w-full">
					<p className="text-black font-semibold absolute left-10">USD</p>
					<input type="text" className="w-[80%] p-2 pl-14 bg-white text-stone-900 shadow-md rounded-md" onChange={(e) => setAmount(e.target.value)} />
				</span>
				<button className="bg-stone-900 text-stone-100 px-4 py-2 rounded-md">Select</button>
			</form>
		</div>
	);
}

export default InvestCard;
