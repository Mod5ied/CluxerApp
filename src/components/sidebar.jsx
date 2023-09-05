import { ReactSVG } from "react-svg";
import home from "../assets/home.svg";
import exit from "../assets/exit.svg";
import React, { useEffect, useState } from "react";
import users from "../assets/users.svg";
import close from "../assets/close.svg";
import bonus from "../assets/add-pay.svg";
import payment from "../assets/method.svg";
import deposit from "../assets/deposit.svg";
import hamburg from "../assets/hamburg.svg";
import withdraw from "../assets/withdraw.svg";
import arrDown from "../assets/arrow-down.svg";
import Logo from "../assets/Cluxtercoin Logo.png";
import reduceCash from "../assets/reduce-cash.svg";
import { useNavigate } from "react-router-dom";
import { animated, useSpring, useTransition } from "react-spring";
import { adminState, useToggleState } from "../services/state/state";
import { isMobile } from "react-device-detect";

function sidebar({ signal, setSignal }) {
	const [dropDown, setDropdown] = useState(false);

	const [dropState, setDropState] = useState({ depoDrop: false, withdrawDrop: false, usersDrop: false });
	const [isExpanded, setIsExpanded] = useState(true);

	const toggleAdminState = useToggleState(adminState);
	const navigate = useNavigate();

	const handleExpand = () => {
		setIsExpanded(!isExpanded);
	};

	const props = useSpring({
		width: window.innerWidth <= 768 ? (signal ? "55%" : "0") : isExpanded ? "20%" : "5%",
		config: { duration: 300 },
	});

	const toggleDropDown = (dropdownName) => {
		setDropState((prevState) => ({
			...Object.keys(prevState).reduce((obj, key) => ({ ...obj, [key]: false }), {}),
			[dropdownName]: !prevState[dropdownName],
		}));
	};

	const depoDropTransitions = useTransition(dropState.depoDrop, {
		from: { transform: "translate3d(0,-10px,0)" },
		enter: { transform: "translate3d(0,10px,0)" },
		leave: { transform: "translate3d(0,-10px,0)" },
		config: { duration: 200 },
	});

	const withdrawDropTransitions = useTransition(dropState.withdrawDrop, {
		from: { transform: "translate3d(0,-10px,0)" },
		enter: { transform: "translate3d(0,10px,0)" },
		leave: { transform: "translate3d(0,-10px,0)" },
		config: { duration: 200 },
	});

	const usersDropTransitions = useTransition(dropState.usersDrop, {
		from: { transform: "translate3d(0,-10px,0)" },
		enter: { transform: "translate3d(0,10px,0)" },
		leave: { transform: "translate3d(0,-10px,0)" },
		config: { duration: 200 },
	});

	//todo: abstract this form this component.
	const handleLogout = () => {
		navigate("/signin");
		// const auth = getAuth();
		// signOut(auth)
		// 	.then(() => {
		// 		// Sign-out successful.
		// 		navigate("/login"); // redirect the user to login page after sign out
		// 	})
		// 	.catch((error) => {
		// 		// An error happened.
		// 		console.error(error);
		// 	});
	};

	// useEffect(() => {
	// 	console.log(signal);
	// }, [signal]);

	return (
		<animated.div style={props} className={`fixed left-0 z-30 flex flex-col gap-8 overflow-hidden bg-white items-center border-r border-gray-300 h-screen justify-center`}>
			{!isExpanded && window.innerWidth > 768 ? (
				<section id="hidden" onClick={handleExpand} className="h-[70px] grid content-center w-full hover:bg-slate-200 p-4 cursor-pointer">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 m-auto">
						<path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
					</svg>
				</section>
			) : null}

			{isExpanded && (
				<section id="expanded" className="flex flex-row justify-around h-[64px] px-2 cursor-pointer">
					<nav>
						<img src={Logo} alt="Cluxter-logo" className="w-full h-full" />
					</nav>
					{!isMobile && isExpanded && <ReactSVG onClick={handleExpand} src={hamburg} className="m-auto text-lg p-2 rounded duration-200 hover:bg-slate-100" />}
					{isMobile && isExpanded && (
						<ReactSVG onClick={() => setSignal(!signal)} src={close} className="m-auto text-lg p-2 rounded duration-200 hover:bg-slate-100" />
					)}
				</section>
			)}

			<section className="w-full h-full flex flex-col gap-2 items-center">
				<section
					onClick={() => toggleAdminState("dashboard")}
					className={`flex flex-row justify-center items-center cursor-pointer ${
						!isExpanded ? "mt-3" : "mt-3"
					} shadow gap-2 bg-blue-700 text-gray-100 p-2 rounded-md w-4/5`}
				>
					<ReactSVG src={home} className={`${!isExpanded && "m-auto"}`} />
					{isExpanded && (
						<>
							<p>Dashboard</p>
							<ReactSVG src={arrDown} />
						</>
					)}
				</section>

				<section className="h-3/4 w-full flex flex-col gap-3 justify-around items-center">
					{isExpanded && <h3 className="text-sm text-center font-medium border-b border-gray-200 w-[90%] py-2">COMPONENTS</h3>}

					<nav className="h-[90%] w-[90%] flex flex-col gap-2 items-center text-gray-600">
						<div className="flex flex-col gap-2 w-full">
							<button
								className={`${dropState.depoDrop ? "bg-slate-200 sidebar_links" : "sidebar_links"} sidebar_links`}
								title="Deposit"
								onClick={() => toggleDropDown("depoDrop")}
							>
								<ReactSVG src={deposit} className={`${!isExpanded && "m-auto"}`} />
								{isExpanded && (
									<div className="flex flex-col w-full">
										<div className="flex flex-row justify-start items-center px-2 w-full">
											<p className="text-gray-800 font-semibold">DEPOSITS</p>
											<ReactSVG src={arrDown} className="sidebar_arrDown" />
										</div>
									</div>
								)}
							</button>
							{depoDropTransitions((style, item) =>
								item ? (
									<animated.span style={style} className="sidebar-links_drop">
										<button onClick={() => toggleAdminState("depositApproved")}>
											<p>Approved</p>
										</button>
										<button onClick={() => toggleAdminState("depositPending")}>
											<p>Pending</p>
										</button>
									</animated.span>
								) : null
							)}
						</div>

						<div className="flex flex-col gap-2 w-full">
							<button
								className={`${dropState.withdrawDrop ? "bg-slate-200 sidebar_links" : "sidebar_links"} sidebar_links`}
								title="Withdraw"
								onClick={() => toggleDropDown("withdrawDrop")}
							>
								<ReactSVG src={withdraw} className={`${!isExpanded && "m-auto"}`} />
								{isExpanded && (
									<div className="flex flex-col w-full">
										<div className="flex flex-row justify-start items-center px-2 w-full">
											<p className="text-gray-800 font-semibold">WITHDRAWN</p>
											<ReactSVG src={arrDown} className="sidebar_arrDown" />
										</div>
									</div>
								)}
							</button>
							{withdrawDropTransitions((style, item) =>
								item ? (
									<animated.span style={style} className="sidebar-links_drop">
										<button onClick={() => toggleAdminState("withdrawnApproved")}>
											<p>Approved</p>
										</button>
										<button onClick={() => toggleAdminState("withdrawnPending")}>
											<p>Pending</p>
										</button>
									</animated.span>
								) : null
							)}
						</div>

						<div className="flex flex-col gap-2 w-full">
							<button
								className={`${dropState.withdrawDrop ? "bg-slate-200 sidebar_links" : "sidebar_links"} sidebar_links`}
								title="Users"
								onClick={() => toggleDropDown("usersDrop")}
							>
								<ReactSVG src={users} className={`${!isExpanded && "m-auto"}`} />
								{isExpanded && (
									<div className="flex flex-col w-full">
										<div className="flex flex-row justify-start items-center px-2 w-full">
											<p className="text-gray-800 font-semibold">USERS</p>
											<ReactSVG src={arrDown} className="sidebar_arrDown" />
										</div>
									</div>
								)}
							</button>
							{usersDropTransitions((style, item) =>
								item ? (
									<animated.span style={style} className="sidebar-links_drop">
										<button onClick={() => toggleAdminState("client")}>
											<p>Client</p>
										</button>
										<button onClick={() => toggleAdminState("addStaff")}>
											<p>Staff</p>
										</button>
									</animated.span>
								) : null
							)}
						</div>

						<p className="w-full mt-3 border border-gray-100 "></p>

						<section className="mt-3 w-[90%] flex flex-col gap-2">
							<button onClick={() => toggleAdminState("reduceFunds")} className="sidebar_links" title="Reduce Funds">
								<ReactSVG src={reduceCash} className={`${!isExpanded && "m-auto"}`} />
								{isExpanded && <p className="text-gray-800 font-semibold">Reduce funds</p>}
							</button>
							<button onClick={() => toggleAdminState("addBonus")} className="sidebar_links" title="Add bonus">
								<ReactSVG src={bonus} className={` ${!isExpanded && "m-auto"}`} />
								{isExpanded && <p className="text-gray-800 font-semibold">Add bonus</p>}
							</button>
							<button onClick={() => toggleAdminState("addProfit")} className="sidebar_links" title="Add Profit">
								<ReactSVG src={bonus} className={`${!isExpanded && "m-auto"}`} />
								{isExpanded && <p className="text-gray-800 font-semibold">Add profit</p>}
							</button>
							<button onClick={() => toggleAdminState("fundDeposit")} className="sidebar_links" title="Fund Deposit">
								<ReactSVG src={bonus} className={`${!isExpanded && "m-auto"}`} />
								{isExpanded && <p className="text-gray-800 font-semibold">Fund Deposit</p>}
							</button>
							<button onClick={() => toggleAdminState("paymentMethod")} className="sidebar_links" title="Payment Method">
								<ReactSVG src={payment} className={`${!isExpanded && "m-auto"}`} />
								{isExpanded && <p className="text-gray-800 font-semibold">Payment Method</p>}
							</button>
						</section>
					</nav>
				</section>

				<section className="w-full static bottom-0">
					{/* create a reusable btn here. */}
					<button
						onClick={handleLogout}
						className="flex flex-row items-center justify-center gap-2 m-auto text-center bg-blue-700 text-gray-100 p-2 rounded-md w-4/5"
					>
						<ReactSVG src={exit} />
						{isExpanded && <p>Logout</p>}
					</button>
				</section>
			</section>
		</animated.div>
	);
}

export default sidebar;
