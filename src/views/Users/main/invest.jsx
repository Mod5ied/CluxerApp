import React from "react";
import { ReactSVG } from "react-svg";
import DataTable from "../utils/dataTable";
import check from "../../../assets/checked.svg";

function invest() {
	return (
		<div className="bg-gray-100 flex flex-col gap-4 md:h-full">
			<section className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-6 md:gap-5">
				<div className="invest_cards">
					<span className="flex flex-col md:flex-row justify-between gap-2 md:gap-0 px-5">
						<h3 className="font-bold text-gray-50">Starter Pack</h3>
						<span className="flex flex-row justify-between md:justify-start gap-3">
							<button className="bg-slate-100 text-slate-800 px-2 py-1 hover:bg-slate-200 duration-200 rounded-md text-xs font-semibold">
								Calculate profit
							</button>
							<button className="bg-slate-800 text-slate-100 px-2 py-1 hover:bg-slate-700 duration-200 rounded-md text-xs font-bold">
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
							<button className="bg-slate-100 text-slate-800 px-2 py-1 hover:bg-slate-200 duration-200 rounded-md text-xs font-semibold">
								Calculate profit
							</button>
							<button className="bg-slate-800 text-slate-100 px-2 py-1 hover:bg-slate-700 duration-200 rounded-md text-xs font-bold">
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
							<button className="bg-slate-100 text-slate-800 px-2 py-1 hover:bg-slate-200 duration-200 rounded-md text-xs font-semibold">
								Calculate profit
							</button>
							<button className="bg-slate-800 text-slate-100 px-2 py-1 hover:bg-slate-700 duration-200 rounded-md text-xs font-bold">
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
							<button className="bg-slate-100 text-slate-800 px-2 py-1 hover:bg-slate-200 duration-200 rounded-md text-xs font-semibold">
								Calculate profit
							</button>
							<button className="bg-slate-800 text-slate-100 px-2 py-1 hover:bg-slate-700 duration-200 rounded-md text-xs font-bold">
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
			<div className="h-[200px] w-full">
				<DataTable tableContext={`Deposit Transaction History`} />
			</div>
		</div>
	);
}

export default invest;
