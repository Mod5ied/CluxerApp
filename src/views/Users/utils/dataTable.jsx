import React, { useState } from "react";

function dataTable({ approved, tableContext, requests }) {
	const [req, setRequest] = useState(null);
	const combined = [...(approved || []), ...(Array.isArray(requests) ? requests : [])];
	// const [combined, setCombined] = useState([...approved, ...requests]);

	return (
		<section className="w-full overflow-x-scroll rounded-md bg-stone-900 md:overflow-hidden">
			<h3 className="h-[70px] text-gray-50 font-bold p-4">{tableContext}</h3>
			<div className="flex flex-col gap-5 border-b border-blue-700 w-[600px] md:w-full">
				<div id="head" className="h-full">
					<span className="flex flex-row items-center h-full">
						<p className="text-blue-700 text-xs text-center w-[90px] md:w-[15%] px-3">S/N</p>
						<p className="text-blue-700 text-xs text-center w-[60%] md:w-[20%]">TRANSACTION ID</p>
						<p className="text-blue-700 text-xs text-center w-[50%] md:w-[20%]">AMOUNT</p>
						<p className="text-blue-700 text-xs text-center w-[45%] md:w-[15%]">METHOD</p>
						<p className="text-blue-700 text-xs text-center w-[45%] md:w-[15%]">STATUS</p>
						<p className="text-blue-700 text-xs text-center w-[40%] md:w-[15%]">CREATED</p>
					</span>
				</div>
				{combined.length === 0 ? (
					<p className="p-2 text-sm">No data was found</p>
				) : (
					combined.map((item, index) => (
						<div id="data-loaded" className="flex flex-row py-6 text-gray-100" key={index}>
							<p className="text-xs text-stone-200 text-center w-[90px] md:w-[15%] px-3"> {index} </p>
							<p className="text-xs text-stone-200 text-center w-[60%] md:w-[20%]"> {item.transact_id} </p>
							<p className="text-xs text-stone-200 text-center w-[50%] md:w-[20%]"> {item.amount} </p>
							<p className="text-xs text-stone-200 text-center w-[45%] md:w-[15%]"> {item.currency || item.wallet_name} </p>
							<p className="text-xs bg-transparent font-bold text-center w-[45%] md:w-[15%]">
								{item.pending && <button className="bg-red-600 px-3 py-1 text-stone-200 w-[70%] rounded"> PENDING </button> }
								{!item?.pending && <button className="bg-green-600 px-3 py-1 text-stone-200 w-[70%] rounded"> APPROVED </button>}
							</p>
							<p className="text-xs text-stone-200 text-center w-[40%] md:w-[15%]"> {item.created} </p>
						</div>
					))
				)}
			</div>
		</section>
	);
}

export default dataTable;
