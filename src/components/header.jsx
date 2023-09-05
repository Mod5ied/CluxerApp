import QuickActions from "../views/Admin/layouts/actions";
import Notifier from "../views/Admin/layouts/notifier";
import Accounts from "../views/Admin/layouts/account";
import mailLocked from "../assets/mail-locked.svg";
import options from "../assets/options.svg";
import avatar from "../assets/avatar.svg";
import stacks from "../assets/stacks.svg";
import menu from "../assets/hamburg.svg";
import mail from "../assets/email.svg";
import { ReactSVG } from "react-svg";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
// import { adminState, useToggleState } from "../services/state/state";

function header({ setSignal, signal }) {
	const [activeAction, setActiveAction] = useState("");
	const [mailState, setMailState] = useState(false);
	const [isMobileVisible, setIsMobileVisible] = useState(isMobile);

	const handleClick = (id) => {
		if (activeAction === id) {
			setActiveAction("");
		} else {
			setActiveAction(id);
		}
	};

	useEffect(() => {
		setIsMobileVisible(isMobile);
	}, [isMobile]);

	return (
		<header id="header_container" className="flex w-full z-20 bg-white relative h-[48px] shadow justify-between px-2 py-2">
			{isMobile ? (
				<section id="header_select" className="">
					<ReactSVG onClick={() => setSignal(!signal)} src={menu} />
				</section>
			) : (
				<section></section>
			)}

			{isMobile && <ReactSVG id="options" src={options} onClick={() => setIsMobileVisible(!isMobileVisible)} />}

			{!isMobileVisible && (
				<section className="w-full md:w-[200px] absolute md:relative top-11 bg-white left-0 h-full cursor-pointer">
					<span className="flex flex-row justify-center items-center gap-6 p-2 h-full text-gray-600">
						{/* click to show messages */}
						{mailState ? (
							<ReactSVG onClick={handleClick.bind(this, "messages")} src={mail} />
						) : (
							<ReactSVG onClick={handleClick.bind(this, "messages")} src={mailLocked} />
						)}

						{/* click to show the quick-actions */}
						<ReactSVG onClick={handleClick.bind(this, "quick_actions")} src={stacks} />

						{/* click to show avatar */}
						<ReactSVG onClick={handleClick.bind(this, "avatar")} src={avatar} className="mb-1 w-6 h-6" />
					</span>
					{/* <span id="actions"> */}
					<span>
						{activeAction === "messages" ? <Notifier /> : null}
						{activeAction === "quick_actions" ? <QuickActions /> : null}
						{activeAction === "avatar" ? <Accounts /> : null}
					</span>
				</section>
			)}
		</header>
	);
}

export default header;
