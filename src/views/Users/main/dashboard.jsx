import Avatar from "../../../components/avatar";
import Sidebar from "../components/sidebar";
import menu from "../../../assets/bars.svg";
import Referrals from "../utils/referrals";
import Security from "../utils/security";
import Account from "../utils/account";
import Support from "../utils/support";
import Deposit from "./deposit";
import Withdraw from "./withdraw";
import Metrics from "./metrics";
import Invest from "./invest";
import { usersState } from "../../../services/state/state";
import React, { useState, useEffect, useRef } from "react";
import { ReactSVG } from "react-svg";
import { useRecoilState } from "recoil";
import { isMobile } from "react-device-detect";
import TawkTo from "../../Tawkto";

function userDashboard() {
	const [stateGuest, setStateGuest] = useRecoilState(usersState);

	const [width, setWidth] = useState(isMobile ? "0%" : "16%");
	const isClicked = useRef(false);
	const sidebarRef = useRef(null);
	// const [users, setUsers] = useState([]);
	const [userData, setUserData] = useState({});
	const [userBonus, setUserBonus] = useState([]);
	const [totalBonuss, setTotalBonus] = useState(0);
	const [userWallet, setUserWallet] = useState({});
	const [userProfits, setUserProfits] = useState([]);
	const [pendingWithdraw, setPendingWith] = useState({});
	const [referrals, setReferrals] = useState(0);

	const [rawWallet, setRawWallet] = useState(null);
	const [rawCollects, setRawCollects] = useState(null);
	const [pureWallet, setPureWallet] = useState(null);

	const handleMouseOver = () => {
		if (!isClicked.current) {
			// setWidth("16%");
			if (isMobile) {
				setWidth(isClicked.current ? "50%" : "0%");
			} else {
				setWidth(isClicked.current ? "16%" : "4%");
			}
		}
	};

	const handleMouseOut = () => {
		if (!isClicked.current) {
			// setWidth("4%");
			if (isMobile) {
				setWidth(isClicked.current ? "50%" : "0%");
			} else {
				setWidth(isClicked.current ? "16%" : "4%");
			}
		}
	};

	useEffect(() => {
		const sidebarElement = sidebarRef.current;
		sidebarElement.addEventListener("mouseover", handleMouseOver);
		sidebarElement.addEventListener("mouseout", handleMouseOut);
		const userRecord = localStorage.getItem("userRecord");

		if (userRecord) {
			setUserData(JSON.parse(userRecord));
			setUserBonus(JSON.parse(localStorage.getItem("bonus")));
			setUserWallet(JSON.parse(localStorage.getItem("userDeposits")));
			setUserProfits(JSON.parse(localStorage.getItem("userProfits")));
			setPendingWith(JSON.parse(localStorage.getItem("pendingWithdraw")));

			const approvedDepo = JSON.parse(localStorage.getItem("approvedDeposit"));
			const rawWalletSum = approvedDepo.reduce((total, doc) => total + (parseInt(doc.amount) || 0), 0);
			setRawWallet(rawWalletSum);

			const approvedWithdr = JSON.parse(localStorage.getItem("approvedWithdraw"));
			const rawCollectSum = approvedWithdr.reduce((total, doc) => total + (parseInt(doc.amount) || 0), 0);
			setRawCollects(rawCollectSum);

			const investments = JSON.parse(localStorage.getItem("investments"));
			const rawInvestmentsSum = investments?.reduce((total, doc) => total + (parseInt(doc.deposit) || 0), 0);

			const reducedFunds = JSON.parse(localStorage.getItem("reducedFunds"));

			const totalBonusDoc = JSON.parse(localStorage.getItem("bonus"));
			const totalBonus = totalBonusDoc.reduce((total, doc) => total + (parseInt(doc.amount) || 0), 0);
			setTotalBonus(totalBonus);

			const profits = JSON.parse(localStorage.getItem("userProfits"));
			const totalProfits = profits.reduce((total, profit) => total + (parseInt(profit.amount) || 0), 0);
			// sumTotalProfits(totalProfits);

			const fundedDeposit = JSON.parse(localStorage.getItem("fundedDeposit"));
			const sumFundedDeposit = fundedDeposit.reduce((total, profit) => total + (parseInt(profit.amount) || 0), 0);

			const referrals = JSON.parse(localStorage.getItem("referrals"));
			const totalReferrals = referrals.reduce((total, doc) => total + (parseInt(doc.amount) || 0), 0);
			setReferrals(totalReferrals);

			// Filter the 'reducedFunds' array to only include documents with 'wallet_type' of 'deposits'
			const depositDocs = reducedFunds.filter((doc) => doc?.wallet_type === "deposits");

			// Use the 'reduce' method to sum the 'amount' property of the filtered documents
			const reducedFundsSum = depositDocs.reduce((total, doc) => total + (parseInt(doc.amount) || 0), 0);

			let pureWalletResult = rawWalletSum - rawCollectSum;

			// Check if rawInvestmentsSum is a valid integer
			if (Number.isInteger(rawInvestmentsSum) && rawInvestmentsSum > 0) {
				pureWalletResult -= rawInvestmentsSum;
			}
			setPureWallet(pureWalletResult + sumFundedDeposit + totalProfits + totalBonus + totalReferrals - reducedFundsSum);
		}	
		return () => {
			sidebarElement.removeEventListener("mouseover", handleMouseOver);
			sidebarElement.removeEventListener("mouseout", handleMouseOut);
		};
	}, []);

	const handleClick = () => {
		isClicked.current = !isClicked.current;
		if (isMobile) {
			setWidth(isClicked.current ? "50%" : "0%");
		} else {
			setWidth(isClicked.current ? "16%" : "4%");
		}
	};

	return (
		<div className="flex flex-row w-full h-screen font-para">
			<section
				ref={sidebarRef}
				id="sidebar"
				className="fixed top-0 z-30 h-full overflow-hidden bg-stone-800"
				style={{ width, left: isMobile && width === "0%" ? "-100%" : "0", transition: "width 0.5s, left 0.5s" }}
			>
				<Sidebar handleShow={handleClick} width={width} />
			</section>
			<section id="main" className={`flex w-full flex-col gap-8 h-full px-5 ${width == "16%" ? "md:ml-64" : "md:ml-20"}`}>
				<header className="fixed top-0 right-0 z-20 px-3 md:px-0 flex items-center justify-between gap-1 bg-gray-100 opacity-95 border-b w-full h-[70px]">
					<ReactSVG onClick={handleClick} id="hamburger-icon" src={menu} />
					<span className="flex items-center">
						<Avatar />
						<h3 className="text-sm font-bold text-gray-600 md:mr-10 md:text-xl">{pureWallet}</h3>
					</span>
				</header>
				<main className="relative w-full bg-gray-100 top-20 md:top-24">
					{stateGuest.accountPage && <Account userAccount={userData} />}
					{stateGuest.dashboard && (
						<Metrics referrals={referrals} userAccount={userData} userBonus={totalBonuss} userProfits={userProfits} userWallet={pureWallet} width={width} />
					)}
					{stateGuest.referralsPage && <Referrals referrals={referrals} />}
					{stateGuest.withdrawPage && <Withdraw user={userData} wallet={pureWallet} pendingWithdraws={pendingWithdraw} />}
					{stateGuest.securityPage && <Security userAccount={userData} />}
					{stateGuest.depositPage && <Deposit />}
					{stateGuest.supportPage && <Support />}
					{stateGuest.investPage && <Invest wallet={pureWallet} setPureWallet={setPureWallet} />}
				</main>
			</section>
			<TawkTo />
		</div>
	);
}

export default userDashboard;
