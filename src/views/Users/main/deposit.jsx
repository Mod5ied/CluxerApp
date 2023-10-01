import { fundWallet, fetchDeposits } from "../../../services/user-services/deposits";
import ConfirmDeposit from "../components/confirmDeposit";
import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import success from "../../../assets/success.svg";
import DataTable from "../utils/dataTable";
import { ReactSVG } from "react-svg";

function deposit() {
	const [resp, setResp] = useState({});
	const [amount, setAmount] = useState(null);
	const [wallet, setWallet] = useState(null);
	const [submitted, setSubmitted] = useState(false);
	const [approvedDepo, setApprovedDepo] = useState([]);
	const [showSuccess, setShowSuccess] = useState(false);
	const [depositRecords, setDepositRecords] = useState([]);
	const currentUser = JSON.parse(localStorage.getItem("userRecord"));

	const delay = (ms) => new Promise((res) => setTimeout(res, ms));
	const handleSelect = (val) => setWallet(val);

	const Progress = () => (
		<div className="hollow-dots-spinner">
			<div className="dot"></div>
			<div className="dot"></div>
			<div className="dot"></div>
		</div>
	);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitted(!submitted);
	};

	const successMessageStyles = useSpring({
		from: { transform: "translateX(-100%)" },
		to: async (next) => {
			await next({ transform: "translateX(0)" });
			await delay(4000);
			await next({ transform: "translateX(-100%)" });
		},
	});

	const getDeposits = async () => {
		try {
			const records = JSON.parse(localStorage.getItem("userDeposits"));
			setDepositRecords(records);
		} catch (error) {
			console.error("Error fetching deposit records: ", error);
		}
	};

	const getApprovedDepo = () =>{
		setApprovedDepo(JSON.parse(localStorage.getItem("approvedDeposit")));
	}

	useEffect(() => {
		getDeposits();
		getApprovedDepo();
		if (resp?.saved) {
			setShowSuccess(true);
			setTimeout(() => {
				setShowSuccess(false);
			}, 4000);
		}
	}, [resp.saved]);

	return (
		<div className="flex flex-col items-center w-full gap-7">
			{showSuccess && resp?.saved && (
				<animated.div
					style={successMessageStyles}
					id="success"
					className="w-[330px] absolute flex flex-row gap-3 items-center bg-green-500 text-stone-50 px-5 py-3 ml-4 rounded-md"
				>
					<ReactSVG src={success} />
					Deposit Registered and Pending!
				</animated.div>
			)}

			{!submitted && (
				<form id="deposit_form" onSubmit={handleSubmit}>
					<h3 className="font-bold text-gray-50">Fund Wallet</h3>
					<span>
						<label htmlFor="amount">Enter Amount</label>
						<input
							required={true}
							className="deposit_form_input"
							inputMode="numeric"
							type="number"
							id="amount"
							onChange={(e) => setAmount(e.target.value)}
						/>
					</span>
					<span>
						<label htmlFor="wallet-drop">Select Currency</label>
						<select className="deposit_form_input" name="wallet" id="wallet-drop" onChange={(e) => handleSelect(e.target.value)}>
							<option value="Bitcoin">Bitcoin</option>
							<option value="Ethereum">Ethereum</option>
							<option value="USDT">USDT</option>
						</select>
					</span>
					<span className="w-1/2">
						<button onClick={handleSubmit} id="btn" type="submit">
							Deposit
						</button>
					</span>
				</form>
			)}

			{!!submitted && <ConfirmDeposit amount={amount} fundDeposit={fundWallet} setSubmitted={setSubmitted} type={wallet} />}

			{/* FORM SECTION */}
			<div className="h-[200px] w-full">
				<DataTable approved={approvedDepo} requests={depositRecords} tableContext={`Deposit Transaction History`} />
			</div>
		</div>
	);
}

export default deposit;
