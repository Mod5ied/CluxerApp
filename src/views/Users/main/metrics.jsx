import React, { useEffect, useState } from "react";
import check from "../../../assets/check.svg";
import copy from "../../../assets/copy.svg";
import { ReactSVG } from "react-svg";

function metrics({ referrals,userAccount, userBonus, userProfits, userWallet, width }) {
	const [twoFactAuth, setTwoFActAuth] = useState(false);
	const [sideWidth, setWidth] = useState(width);
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		setWidth(width);
	}, [width]);

	async function handleCopy() {
		const inputElement = document.querySelector('input[type="text"]');
		await navigator.clipboard.writeText(inputElement.value);
		setCopied(!copied);
		setTimeout(() => setCopied((prev) => !prev), 900);
	}
	function handleInput() {}

	return (
		<div className="flex flex-col md:flex-row gap-4 md:gap-0 h-[330px] w-full bg-gray-100">
			<section className="w-full md:w-[65%] flex flex-col gap-5">
				<div className="flex flex-col gap-5 md:flex-row">
					<span className="dash_cards">
						<h3>Wallet Balance</h3>
						<p> $ {userWallet || 0} </p>
					</span>
					<span className="dash_cards">
						<h3>Available Profit</h3>
						<p> $ {userProfits.reduce((total, profit) => total + parseInt(profit.amount), 0) || 0} </p>
					</span>
				</div>
				<div className="flex flex-col gap-5 md:flex-row">
					<span className="dash_cards">
						<h3>Referral Earnings</h3>
						<p> $ {referrals || 0} </p>
					</span>
					<span className="dash_cards">
						<h3>2FA Security</h3>
						<button> {!twoFactAuth ? "DISABLED" : "ENABLED"} </button>
					</span>
				</div>
				<div className="flex flex-col w-full gap-5 md:flex-row">
					<span className="w-full dash_cards">
						<h3>Total Bonus</h3>
						<p> $ {userBonus || 0} </p>
					</span>
					<span className="invisible w-full dash_cards">
						<h3></h3>
						<p> </p>
					</span>
				</div>
				
			</section>

			<section className="w-full md:w-[35%] md:px-3">
				<span className="dash_cards_ref">
					<h3 className="h-[33%] font-bold">Referral Link</h3>
					<p className="mt-5 text-sm">
						Automatically top up your account balance by sharing your referral link, Earn a percentage of whatever plan your referred user buys.
					</p>
					<span className="flex flex-row items-center w-full mt-2 border border-gray-500 rounded-md">
						<input type="text" value={`https://www.blockvault.com/?refid=${userAccount.username}`} className="text-sm" onChange={handleInput} />
						<div onClick={handleCopy} className="px-4 py-2 bg-blue-800 w-[15%] rounded-r-md hover:bg-blue-600 duration-200">
							{!copied ? <ReactSVG src={copy} className="text-gray-100" /> : <ReactSVG src={check} className="font-extrabold text-gray-200" />}
						</div>
					</span>
				</span>
			</section>
		</div>
	);
}

export default metrics;
