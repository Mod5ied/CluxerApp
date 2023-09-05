import { adminState, useToggleState } from "../services/state/state";


function metrics() {
	const toggleAdminState = useToggleState(adminState);
	return (
		<div className="flex flex-col md:w-full mt-1">
			<div className="flex flex-col gap-8 justify-center items-center">
				<section className="h-[150px] flex flex-row justify-between items-center px-8 w-full">
					<span className="flex flex-col justify-center gap-4 h-full">
						<h1 className="text-2xl text-gray-200">ADMIN DASHBOARD</h1>
						<h3 className="text-gray-200">Welcome to Cluxtercoin</h3>
					</span>
					<span>
						<button onClick={() => toggleAdminState("addStaff")} className="metric_btn">Add Staff</button>
					</span>
				</section>
				<section className="flex flex-col items-center md:items-start md:flex-row md:flex-wrap md:px-8 gap-4 bg-slate-100 w-full">
					<div className="metric_cards bg-white">
						<span className="card_header">Total number of clients</span>
						<span className="flex flex-col items-center gap-4">
							<p className="cards_p text-gray-500">Total Client</p>
							<p className="metric_numbs text-gray-700">25</p>
						</span>
					</div>
					<div className="metric_cards bg-white">
						<span className="card_header">Admin Count</span>
						<span className="flex flex-col items-center gap-4">
							<p className="cards_p text-gray-500">Total Admin</p>
							<p className="metric_numbs text-gray-700">2</p>
						</span>
					</div>
					<div className="metric_cards bg-green-500">
						<span className="card_header">Approved Deposit Statistics </span>
						<span className="flex flex-col items-center gap-4">
							<p className="metric_numbs text-gray-100">$1,670,030</p>
						</span>
					</div>
					<div className="metric_cards bg-red-500">
						<span className="card_header">Approved Withdrawn Statistics</span>
						<span className="flex flex-col items-center gap-4">
							<p className="metric_numbs text-gray-100">$1,932,220</p >
						</span>
					</div>
					<div className="metric_cards bg-blue-500">
						<span className="card_header">Pending Deposit Statistics</span>
						<span className="flex flex-col items-center gap-4">
							<p className="metric_numbs text-gray-100">$31,100</p>
						</span>
					</div>
					<div className="metric_cards bg-amber-500">
						<span className="card_header">Pending Withdrawn Statistics</span>
						<span className="flex flex-col items-center gap-4">
							<p className="metric_numbs text-gray-100">$203</p>
						</span>
					</div>
				</section>
			</div>
		</div>
	);
}

export default metrics;
