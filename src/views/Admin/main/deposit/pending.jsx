import { ReactSVG } from "react-svg";
import Loader from "../../utils/loader";
import bin from "../../../../assets/bin.svg";
import React, { useEffect, useState } from "react";
import arrDown from "../../../../assets/arrow-down.svg";
import arrDouble from "../../../../assets/arrow-double.svg";
import { adminState, useToggleState } from "../../../../services/state/state";

function pendingDepo({ deleteDepo, updateDepo }) {
	const [paginateNumDrop] = useState(false);
	const [deposits, setDeposits] = useState([]);
	const [approve, setApprove] = useState(false);
	const toggleAdminState = useToggleState(adminState);

	const updateDeposit = (val) => {
		setApprove(true);
		setTimeout(async () => {
			await updateDepo(val);
			setApprove(false);
		}, 500);
	};

	const deleteDeposit = (val) => {
		setApprove(true);
		setTimeout(async () => {
			await deleteDepo(val);
			setApprove(false);
		}, 500);
	};

	useEffect(() => {
		setTimeout(() => {
			const reqs = JSON.parse(localStorage.getItem("userDeposits"));
			setDeposits(reqs);
		}, 600);
	}, [deleteDeposit, updateDeposit]);

	return (
		<div className="bg-transparent flex flex-col gap-4 py-2 px-2 md:p-2 absolute h-full w-full md:w-[80%] top-20">
			<section className="flex flex-row justify-between px-4 py-2 md:px-0">
				<h2 className="text-xl font-semibold text-gray-100">Pending Payment</h2>
				<button onClick={() => toggleAdminState("addStaff")} className="reduce_btn" type="submit">
					Add Staff
				</button>
			</section>

			{/* White card */}
			<section className="flex flex-col w-full gap-8 py-3 bg-white border rounded-md md:px-5">
				<div>
					<h2 className="text-xl text-gray-700">Pending Payment</h2>
				</div>

				{/* table section. */}
				<div className="flex flex-col gap-4 overflow-x-scroll md:w-full">
					<div className="flex flex-col justify-center overflow-x-scroll md:overflow-x-hidden md:flex-row md:justify-between">
						<div className="flex flex-row items-center w-full gap-1 px-4 md:px-0 md:w-1/2">
							Show
							<div className="flex flex-row items-center justify-center gap-2 px-1 text-gray-800 border rounded-md hover:bg-gray-200">
								10
								<div className="flex flex-col items-center">
									<ReactSVG src={arrDown} className="p-1 rounded-md hover:bg-gray-200" />
								</div>
								{paginateNumDrop && (
									<span id="drop" className="absolute overflow-hidden bg-gray-100 rounded-md">
										<p className="hover:bg-gray-300 px-2 py-1 w-[50px]">10</p>
										<p className="hover:bg-gray-300 px-2 py-1 w-[50px]">25</p>
										<p className="hover:bg-gray-300 px-2 py-1 w-[50px]">100</p>
										<p className="hover:bg-gray-300 px-2 py-1 w-[50px]">All</p>
									</span>
								)}
							</div>
							entries
						</div>

						<span className="flex flex-row items-center w-full gap-1 px-4 md:justify-end md:px-0 md:w-1/2">
							Search
							<input type="text" className="px-2 py-1 border rounded-md bg-gray-50" />
						</span>
					</div>

					{/* table below: */}
					<div className="flex flex-col w-full overflow-scroll">
						{approve && (
							<div className="absolute rounded-md cursor-wait md:mb-5 w-full md:w-[95%] h-[400px] bg-gray-600 bg-opacity-50 flex flex-col justify-center items-center gap-2">
								<Loader />
								<p className="text-blue-600 font-bold">Processing, please wait!</p>
							</div>
						)}

						<span className="flex flex-row w-[640px] px-4 md:px-0 md:w-full text-gray-100 bg-blue-500 md:rounded-t-md">
							<h3 className="h-[60px] md:w-[10%] w-[10%]  flex items-center justify-around md:pl-5 ">
								S.N <ReactSVG src={arrDouble} className="text-gray-600" />
							</h3>
							<h3 className="h-[60px] md:w-[25%] w-[35%] flex items-center justify-around md:pl-5 ">
								Details <ReactSVG src={arrDouble} className="text-gray-600" />
							</h3>
							<h3 className="h-[60px] md:w-[18%] w-[20%] flex items-center justify-around md:pl-5 ">
								Username <ReactSVG src={arrDouble} className="text-gray-600" />
							</h3>
							<h3 className="h-[60px] md:w-[17%] w-[15%] flex items-center justify-around md:pl-1 ">
								Amount <ReactSVG src={arrDouble} className="text-gray-600" />
							</h3>
							<h3 className="h-[60px] md:w-[15%] w-[20%] flex items-center justify-around md:pl-1 ">
								Status <ReactSVG src={arrDouble} className="text-gray-600" />
							</h3>
							<h3 className="h-[60px] md:w-[20%] w-[25%] flex items-center pl-12 md:pl-28 ">Actions</h3>
						</span>
						{/* 10 list below */}
						{!deposits || !deposits.length ? (
							<p className="text-stone-800 py-4">No deposits found</p>
						) : (
							deposits.map((deposit, index) => {
								return (
									<span
										key={index}
										className={`flex flex-row w-[640px] px-4 md:px-0 md:w-full ${index % 2 === 0 ? "bg-gray-200" : "bg-white"}`}
									>
										<p className="h-[75px] md:h-[63px] md:w-[10%] w-[15%] text-gray-800 flex items-center md:px-1 md:ml-8">{++index}</p>
										<div className="h-[75px] md:h-[63px] md:w-[35%] w-[35%] text-gray-800 flex flex-col justify-between md:pl-6 py-1 md:ml-8  md:overflow-hidden">
											<h5 className="text-sm">{deposit.fullname}</h5>
											<h5 className="text-sm">{deposit.email}</h5>
											<h5 className="text-sm">{deposit.mobile}</h5>
										</div>
										<p className="h-[75px] md:h-[63px] md:w-[20%] w-[20%] text-gray-800 flex items-center pl-6 ml-8">{deposit.username}</p>
										<p className="h-[75px] md:h-[63px] md:w-[20%] w-[10%] text-gray-800 flex items-center pl-6 md:ml-8">{deposit.amount}</p>
										<p className="h-[75px] md:h-[63px] md:w-[25%] w-[20%] text-gray-800 flex items-center pl-6 md:ml-8">
											<button type="submit"> {!deposit.pending ? "Approved" : "Pending"} </button>
										</p>
										<div className="h-[75px] md:h-[63px] md:w-[25%] w-[25%] text-gray-800 flex items-center gap-2 justify-center pl-6 ml-8">
											<button
												onClick={() => updateDeposit(deposit?.email)}
												className="px-3 py-1 duration-200 bg-blue-600 rounded text-sm text-gray-50 hover:bg-blue-400"
											>
												Approve
											</button>
											<ReactSVG
												onClick={() => deleteDeposit(deposit?.email)}
												src={bin}
												className="py-[0.40rem] px-3 rounded bg-red-600 text-gray-50 hover:bg-red-400 cursor-pointer duration-200"
											/>
										</div>
									</span>
								);
							})
						)}
					</div>

					{/* sectioning by right. */}
					<div className="flex justify-end w-full border-t">
						<span className="w-full md:w-[50%] h-[50px] py-2 px-1 flex justify-between md:justify-end gap-1">
							<button className="px-3 py-1 duration-200 border border-gray-300 rounded-xl hover:bg-slate-300">Previous</button>
							<span className="w-[50%] md:w-[22%] flex justify-around gap-2">
								<button className="p-1 px-3 duration-200 border border-gray-300 rounded-full hover:bg-blue-500 hover:text-gray-50">1</button>
								<button className="p-1 px-3 duration-200 border border-gray-300 rounded-full hover:bg-blue-500 hover:text-gray-50">2</button>
							</span>
							<button className="px-3 py-1 duration-200 border border-gray-300 rounded-xl hover:bg-slate-300">Next</button>
						</span>
					</div>
				</div>
			</section>
		</div>
	);
}

export default pendingDepo;
