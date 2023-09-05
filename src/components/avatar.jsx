// import React from "react";
import { ReactSVG } from "react-svg";
import Avatar from "../assets/avatar.svg"

function avatar({style}) {
	/* pass src to the src attr and conditionally render if user image is loaded. */
	return (
		<span className={`rounded-lg bg-slate-200 ${style}`}>
			{/* <img src={} alt="User image" /> */}
			<ReactSVG src={Avatar} className="text-gray-600" />
		</span>
	);
}

export default avatar;
