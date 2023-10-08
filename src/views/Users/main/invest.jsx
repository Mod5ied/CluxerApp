import { ReactSVG } from "react-svg";
import CalcCard from "../utils/calcCard";
import InvestCard from "../utils/investCard";
import check from "../../../assets/checked.svg";
import React, { useEffect, useState } from "react";
import { execCreateInvestment, execFetchInvestments } from "../../../services/user-services/invest";

function invest({ wallet, setPureWallet }) {
	const [btn, seBtn] = useState("");
	const [pack, setPack] = useState("");
	const [title, setTitle] = useState("");
	const [percent, setPercent] = useState(0);
	const [showCard, setShowCard] = useState(false);
	const [showCalc, setShowCalc] = useState(false);
	const [investments, setInvestment] = useState([]);
	const [userAccount, setUserAccount] = useState(localStorage.getItem("userRecord"));

	//? This is the solution to the issue nd would av solved the prob u had.
	const hideCard = () => setShowCard(false);

	const displayCard = (btn, packEvent, percent, title) => {
		seBtn(btn);
		setTitle(title);
		setPack(packEvent);
		setPercent(percent);
		setShowCard(!showCard);
	};
	const displayCalc = (btn, packEvent, percent, title) => {
		seBtn(btn);
		setTitle(title);
		setPack(packEvent);
		setPercent(percent);
		setShowCalc(!showCalc);
	};

	const fetchInvestments = async () => {
		console.log("user-email:", userAccount.email);
		// setInvestment(await execFetchInvestments(userAccount.email));
	};

	// useEffect(async () => {
	// 	await fetchInvestments();
	// }, []);

	const dummy = [
		{ transact_id: "001", plan: "starter", deposit: 100, percent: 1.8, profit: 5, started: "01-06-2023, 12:08:10", status: false },
		{ transact_id: "002", plan: "premium", deposit: 5000, percent: 3.5, profit: 15, started: "03-08-2023, 8:04:15", status: true },
	];
	return (
		<div className="bg-gray-100 flex flex-col gap-4 md:h-full overflow-x-hidden">
			<section className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-6 md:gap-5">
				{showCard && <InvestCard btn={btn} email={userAccount.email} pack={pack} percent={percent} hideCard={hideCard} title={title} wallet={wallet} updateWallet={setPureWallet} />}
				{!!showCalc && <CalcCard btn={btn} pack={pack} percent={percent} hideCard={setShowCalc} title={title} />}

				<div className="invest_cards">
					<span className="flex flex-col md:flex-row justify-between gap-2 md:gap-0 px-5">
						<h3 className="font-bold text-gray-50">Starter Pack</h3>
						<span className="flex flex-row justify-between md:justify-start gap-3">
							<button
								onClick={() => displayCalc("Calculate", "Starter Pack", 1.8, "Calculate Profit")}
								className="bg-slate-100 text-slate-800 px-2 py-1 hover:bg-slate-200 duration-200 rounded-md text-xs font-semibold"
							>
								Calculate profit
							</button>
							<button
								onClick={() => displayCard("Select", "Starter Pack", 1.8, "Select")}
								className="bg-slate-800 text-slate-100 px-2 py-1 hover:bg-slate-700 duration-200 rounded-md text-xs font-bold"
							>
								Purchase plan
							</button>
						</span>
					</span>
					<span className="w-full flex flex-col items-center">
						<p className="text-4xl text-yellow-400"> 100 USD </p>
						<p className="text-sm text-gray-400">For 5 days</p>
					</span>
					<ul className="flex flex-col gap-1 justify-between list-none text-slate-500 text-sm">
						<li className="flex flex-row items-center gap-2 ml-16">
							<ReactSVG src={check} className="text-yellow-400 p-1 bg-stone-800 rounded-full" /> 999 USD max price{" "}
						</li>
						<li className="flex flex-row items-center gap-2 ml-16">
							<ReactSVG src={check} className="text-yellow-400 p-1 bg-stone-800 rounded-full" /> 1.8% daily profit{" "}
						</li>
						<li className="flex flex-row items-center gap-2 ml-16">
							<ReactSVG src={check} className="text-yellow-400 p-1 bg-stone-800 rounded-full" /> 10% referral bonus{" "}
						</li>
					</ul>
				</div>

				<div className="invest_cards">
					<span className="flex flex-col md:flex-row justify-between gap-2 md:gap-0 px-5">
						<h3 className="font-bold text-gray-50">Standard Pack</h3>
						<span className="flex flex-row justify-between md:justify-start gap-3">
							<button
								onClick={() => displayCalc("Calculate", "Standard Pack", 2.5, "Calculate Profit")}
								className="bg-slate-100 text-slate-800 px-2 py-1 hover:bg-slate-200 duration-200 rounded-md text-xs font-semibold"
							>
								Calculate profit
							</button>
							<button
								onClick={() => displayCard("Select", "Standard Pack", 2.5, "Select")}
								className="bg-slate-800 text-slate-100 px-2 py-1 hover:bg-slate-700 duration-200 rounded-md text-xs font-bold"
							>
								Purchase plan
							</button>
						</span>
					</span>
					<span className="w-full flex flex-col items-center">
						<p className="text-4xl text-yellow-400"> 1000 USD </p>
						<p className="text-sm text-gray-400">For 5 days</p>
					</span>
					<ul className="flex flex-col gap-1 justify-between text-slate-500 text-sm">
						<li className="flex flex-row items-center gap-2 ml-16">
							<ReactSVG src={check} className="text-yellow-400 p-1 bg-stone-800 rounded-full" /> 4,999 USD max price{" "}
						</li>
						<li className="flex flex-row items-center gap-2 ml-16">
							<ReactSVG src={check} className="text-yellow-400 p-1 bg-stone-800 rounded-full" /> 2.5% daily profit{" "}
						</li>
						<li className="flex flex-row items-center gap-2 ml-16">
							<ReactSVG src={check} className="text-yellow-400 p-1 bg-stone-800 rounded-full" /> 10% referral bonus{" "}
						</li>
					</ul>
				</div>

				<div className="invest_cards">
					<span className="flex flex-col md:flex-row justify-between gap-2 md:gap-0 px-5">
						<h3 className="font-bold text-gray-50">Premium Pack</h3>
						<span className="flex flex-row justify-between md:justify-start gap-3">
							<button
								onClick={() => displayCalc("Calculate", "Premium Pack", 3, "Calculate Profit")}
								className="bg-slate-100 text-slate-800 px-2 py-1 hover:bg-slate-200 duration-200 rounded-md text-xs font-semibold"
							>
								Calculate profit
							</button>
							<button
								onClick={() => displayCard("Select", "Premium Pack", 3, "Select")}
								className="bg-slate-800 text-slate-100 px-2 py-1 hover:bg-slate-700 duration-200 rounded-md text-xs font-bold"
							>
								Purchase plan
							</button>
						</span>
					</span>
					<span className="w-full flex flex-col items-center">
						<p className="text-4xl text-yellow-400"> 5000 USD </p>
						<p className="text-sm text-gray-400">For 5 days</p>
					</span>
					<ul className="flex flex-col gap-1 justify-between text-slate-500 text-sm">
						<li className="flex flex-row items-center gap-2 ml-16">
							<ReactSVG src={check} className="text-yellow-400 p-1 bg-stone-800 rounded-full" /> 9,999 USD max price{" "}
						</li>
						<li className="flex flex-row items-center gap-2 ml-16">
							<ReactSVG src={check} className="text-yellow-400 p-1 bg-stone-800 rounded-full" /> 3.0% daily profit{" "}
						</li>
						<li className="flex flex-row items-center gap-2 ml-16">
							<ReactSVG src={check} className="text-yellow-400 p-1 bg-stone-800 rounded-full" /> 10% referral bonus{" "}
						</li>
					</ul>
				</div>

				<div className="invest_cards">
					<span className="flex flex-col md:flex-row justify-between gap-2 md:gap-0 px-5">
						<h3 className="font-bold text-gray-50">Professional Pack</h3>
						<span className="flex flex-row justify-between md:justify-start gap-3">
							<button
								onClick={() => displayCalc("Calculate", "Professional Pack", 3.5, "Calculate Profit")}
								className="bg-slate-100 text-slate-800 px-2 py-1 hover:bg-slate-200 duration-200 rounded-md text-xs font-semibold"
							>
								Calculate profit
							</button>
							<button
								onClick={() => displayCard("Select", "Professional Pack", 3.5, "Select")}
								className="bg-slate-800 text-slate-100 px-2 py-1 hover:bg-slate-700 duration-200 rounded-md text-xs font-bold"
							>
								Purchase plan
							</button>
						</span>
					</span>
					<span className="w-full flex flex-col items-center">
						<p className="text-4xl text-yellow-400"> 10,000 USD </p>
						<p className="text-sm text-gray-400">For 5 days</p>
					</span>
					<ul className="flex flex-col gap-1  justify-between text-slate-500 text-sm">
						<li className="flex flex-row items-center gap-2 ml-16">
							<ReactSVG src={check} className="text-yellow-400 p-1 bg-stone-800 rounded-full" /> 15000 USD max price{" "}
						</li>
						<li className="flex flex-row items-center gap-2 ml-16">
							<ReactSVG src={check} className="text-yellow-400 p-1 bg-stone-800 rounded-full" /> 3.5% daily profit{" "}
						</li>
						<li className="flex flex-row items-center gap-2 ml-16">
							<ReactSVG src={check} className="text-yellow-400 p-1 bg-stone-800 rounded-full" /> 10% referral bonus{" "}
						</li>
					</ul>
				</div>
			</section>

			{/* FORM SECTION */}
			<div className="w-full overflow-x-scroll overflow-y-hidden">
				<section className="w-[600px] md:w-full rounded-md bg-stone-900">
					<h3 className="h-[70px] text-gray-50 font-bold p-4"> Investment system </h3>
					<div className="flex flex-col gap-5 border-b border-blue-700 w-[600px] md:w-full">
						<div id="head" className="h-full">
							<span className="flex flex-row items-center h-full">
								<p className="text-blue-700 text-xs text-center w-[60px] md:w-[15%] px-3">S/N</p>
								<p className="text-blue-700 text-xs text-center w-[50%] md:w-[20%]">PLAN</p>
								<p className="text-blue-700 text-xs text-center w-[50%] md:w-[20%]">DEPOSIT</p>
								<p className="text-blue-700 text-xs text-center w-[45%] md:w-[15%]">DAILY PERCENT</p>
								<p className="text-blue-700 text-xs text-center w-[45%] md:w-[15%]">PROFIT</p>
								<p className="text-blue-700 text-xs text-center w-[50%] md:w-[15%]">STARTED</p>
								<p className="text-blue-700 text-xs text-center w-[55%] md:w-[15%]">STATUS</p>
							</span>
						</div>
						{dummy.length === 0 ? (
							<p className="p-2 text-sm">No investments found</p>
						) : (
							dummy.map((item, index) => (
								<div id="data-loaded" className="flex flex-row py-6 text-gray-100" key={index}>
									<p className="text-xs text-stone-200 text-center w-[80px] md:w-[15%] px-3"> {index} </p>
									<p className="text-xs text-stone-200 text-center w-[50%] md:w-[20%]"> {item.plan} </p>
									<p className="text-xs text-stone-200 text-center w-[40%] md:w-[20%]"> {item.deposit} </p>
									<p className="text-xs text-stone-200 text-center w-[45%] md:w-[15%]"> {item.percent} </p>
									<p className="text-xs text-stone-200 text-center w-[40%] md:w-[15%]"> {item.profit} </p>
									<p className="text-xs text-stone-200 text-center w-[40%] md:w-[15%]"> {item.started} </p>
									<p className="text-xs px-3 md:px-0 bg-transparent font-bold text-center w-[50%] md:w-[15%]">
										{!item?.status && (
											<button className="bg-red-600 focus:bg-red-900 px-3 py-1 text-stone-200 w-full md:w-[70%] rounded">
												{" "}
												PENDING{" "}
											</button>
										)}
										{!!item?.status && (
											<button className="bg-red-600 focus:bg-red-900 px-3 py-1 text-stone-200 w-[70%] rounded"> ACTIVE </button>
										)}
									</p>
								</div>
							))
						)}
					</div>
				</section>
			</div>
		</div>
	);
}

export default invest;
