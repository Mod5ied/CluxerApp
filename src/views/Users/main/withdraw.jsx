import React, { useEffect, useState } from "react";
import DataTable from "../utils/dataTable";
import { requestWithdrawal } from "../../../services/user-services/withdrawals";

function withdraw() {
	const [amount, setAmount] = useState(0);
	const [walletType, setWalletType] = useState("");
	const [walletName, setWalletName] = useState("");
	const [walletAddress, setWalletAddress] = useState("");

	const [withdrawals, setWithdrawals] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		await requestWithdrawal(amount, walletType, walletName, walletAddress);

		setTimeout(() => {
			setAmount("");
			setWalletType("");
			setWalletName("");
			setWalletAddress("");
		}, 500);
	};

	useEffect(() => {
		setTimeout(() => {
			const withdraw = JSON.parse(localStorage.getItem("pendingWithdraw"));
			setWithdrawals(withdraw);
		}, 600);
	}, []);

	return (
		<div className="flex flex-col items-center h-full gap-5 bg-gray-100 md:gap-4">
			<form id="withdraw_form" onSubmit={handleSubmit}>
				<h2 className="text-xl font-bold text-yellow-400">Start Withdraw Request</h2>
				<section className="flex flex-col justify-between w-full h-full gap-2 md:gap-5">
					<span>
						<label htmlFor="amount">Amount</label>
						<input className="withdraw_form_input" value={amount} type="number" id="amount" onChange={(e) => setAmount(e.target.value)} />
					</span>
					<span>
						<label htmlFor="withdraw">Withdraw Type</label>
						<select className="withdraw_form_input" value={walletType} id="withdraw" onChange={(e) => setWalletType(e.target.value)}>
							<option value=""></option>
							<option value="bitcoin">Trading profit</option>
							<option value="ethereum">Account balance</option>
							<option value="usdt">Referral earnings</option>
						</select>
					</span>
					<span>
						<label htmlFor="amount">Wallet Name</label>
						<input className="withdraw_form_input" value={walletName} type="text" id="amount" onChange={(e) => setWalletName(e.target.value)} />
					</span>
					<span>
						<label htmlFor="amount">Wallet Address</label>
						<input className="withdraw_form_input" value={walletAddress} type="text" id="amount" onChange={(e) => setWalletAddress(e.target.value)} />
					</span>
					<span className="">
						<button id="withdraw_btn" type="submit">
							Submit
						</button>
					</span>
				</section>
			</form>

			<div className="h-[200px] w-full">
				
				{!withdrawals ? null : <DataTable tableContext={`Cashout History`} requests={withdrawals} />}
			</div>
		</div>
	);
}

export default withdraw;
