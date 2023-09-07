import React, { useEffect, useState } from "react";

function dataTable({ tableContext, request }) {
	const [req, setRequest] = useState(null)

	useEffect(() => {
		setRequest(request)
	}, [request]);
	return (
		<section className="w-full h-full overflow-x-scroll overflow-y-hidden rounded-md bg-stone-900 md:overflow-hidden">
			<h3 className="h-[70px] text-gray-50 font-bold p-4">{tableContext}</h3>
			<div className="border-y border-blue-700 h-[50px] w-[450px] md:w-full">
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
				{request ? (
					<div id="data-loaded" className="px-4 py-6 text-gray-100" key={key}>
						<p className="text-sm text-stone-200"> {key} </p>
						<p className="text-sm text-stone-200"> {req.transact_id} </p>
						<p className="text-sm text-stone-200"> {req.amount} </p>
						<p className="text-sm text-stone-200"> {req.currency} </p>
						<p className="text-sm text-stone-200"> {req.pending && "Pending"} </p>
						<p className="text-sm text-stone-200"> {req.created} </p>
					</div>
				) : (
					<p className="px-4 py-6 text-gray-100">No data found</p>
				)}
			</div>
		</section>
	);
}

export default dataTable;
