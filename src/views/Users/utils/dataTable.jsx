import React, { useEffect, useState } from "react";

function dataTable({ tableContext, tableData }) {
	const [dataArray, setDataArray] = useState([]);

	useEffect(() => {
		setDataArray(tableData);
	}, [tableData]);
	return (
		// <section className="w-full h-full md:mt-[50px] rounded-md bg-stone-900 overflow-x-scroll md:overflow-hidden">
		<section className="w-full h-full rounded-md bg-stone-900 overflow-x-scroll overflow-y-hidden md:overflow-hidden">
			<h3 className="h-[70px] text-gray-50 font-bold p-4">{tableContext}</h3>
			<div className="border-y border-blue-700 h-[50px] w-[450px] md:w-full">
				<div id="head" className="h-full">
					<span className="h-full flex flex-row items-center">
						<p className="text-blue-700 text-xs text-center w-[90px] md:w-[15%] px-3">S/N</p>
						<p className="text-blue-700 text-xs text-center w-[60%] md:w-[25%]">TRANSACTION ID</p>
						<p className="text-blue-700 text-xs text-center w-[50%] md:w-[20%]">AMOUNT</p>
						<p className="text-blue-700 text-xs text-center w-[45%] md:w-[15%]">METHOD</p>
						<p className="text-blue-700 text-xs text-center w-[45%] md:w-[15%]">STATUS</p>
						<p className="text-blue-700 text-xs text-center w-[40%] md:w-[10%]">CREATED</p>
					</span>
				</div>
				{(dataArray &&
					dataArray.map((data, key) => (
						<div id="data-loaded" className="text-gray-100 px-4 py-6" key={key}>
							<p className="text-sm text-stone-200"> {data.id} </p>
							<p className="text-sm text-stone-200"> {data.transaction_id} </p>
							<p className="text-sm text-stone-200"> {data.amount} </p>
							<p className="text-sm text-stone-200"> {data.currency} </p>
							<p className="text-sm text-stone-200"> {data.status} </p>
							<p className="text-sm text-stone-200"> {data.created} </p>
						</div>
					))) || <p className="text-gray-100 px-4 py-6">No data found</p>}
			</div>
		</section>
	);
}

export default dataTable;
