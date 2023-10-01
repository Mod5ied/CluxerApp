import { fetchPendingWithdrawal, requestWithdrawal } from "../../../services/user-services/withdrawals";
import successCV from "../../../assets/success.svg";
import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import DataTable from "../utils/dataTable";
import { ReactSVG } from "react-svg";

function withdraw({ wallet, user }) {
	const [amount, setAmount] = useState(0);
	const [approved, setApproved] = useState(null);
	const [walletType, setWalletType] = useState("");
	const [walletName, setWalletName] = useState("");
	const [walletAddress, setWalletAddress] = useState("");
	const [showErrorDiv, setShowErrorDiv] = useState(false);
	const [showAnimatedDiv, setShowAnimatedDiv] = useState(false);

	const [withdrawals, setWithdrawals] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (amount > wallet) return setShowErrorDiv(!showErrorDiv);
		await requestWithdrawal(amount, walletType, walletName, walletAddress);

		setTimeout(async() => {
			setAmount("");
			setWalletType("");
			setWalletName("");
			setWalletAddress("");
			setShowAnimatedDiv(true);
			await fetchPendingWithdrawal(user.username);
			setShowAnimatedDiv(false);
		}, 500);
	};
	const successMessageStyles = useSpring({
		from: { transform: "translateX(-100%)" },
		to: async (next) => {
			await next({ transform: "translateX(0)" });
			await new Promise(resolve => setTimeout(resolve, 4000));
			await next({ transform: "translateX(-100%)" });
		},
		config: { duration: 1000 }
	});
	
	const errMessageStyles = useSpring({
		from: { transform: "translateX(-100%)" },
		to: async (next) => {
			await next({ transform: "translateX(0)" });
			await new Promise(resolve => setTimeout(resolve, 4500));
			await next({ transform: "translateX(-100%)" });
		},
		config: { duration: 1000 }
	});

	const getApprovedWithdr = ()=>{
		setApproved(JSON.parse(localStorage.getItem('approvedWithdraw')))
	}

	useEffect(() => {
		getApprovedWithdr()
		setTimeout(() => {
			const withdraw = JSON.parse(localStorage.getItem("pendingWithdraw"));
			setWithdrawals(withdraw);
		}, 900);
	}, [showAnimatedDiv]);

	return (
		<div className="flex flex-col items-center h-full gap-5 bg-gray-100 md:gap-4">
			{showAnimatedDiv && (
				<animated.div
					style={successMessageStyles}
					id="success"
					className="w-430px] absolute flex flex-row gap-3 items-center bg-green-500 text-stone-50 px-5 py-3 ml-4 md:ml-14 rounded-md"
				>
					<ReactSVG src={successCV} />
					Withdrawal successfully registered!
				</animated.div>
			)}
			{showErrorDiv && (
				<animated.div
					style={errMessageStyles}
					id="success"
					className="w-[500px] absolute flex flex-row gap-3 items-center bg-red-500 text-stone-50 px-5 py-3 ml-4 md:ml-14 rounded-md"
				>
					Insufficient fund!
				</animated.div>
			)}

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

			<div className="h-[200px] w-full">{!withdrawals ? null : <DataTable tableContext={`Cashout History`} requests={withdrawals} approved={approved} />}</div>
		</div>
	);
}

export default withdraw;
