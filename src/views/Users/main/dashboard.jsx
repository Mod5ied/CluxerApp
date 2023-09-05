import Avatar from "../../../components/avatar";
import Sidebar from "../components/sidebar";
import menu from "../../../assets/bars.svg";
import Referrals from "../utils/referrals";
import Security from "../utils/security";
import Account from "../utils/account";
import Support from "../utils/support";
import Deposit from "../main/deposit";
import Withdraw from "./withdraw";
import Metrics from "./metrics";
import Invest from "./invest";
import { usersState } from "../../../services/state/state";
import React, { useState, useEffect, useRef } from "react";
import { ReactSVG } from "react-svg";
import { useRecoilState } from "recoil";
import { isMobile } from "react-device-detect";

// import { fetchWalletData } from "../../../services/user-services/account";

function userDashboard() {
	const [stateGuest, setStateGuest] = useRecoilState(usersState);

	const [width, setWidth] = useState(isMobile ? "0%" : "16%");
	const isClicked = useRef(false);
	const sidebarRef = useRef(null);
	const [userData, setUserData] = useState({});
	const [userWallet, setUserWallet] = useState({});
	const [userProfits, setUserProfits] = useState({});

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
		const userWalletData = localStorage.getItem("userWallet");
		const userRecord = localStorage.getItem("userRecord");
		const userProfits = localStorage.getItem("userProfits");

		if (userWalletData && userRecord) {
			const parsedUserWalletData = JSON.parse(userWalletData);
			const parsedUserRecord = JSON.parse(userRecord);
			const parsedUserProfits = JSON.parse(userProfits);
			setUserWallet(parsedUserWalletData);
			setUserProfits(parsedUserProfits);
			setUserData(parsedUserRecord);
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
						<h3 className="text-sm font-bold text-gray-600 md:mr-10 md:text-xl"> ${userWallet.amount} </h3>
					</span>
				</header>
				<main className="relative w-full bg-gray-100 top-20 md:top-24">
					{stateGuest.accountPage && <Account userAccount={userData} />}
					{stateGuest.dashboard && <Metrics userAccount={userData} userProfits={userProfits} userWallet={userWallet} width={width} />}
					{stateGuest.referralsPage && <Referrals />}
					{stateGuest.withdrawPage && <Withdraw />}
					{stateGuest.securityPage && <Security userAccount={userData} />}
					{stateGuest.depositPage && <Deposit />}
					{stateGuest.supportPage && <Support />}
					{stateGuest.investPage && <Invest />}
				</main>
			</section>
		</div>
	);
}

export default userDashboard;
