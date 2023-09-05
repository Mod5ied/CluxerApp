import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import doc from "../../../assets/document.svg";
import pay from "../../../assets/add-pay.svg";
import db from "../../../assets/database.svg";
import staff from "../../../assets/staff.svg";
import mail from "../../../assets/email.svg";
import pen from "../../../assets/pen.svg";

const actions = () => {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<div id="actions-container" className="w-[350px] h-[380px] bg-white absolute top-15 right-3 md:right-32 flex flex-col overflow-hidden border rounded-sm shadow-sm">
			<section id="actions-card-top" className="flex flex-col justify-center items-center gap-1 py-2 h-[20%] bg-blue-800 md:bg-blue-600">
				<h2 className="text-lg text-slate-100 font-semibold">Quick Actions</h2>
				<p className="text-sm text-slate-100">Shortcuts</p>
			</section>
			<section id="actions-card-btm" className="h-[70%] flex flex-row flex-wrap justify-center items-center gap-x-5 py-5">
				<div className="actions-cards" onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>
					<ReactSVG src={doc} />
					<p> Approved Payment </p>
				</div>
				<div className="actions-cards" onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>
					<ReactSVG src={db} />
					<p>Pending Payment </p>
				</div>
				<div className="actions-cards" onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>
					<ReactSVG src={pen} />
					<p> Withdraw </p>
				</div>
				<div className="actions-cards" onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>
					<ReactSVG src={staff} />
					<p> Add Staff </p>
				</div>
				<div className="actions-cards" onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>
					<ReactSVG src={mail} />
					<p> Email </p>
				</div>
				<div className="actions-cards" onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>
					<ReactSVG src={pay} />
					<p> Add Payment method </p>
				</div>
			</section>
		</div>
	);
};

export default actions;
