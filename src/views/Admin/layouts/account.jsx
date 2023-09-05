// import React from 'react'
import Avatar from "../../../components/avatar";

function account(prop) {
	return (
		<div id="accounts_container" className="bg-white w-[300px] md:w-[280px] h-[280px] flex flex-col absolute top-16 right-8 md:right-28 rounded-md shadow-sm overflow-hidden border">
			<section id="accounts_section_top" className="flex flex-row justify-around items-center h-[45%] border-b">
				<Avatar className="w-[35%] " />
				<span className="w-[65%] flex flex-col justify-center gap-2">
					<h3 className="font-semibold"> {prop.role || "admin"} </h3>
					<p className="text-xs text-gray-800 font-semibold"> {prop.email || "admin@email.com"} </p>
					{/* make the btn below reusable */}
					<button className="accounts-btn font-semibold text-gray-200 text-xs p-2 rounded bg-blue-800 w-[120px]">View Profile</button>
				</span>
			</section>
			<section id="accounts_section_mid1" className="accounts-section flex flex-col justify-around h-[25%] border-b py-2 px-4">
				<p>My profile</p>
				<p>Inbox</p>
			</section>
			<section id="accounts_section_mid2" className="grid content-center accounts-section h-[15%] border-b py-2 px-4">
				<p>Account Settings</p>
			</section>

			<section id="accounts_section_btm" className="grid content-center accounts-section h-[15%] py-2 px-4">
				<p>Logout</p>
			</section>
		</div>
	);
}

export default account;
