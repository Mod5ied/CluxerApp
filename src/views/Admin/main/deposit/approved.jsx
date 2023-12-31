import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import arrDown from "../../../../assets/arrow-down.svg";
import arrDouble from "../../../../assets/arrow-double.svg";
import { adminState, useToggleState } from "../../../../services/state/state";

function approvedDepo({ approvedReqs }) {
	const [paginateNumDrop, setPaginateNum] = useState(false);
	const toggleAdminState = useToggleState(adminState);

	return (
		<div className="bg-transparent flex flex-col items-center md:items-start gap-4 py-2 px-0 md:p-2 absolute h-full w-full md:w-[80%] top-20">
			<section className="flex flex-row justify-between w-full px-4 py-2 md:px-0">
				<h2 className="text-xl font-semibold text-gray-100">Approved Payment</h2>
				<button onClick={() => toggleAdminState("addStaff")} className="reduce_btn" type="submit">
					Add Staff
				</button>
			</section>

			{/* White card */}
			<section className="w-[95%] md:w-full flex flex-col gap-8 bg-white rounded-md md:px-5 py-3 border">
				<div>
					<h2 className="px-4 text-xl font-semibold text-gray-700 md:px-0 md:font-medium">Approved Payment</h2>
				</div>

				{/* table section. */}
				<div className="flex flex-col gap-4 overflow-x-scroll md:w-full">
					<div className="flex flex-col justify-center overflow-x-scroll md:flex-row md:justify-between md:overflow-x-hidden">
						<span className="flex flex-row items-center w-full gap-1 px-4 md:px-0 md:w-1/2">
							Show
							<p className="flex flex-row items-center justify-center gap-2 px-1 text-gray-800 border rounded-md hover:bg-gray-200">
								10
								<span className="flex flex-col items-center">
									<ReactSVG src={arrDown} className="p-1 rounded-md hover:bg-gray-200" />
								</span>
								{paginateNumDrop && (
									<span id="drop" className="absolute overflow-hidden bg-gray-100 rounded-md">
										<p className="hover:bg-gray-300 px-2 py-1 w-[50px]">10</p>
										<p className="hover:bg-gray-300 px-2 py-1 w-[50px]">25</p>
										<p className="hover:bg-gray-300 px-2 py-1 w-[50px]">100</p>
										<p className="hover:bg-gray-300 px-2 py-1 w-[50px]">All</p>
									</span>
								)}
							</p>
							entries
						</span>

						<span className="flex flex-row items-center w-full gap-1 px-4 md:justify-end md:px-0 md:w-1/2">
							Search
							<input type="text" className="px-2 py-1 border rounded-md bg-gray-50" />
						</span>
					</div>

					{/* table below: */}
					<div className="flex flex-col w-full overflow-scroll">
						<span className="flex flex-row w-[640px] px-4 md:px-0 md:w-full text-gray-100 bg-blue-500 md:rounded-t-md">
							<h3 className="h-[60px] w-[10%] md:w-[10%] flex items-center justify-between px-1 ml-5">
								S.N <ReactSVG src={arrDouble} className="text-gray-600" />
							</h3>
							<h3 className="h-[60px] w-[30%] md:w-[35%] flex items-center justify-between px-1 ml-5">
								Details <ReactSVG src={arrDouble} className="text-gray-600" />
							</h3>
							<h3 className="h-[60px] w-[20%] md:w-[20%] flex items-center justify-between px-1 ml-5">
								Username <ReactSVG src={arrDouble} className="text-gray-600" />
							</h3>
							<h3 className="h-[60px] w-[20%] md:w-[20%] flex items-center justify-between px-1 ml-5">
								Amount <ReactSVG src={arrDouble} className="text-gray-600" />
							</h3>
							<h3 className="h-[60px] w-[20%] md:w-[25%] flex items-center justify-between px-1 ml-5">Status</h3>
						</span>
						{/* 10 list below */}
						{approvedReqs.map((req, index) => {
							return (
								<span key={index} className={`flex flex-row w-[640px] px-4 md:px-0 md:w-full ${index % 2 === 0 ? "bg-gray-200" : "bg-white"}`}>
									<p className="h-[65px] md:h-[63px] w-[10%] md:w-[10%] flex items-center text-gray-800 justify-between px-1 ml-5">{++index}</p>
									<div className="h-[65px] md:h-[63px] w-[30%] md:w-[35%] flex flex-col text-gray-800 justify-between px-1 py-1 ml-5 overflow-hidden">
										<h5 className="text-sm text-gray-800">{req.fullname}</h5>
										<h5 className="text-sm text-gray-800">{req.email}</h5>
										<h5 className="text-sm text-gray-800">{req.mobile}</h5>
									</div>
									<p className="h-[65px] md:h-[63px] w-[20%] md:w-[20%] flex items-center text-gray-800 justify-between px-1 ml-5">
										{req.username}
									</p>
									<p className="h-[65px] md:h-[63px] w-[20%] md:w-[20%] flex items-center text-gray-800 justify-between px-1 ml-5">
										{req.amount}
									</p>
									<div className="h-[65px] md:h-[63px] w-[20%] md:w-[25%] flex items-center text-gray-800 justify-between px-1 ml-5">
										<p className="px-3 py-2 text-xs text-gray-100 duration-300 bg-green-500 rounded-md cursor-pointer hover:bg-green-400">
											Approved
										</p>
									</div>
								</span>
							);
						})}
					</div>

					{/* sectioning by right. */}
					<div className="flex justify-end w-full border-t">
						<span className="w-full md:w-[50%] h-[50px] py-2 px-1 flex justify-between md:justify-end gap-1">
							<button className="px-3 py-1 duration-200 border border-gray-300 rounded-xl hover:bg-slate-300">Previous</button>
							<span className="w-[50%] md:w-[22%] flex justify-around gap-2">
								<button className="p-1 px-3 duration-200 border border-gray-300 rounded-full hover:bg-blue-500 hover:text-gray-50">1</button>
								<button className="p-1 px-3 duration-200 border border-gray-300 rounded-full hover:bg-blue-500 hover:text-gray-50">2</button>
								<button className="p-1 px-3 duration-200 border border-gray-300 rounded-full hover:bg-blue-500 hover:text-gray-50">3</button>
							</span>
							<button className="px-3 py-1 duration-200 border border-gray-300 rounded-xl hover:bg-slate-300">Next</button>
						</span>
					</div>
				</div>
			</section>
		</div>
	);
}

export default approvedDepo;
