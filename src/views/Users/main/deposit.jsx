import { depositToWallet, fetchDepositRecords } from "../../../services/user-services/deposits";
import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import success from "../../../assets/success.svg";
import DataTable from "../utils/dataTable";
import { ReactSVG } from "react-svg";

function deposit() {
	const [resp, setResp] = useState({});
	const [amount, setAmount] = useState(null);
	const [wallet, setWallet] = useState(null);
	const handleSelect = (val) => setWallet(val);
	const [showSuccess, setShowSuccess] = useState(false);
	const [depositRecords, setDepositRecords] = useState([]);
	const delay = (ms) => new Promise((res) => setTimeout(res, ms));

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setResp(await depositToWallet(amount, wallet));
			setAmount(null);
			setWallet(null);
		} catch (error) {
			console.error("Error depositing to wallet: ", error);
		}
	};

	const successMessageStyles = useSpring({
		from: { transform: "translateX(-100%)" },
		to: async (next) => {
			await next({ transform: "translateX(0)" });
			await delay(4000);
			await next({ transform: "translateX(-100%)" });
		},
	});

	const fetchDeposits = async () => {
		try {
			const records = await fetchDepositRecords();
			setDepositRecords(records);
		} catch (error) {
			console.error("Error fetching deposit records: ", error);
		}
	};

	useEffect(() => {
    fetchDeposits()
		if (resp?.saved) {
			setShowSuccess(true);
			setTimeout(() => {
				setShowSuccess(false);
			}, 4000);
		}
	}, [resp.saved]);

	return (
		<div className="flex flex-col items-center w-full gap-7 bg-red-400-100">
			{showSuccess && resp?.saved && (
				<animated.div
					style={successMessageStyles}
					id="success"
					className="w-[300px] absolute flex flex-row gap-3 items-center bg-green-500 text-stone-50 px-5 py-3 ml-4 rounded-md"
				>
					<ReactSVG src={success} />
					{resp?.message}
				</animated.div>
			)}
			<form id="deposit_form" onSubmit={handleSubmit}>
				<h3 className="font-bold text-gray-50">Fund Wallet</h3>
				<span>
					<label htmlFor="amount">Enter Amount</label>
					<input className="deposit_form_input" inputMode="numeric" type="number" id="amount" onChange={(e) => setAmount(e.target.value)} />
				</span>
				<span>
					<label htmlFor="amount">Select Currency</label>
					<select className="deposit_form_input" name="wallet" id="wallet-drop" onChange={(e) => handleSelect(e.target.value)}>
						<option value="bitcoin">Bitcoin</option>
						<option value="ethereum">Ethereum</option>
						<option value="usdt">USDT</option>
					</select>
				</span>
				<span className="w-1/2">
					<button onClick={handleSubmit} id="btn" type="submit">
						Deposit
					</button>
				</span>
			</form>

			{/* FORM SECTION */}
			<div className="h-[200px] w-full">
				<DataTable tableData={depositRecords} tableContext={`Deposit Transaction History`} />
			</div>
		</div>
	);
}

export default deposit;
