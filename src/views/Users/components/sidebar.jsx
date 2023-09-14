import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import key from "../../../assets/key.svg";
import bars from "../../../assets/bars.svg";
import home from "../../../assets/home.svg";
import close from "../../../assets/close.svg";
import power from "../../../assets/power.svg";
import chart from "../../../assets/chart.svg";
import wallet from "../../../assets/wallet.svg";
import account from "../../../assets/account.svg";
import compass from "../../../assets/compass.svg";
import deposit from "../../../assets/deposit.svg";
import lifeguard from "../../../assets/lifeguard.svg";
import logo from "../../../assets/Cluxtercoin Logo3.png";
import { usersState, useToggleState } from "../../../services/state/state";
import { isMobile } from "react-device-detect";
import { execSignOut } from "../../../services/auth-services/auth";

function sidebar({ handleShow, width }) {
	const [sideWidth, setSideWidth] = useState(width);
	const toggleGuestState = useToggleState(usersState);
	const navigate = useNavigate();

	useEffect(() => {
		setSideWidth(width);
	}, [width]);

	const handleLogout = () => {
		execSignOut();
		navigate("/signin");
	};
	const toAdmin = () => navigate("/");

	return (
		<section className="flex flex-col items-center h-full gap-10 py-5 overflow-hidden bg-transparent">
			<div className="w-full h-[34px] flex flex-row-reverse justify-around items-center cursor-pointer">
				<ReactSVG onClick={handleShow} src={bars} className="hidden text-gray-100 md:block " />
				<ReactSVG onClick={handleShow} src={close} className="block text-gray-100 md:hidden " />

				{/* {isMobile || sideWidth == "16%" ? <img onClick={toAdmin} src={cluxter_logo} alt="cluxtercoin-logo" className="w-[38%] h-full" /> : null} */}
				{isMobile || sideWidth == "16%" ? (
					<div onClick={toAdmin} className="flex flex-row items-center gap-1 px-4 font-body">
						<img src={logo} alt="blockvault" className="w-[20%] h-full" />
						<p className="text-white text-lg font-bold">BLOCKVAULT</p>
					</div>
				) : null}
			</div>

			{/* second section */}
			<div className="flex flex-col gap-4 h-[210px] w-full">
				<button
					onClick={() => toggleGuestState("dashboard")}
					title="Dashboard"
					className={`${isMobile || sideWidth === "16%" ? "sidebar-links" : "sidebar-links-center"}`}
				>
					<ReactSVG src={home} />
					{isMobile || sideWidth == "16%" ? <p>Dashboard</p> : null}
				</button>

				<button
					onClick={() => toggleGuestState("depositPage")}
					title="Deposit"
					className={`${isMobile || sideWidth === "16%" ? "sidebar-links" : "sidebar-links-center"}`}
				>
					<ReactSVG src={deposit} className="" />
					{isMobile || sideWidth == "16%" ? <p>Deposit</p> : null}
				</button>

				<button
					onClick={() => toggleGuestState("withdrawPage")}
					title="Withdraw"
					className={`${isMobile || sideWidth === "16%" ? "sidebar-links" : "sidebar-links-center"}`}
				>
					<ReactSVG src={wallet} />
					{isMobile || sideWidth == "16%" ? <p>Withdraw</p> : null}
				</button>

				<button
					onClick={() => toggleGuestState("investPage")}
					title="Invest"
					className={`${isMobile || sideWidth === "16%" ? "sidebar-links" : "sidebar-links-center"}`}
				>
					<ReactSVG src={chart} />
					{isMobile || sideWidth == "16%" ? <p>Invest</p> : null}
				</button>
			</div>

			{/* last section */}
			<div className="flex flex-col gap-4 h-[210px] w-full">
				{isMobile || sideWidth == "4%" ? null : <h3 className="px-8 text-sm font-bold text-gray-500">MORE</h3>}

				<button
					onClick={() => toggleGuestState("supportPage")}
					title="Support"
					className={`${isMobile || sideWidth === "16%" ? "sidebar-links" : "sidebar-links-center"}`}
				>
					<ReactSVG src={lifeguard} />
					{isMobile || sideWidth == "16%" ? <p>Support</p> : null}
				</button>

				<button
					onClick={() => toggleGuestState("accountPage")}
					title="Account"
					className={`${isMobile || sideWidth === "16%" ? "sidebar-links" : "sidebar-links-center"}`}
				>
					<ReactSVG src={account} className="" />
					{isMobile || sideWidth == "16%" ? <p>Account</p> : null}
				</button>

				<button
					onClick={() => toggleGuestState("securityPage")}
					title="Security"
					className={`${isMobile || sideWidth === "16%" ? "sidebar-links" : "sidebar-links-center"}`}
				>
					<ReactSVG src={key} />
					{isMobile || sideWidth == "16%" ? <p>Security</p> : null}
				</button>

				<button
					onClick={() => toggleGuestState("referralsPage")}
					title="Referral"
					className={`${isMobile || sideWidth === "16%" ? "sidebar-links" : "sidebar-links-center"}`}
				>
					<ReactSVG src={compass} className="h-8 w-7" />
					{isMobile || sideWidth == "16%" ? <p>Referral</p> : null}
				</button>

				<button onClick={handleLogout} title="Logout" className={`${isMobile || sideWidth === "16%" ? "sidebar-links" : "sidebar-links-center"}`}>
					<ReactSVG src={power} />
					{isMobile || sideWidth == "16%" ? <p>Logout</p> : null}
				</button>
			</div>
		</section>
	);
}

export default sidebar;
