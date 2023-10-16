import React from "react";

function referrals() {
	const referrals = JSON.parse(localStorage.getItem("referrals"));
	
	return (
		<div className="flex flex-col items-center h-full bg-gray-100">
			<section className="w-full mt-[50px] rounded-md bg-stone-900 overflow-x-scroll">
				<h3 className="h-[70px] text-gray-50 font-bold p-4">Referrals</h3>
				<div className="w-[500px] md:w-full flex flex-row justify-between items-center border-y border-blue-700 h-[45px]">
					<p className="text-blue-700 text-xs w-[80px] md:w-[30%] px-3">S/N</p>
					<p className="text-blue-700 text-xs w-[80px] md:w-[25%]">NAME</p>
					<p className="text-blue-700 text-xs w-[80px] md:w-[20%]">EMAIL</p>
					<p className="text-blue-700 text-xs w-[80px] md:w-[15%]">AMOUNT</p>
					<p className="text-blue-700 text-xs w-[80px] md:w-[10%]">CREATED</p>
				</div>
				{referrals ? (
					referrals.map((data, key) => (
						<div key={key} id="data-loaded" className="w-[500px] md:w-full flex flex-row justify-between items-center text-gray-100 py-6">
							<p className="px-4 md:w-[30%]"> {key + 1} </p>
							<p className="md:w-[25%]"> {data.name} </p>
							<p className="md:w-[20%]"> {data.email} </p>
							<p className="px-2 md:w-[15%]">$ {data.amount} </p>
							{/* <p className="md:w-[15%]"> {data.status} </p> */}
							<p className="md:w-[10%]"> {data.created} </p>
						</div>
					))
				) : (
					<p className="text-gray-100 px-4 py-6">No data found</p>
				)}
			</section>

			<section className=" w-full mt-[50px] rounded-md bg-stone-900 overflow-x-scroll md:overflow-hidden">
				<h3 className="h-[70px] text-gray-50 font-bold p-4">Earnings</h3>
				<div className="flex flex-row items-center justify-between border-y border-blue-700 h-[45px]">
					<p className="text-blue-700 text-xs w-[30%] px-3">S/N</p>
					<p className="text-blue-700 text-xs w-[20%]">AMOUNT</p>
					<p className="text-blue-700 text-xs w-[15%]">NAME</p>
					<p className="text-blue-700 text-xs w-[15%]">USERNAME</p>
					<p className="text-blue-700 text-xs w-[10%]">CREATED</p>
				</div>
				{referrals.map((data, key) => (
					<div key={key} id="data-loaded" className="w-[500px] md:w-full flex flex-row justify-between items-center text-gray-100 py-6">
						<p className="px-4 w-[30%]"> {key + 1} </p>
						<p className="w-[20%]"> $ {data.amount} </p>
						<p className="w-[15%]"> {data.email} </p>
						<p className="w-[15%]"> {data.name} </p>
						<p className="w-[10%]"> {data.created} </p>
					</div>
				)) || <p className="text-gray-100 px-4 py-6">No data found</p>}
			</section>
		</div>
	);
}

export default referrals;
