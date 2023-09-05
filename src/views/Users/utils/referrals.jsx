import React, { useState } from "react";
import dataTable from "./dataTable";

function referrals() {
	const [dataArray, setDataArray] = useState([false]);
	return (
		<div className="flex flex-col items-center h-full bg-gray-100">
			<section className="w-full mt-[50px] rounded-md bg-stone-900 overflow-x-scroll">
				<h3 className="h-[70px] text-gray-50 font-bold p-4">Referrals</h3>
				<div className="flex flex-row items-center border-y border-blue-700 h-[45px]">
					<p className="text-blue-700 text-xs w-[80px] md:w-[30%] px-3">S/N</p>
					<p className="text-blue-700 text-xs w-[80px] md:w-[25%]">NAME</p>
					<p className="text-blue-700 text-xs w-[80px] md:w-[20%]">EMAIL</p>
					<p className="text-blue-700 text-xs w-[80px] md:w-[15%]">STATUS</p>
					<p className="text-blue-700 text-xs w-[80px] md:w-[10%]">CREATED</p>
				</div>
				{dataArray ? (
					dataArray.map((data, key) => (
						<div id="data-loaded" className="text-gray-100 px-4 py-6">
							<p> {data.id} </p>
							<p> {data.transaction_id} </p>
							<p> {data.amount} </p>
							<p> {data.method} </p>
							<p> {data.status} </p>
							<p> {data.created} </p>
						</div>
					))
				) : (
					<p className="text-gray-100 px-4 py-6">No data found</p>
				)}
			</section>

			<section className=" w-full mt-[50px] rounded-md bg-stone-900 overflow-x-scroll md:overflow-hidden">
				<h3 className="h-[70px] text-gray-50 font-bold p-4">Earnings</h3>
				<div className="flex flex-row items-center border-y border-blue-700 h-[45px]">
					<p className="text-blue-700 text-xs w-[30%] px-3">S/N</p>
					<p className="text-blue-700 text-xs w-[20%]">AMOUNT</p>
					<p className="text-blue-700 text-xs w-[15%]">NAME</p>
					<p className="text-blue-700 text-xs w-[15%]">USERNAME</p>
					<p className="text-blue-700 text-xs w-[10%]">CREATED</p>
				</div>
				{dataArray.map((data, key) => (
					<div id="data-loaded" className="text-gray-100 px-4 py-6">
						<p> {data.id} </p>
						<p> {data.transaction_id} </p>
						<p> {data.amount} </p>
						<p> {data.method} </p>
						<p> {data.status} </p>
						<p> {data.created} </p>
					</div>
				)) || <p className="text-gray-100 px-4 py-6">No data found</p>}
			</section>
		</div>
	);
}

export default referrals;
