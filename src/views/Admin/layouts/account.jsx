import { useNavigate } from "react-router";
import Avatar from "../../../components/avatar";
import { execSignOut } from "../../../services/auth-services/auth";
import { adminState, useToggleState } from "../../../services/state/state";

function account({email, role}) {
	const navigate = useNavigate()
	const handleLogout = () => {
		execSignOut()
		navigate("/signin")
	}

	const toggleAdminState =  useToggleState(adminState);

	return (
		<div id="accounts_container" className="bg-white w-[300px] md:w-[280px] h-[280px] flex flex-col absolute top-16 right-8 md:right-28 rounded-md shadow-sm overflow-hidden border">
			<section id="accounts_section_top" className="flex flex-row justify-around items-center h-[45%] border-b">
				<Avatar className="w-[35%] " />
				<span className="w-[65%] flex flex-col justify-center gap-2">
					<h3 className="font-semibold"> {role || "admin"} </h3>
					<p className="text-xs font-semibold text-gray-800"> {email || "admin@email.com"} </p>
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

			<section id="accounts_section_btm" className="grid content-center accounts-section h-[15%] py-2 px-4 hover:bg-slate-300">
				<p onClick={handleLogout}>Logout</p>
			</section>
		</div>
	);
}

export default account;
