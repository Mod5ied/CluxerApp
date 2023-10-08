import React, { useEffect, useState } from "react";
import cancel from "../../../assets/close.svg";
import { ReactSVG } from "react-svg";

function InvestCard({ btn, pack, percent, hideCard, title }) {
	const [showCompute, setShowCompute] = useState(false);
	const [form, setForm] = useState(true);
	const [amount, setAmount] = useState(0);
	const [profit, setProfit] = useState(0);

	const calculateProfit = (amt, percentage) => {
		let result = (percentage / 100) * amt;
		return parseFloat(result.toFixed(1));
	};

	const showForm = () => {
		setShowCompute(!showCompute);
		setForm(!form);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setProfit(calculateProfit(amount, percent));
		setForm(!form);
		setShowCompute(!showCompute);
	};

	return (
		<>
			{form && (
				<div className="flex flex-col justify-between py-8 bg-stone-100 absolute w-[350px] h-[380px] rounded-md">
					<ReactSVG
						onClick={() => hideCard(false)}
						src={cancel}
						className="absolute -right-4 -top-10 p-1 hover:bg-stone-500 duration-200 bg-stone-300 rounded-full text-red-700 text-lg"
					/>
					<div className="flex flex-col justify-between h-full">
						<span className="flex flex-col items-center gap-4">
							<p className="text-stone-900">{title}</p>
							<h2 className="text-stone-900 text-lg font-extrabold uppercase"> {pack || "null"} </h2>
						</span>
						<form onSubmit={handleSubmit} className="flex flex-col items-center gap-3 w-full h-ful">
							<span className="flex flex-row justify-center items-center w-full">
								<p className="text-black font-semibold absolute left-10">USD</p>
								<input
									type="text"
									className="w-[80%] p-2 pl-14 bg-white text-stone-900 shadow-md rounded-md"
									onChange={(e) => setAmount(e.target.value)}
								/>
							</span>
							<button onClick={handleSubmit} className="bg-stone-900 text-stone-100 px-4 py-2 rounded-md">
								{btn}
							</button>
						</form>
					</div>
				</div>
			)}
			{!!showCompute && (
				<div className="flex flex-col justify-between py-8 bg-stone-700 absolute w-[550px] h-[380px] rounded-md">
					<ReactSVG
						onClick={showForm}
						src={cancel}
						className="absolute -right-4 -top-10 p-1 hover:bg-red-500 duration-200 bg-stone-200 rounded-full text-red-700 hover:text-stone-50 text-lg"
					/>
					<div className=" flex flex-col gap-5 bg-stone-700 px-5 py-3 rounded-sm w-full h-full">
						<h3 className="px-3 font-bold text-xl text-yellow-600">Profit Calculation</h3>
						<span className="flex flex-col gap-3">
							<p className="text-stone-50 font-semibold">Investment Pack: {pack}</p>
							<p className="text-stone-50 font-semibold">Amount: ${amount}</p>
							<p className="text-stone-50 font-semibold">Earn ${profit} </p>
							<p className="text-stone-50 font-semibold">Investment Percentage: {percent}% daily </p>
						</span>
					</div>
				</div>
			)}
		</>
	);
}
export default InvestCard;
