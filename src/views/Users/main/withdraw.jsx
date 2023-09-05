import React, { useState } from "react";
import DataTable from "../utils/dataTable";

function withdraw() {
	const [amount, setAmount] = useState("");
	const [walletType, setWalletType] = useState("");
	const [walletName, setWalletName] = useState("");
	const [walletAddress, setWalletAddress] = useState("");

	const handleSubmit = () => {};

	return (
		<div className="flex flex-col items-center gap-5 md:gap-4 h-full bg-gray-100">
			<form id="withdraw_form" onClick={handleSubmit}>
				<h2 className="text-xl text-yellow-400 font-bold">Start Request</h2>
				<section className="w-full h-full flex flex-col justify-between gap-2 md:gap-5">
					<span>
						<label htmlFor="amount">Amount</label>
						<input className="withdraw_form_input" type="number" id="amount" onChange={(e) => setAmount(e.target.value)} />
					</span>
					<span>
						<label htmlFor="withdraw">Withdraw Type</label>
						<select className="withdraw_form_input" id="withdraw" onChange={(e) => setWalletType(e.target.value)}>
							<option value=""></option>
							<option value="bitcoin">Trading profit</option>
							<option value="ethereum">Account balance</option>
							<option value="usdt">Referral earnings</option>
						</select>
					</span>
					<span>
						<label htmlFor="amount">Wallet Name</label>
						<input className="withdraw_form_input" type="text" id="amount" onChange={(e) => setWalletName(e.target.value)} />
					</span>
					<span>
						<label htmlFor="amount">Wallet Address</label>
						<input className="withdraw_form_input" type="text" id="amount" onChange={(e) => setWalletAddress(e.target.value)} />
					</span>
					<span className="">
						<button id="withdraw_btn" type="submit">
							Submit
						</button>
					</span>
				</section>
			</form>

			<div className="h-[200px] w-full">
				<DataTable tableContext={`Cashout History`} />
			</div>
		</div>
	);
}

export default withdraw;
