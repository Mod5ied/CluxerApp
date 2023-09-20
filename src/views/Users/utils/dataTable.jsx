import React, { useState } from "react";

function dataTable({ tableContext, requests }) {
	const [req, setRequest] = useState(null);

	return (
		<section className="w-full overflow-x-scroll rounded-md bg-stone-900 md:overflow-hidden">
			<h3 className="h-[70px] text-gray-50 font-bold p-4">{tableContext}</h3>
			<div className="flex flex-col gap-5 border-b border-blue-700 w-[450px] md:w-full">
				<div id="head" className="h-full">
					<span className="flex flex-row items-center h-full">
						<p className="text-blue-700 text-xs text-center w-[90px] md:w-[15%] px-3">S/N</p>
						<p className="text-blue-700 text-xs text-center w-[60%] md:w-[25%]">TRANSACTION ID</p>
						<p className="text-blue-700 text-xs text-center w-[50%] md:w-[20%]">AMOUNT</p>
						<p className="text-blue-700 text-xs text-center w-[45%] md:w-[15%]">METHOD</p>
						<p className="text-blue-700 text-xs text-center w-[45%] md:w-[15%]">STATUS</p>
						<p className="text-blue-700 text-xs text-center w-[40%] md:w-[10%]">CREATED</p>
					</span>
				</div>
				{!requests || requests.length === 0 ? (
					<p className="p-2 text-sm">No withdrawals found</p>
				) : Array.isArray(requests) ? (
					requests.map((req, index) => (
						<div id="data-loaded" className="flex flex-row py-6 text-gray-100" key={index}>
							<p className="text-sm text-stone-200 text-center w-[90px] md:w-[15%] px-3"> {index} </p>
							<p className="text-sm text-stone-200 text-center w-[60%] md:w-[25%]"> {req.transact_id} </p>
							<p className="text-sm text-stone-200 text-center w-[50%] md:w-[20%]"> {req.amount} </p>
							<p className="text-sm text-stone-200 text-center w-[45%] md:w-[15%]"> {req.currency} </p>
							<p className="text-sm text-red-600 font-bold text-center w-[45%] md:w-[15%]"> {req.pending && "Pending"} </p>
							<p className="text-sm text-stone-200 text-center w-[40%] md:w-[10%]"> {req.created} </p>
						</div>
					))
				) : (
					<div id="data-loaded" className="flex flex-row py-6 text-gray-100">
						<p className="text-sm text-stone-200 text-center w-[90px] md:w-[15%] px-3"> 1 </p>
						<p className="text-sm text-stone-200 text-center w-[60%] md:w-[25%]"> {requests.transact_id} </p>
						<p className="text-sm text-stone-200 text-center w-[50%] md:w-[20%]"> {requests.amount} </p>
						<p className="text-sm text-stone-200 text-center w-[45%] md:w-[15%]"> {requests.currency} </p>
						<p className="text-sm text-red-600 font-bold text-center w-[45%] md:w-[15%]"> {requests.pending && "Pending"} </p>
						<p className="text-sm text-stone-200 text-center w-[40%] md:w-[10%]"> {requests.created} </p>
					</div>
				)}
			</div>
		</section>
	);
}

export default dataTable;
