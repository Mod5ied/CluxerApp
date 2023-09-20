import { ReactSVG } from "react-svg";
import bin from "../../../../assets/bin.svg";
import React, { useEffect, useState } from "react";
import arrDown from "../../../../assets/arrow-down.svg";
import arrDouble from "../../../../assets/arrow-double.svg";
import { adminState, useToggleState } from "../../../../services/state/state";
import Loader from "../../utils/loader";

function pending({ deleteWith, updateWith }) {
	const [paginateNumDrop, setPaginateNum] = useState(false);
	const toggleAdminState = useToggleState(adminState);
	const [approve, setApprove] = useState(false);
	const [withdrawals, setWithdrawals] = useState([]);

	const updateWithdrawal = (val) => {
		setApprove(true);
		setTimeout(async () => {
			await updateWith(val);
			setApprove(false);
		}, 500);
	};

	const deleteWithdrawal = (val) => {
		setApprove(true);
		setTimeout(async () => {
			await deleteWith(val);
			setApprove(false);
		}, 500);
	};

	useEffect(() => {
		setTimeout(() => {
			const withdraw = JSON.parse(localStorage.getItem("pendingWithdraw"));
			setWithdrawals(withdraw);
		}, 800);
	}, [deleteWithdrawal, updateWithdrawal]);

	return (
		<div className="bg-transparent flex flex-col gap-4 py-2 px-2 md:p-2 absolute h-full w-full md:w-[80%] top-20">
			<section className="flex flex-row justify-between px-4 py-2 md:px-0">
				<h2 className="text-xl font-semibold text-gray-100">Pending Withdraw</h2>
				<button onClick={() => toggleAdminState("addStaff")} className="reduce_btn" type="submit">
					Add Staff
				</button>
			</section>

			<section className="flex flex-col w-full gap-8 px-5 py-3 bg-white border rounded-md">
				<div>
					<h2 className="text-xl text-gray-700">Pending Withdraw</h2>
				</div>

				{/* table section. */}
				<div className="flex flex-col gap-4 overflow-x-scroll md:w-full">
					<div className="flex flex-col justify-center overflow-x-scroll md:overflow-x-hidden md:flex-row md:justify-between">
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
						{approve && (
							<div className="absolute rounded-md cursor-wait md:mb-5 w-full md:w-[95%] h-[400px] bg-gray-700 bg-opacity-50 flex flex-col justify-center items-center gap-2">
								<Loader />
								<p className="font-bold text-blue-600">Processing, please wait!</p>
							</div>
						)}

						<span className="flex flex-row w-[640px] px-0 md:px-0 md:w-full text-gray-100 bg-blue-500 md:rounded-t-md">
							<h3 className="h-[60px] w-[10%] flex items-center justify-around pl-1 md:pl-0 ">
								S.N 
							</h3>
							<h3 className="h-[60px] w-[25%] flex items-center md:justify-around pl-5 ">
								Client Details <ReactSVG src={arrDouble} className="text-gray-600" />
							</h3>
							<h3 className="h-[60px] w-[20%] flex items-center justify-around pl-5 ">
								Wallet Details <ReactSVG src={arrDouble} className="text-gray-600" />
							</h3>
							{/* <h3 className="h-[60px] w-[15%] flex items-center justify-around pl-1 ">
								Username <ReactSVG src={arrDouble} className="text-gray-600" />
							</h3> */}
							<h3 className="h-[60px] w-[15%] flex items-center justify-around pl-1 ">
								Amount <ReactSVG src={arrDouble} className="text-gray-600" />
							</h3>
							<h3 className="h-[60px] w-[20%] flex items-center justify-around pl-1 ">
								Status <ReactSVG src={arrDouble} className="text-gray-600" />
							</h3>
							<h3 className="h-[60px] w-[15%] flex items-center pl-2 md:pl-12 ">Actions</h3>
						</span>
						{/* 10 list below */}
						{!withdrawals || !withdrawals.length ? (
							<p className="py-4 text-stone-800">No withdrawals found</p>
						) : (
							withdrawals.map((req, index) => {
								return (
									<span
										key={index}
										className={`flex flex-row w-[640px] px-4 md:px-0 md:w-full text-sm ${index % 2 === 0 ? "bg-gray-200" : "bg-white"}`}
									>
										<p className="h-[63px] w-[10%] flex text-gray-800 items-center md:px-1 md:ml-8">{++index}</p>
										<div className="h-[63px] w-[20%] flex text-gray-800 flex-col justify-between md:pl-6 py-1 md:ml-8  md:overflow-hidden">
											<h5 className="text-sm text-stone-800">{req.username}</h5>
											{/* <h5 className="text-sm text-stone-800">{req.email}</h5> */}
											{/* <h5 className="text-sm text-stone-800">{req.mobile}</h5> */}
										</div>
										<div className="h-[63px] w-[20%] flex text-gray-800 flex-col justify-between pl-6 py-1 ml-8 overflow-hidden">
											<h5 className="text-sm text-stone-800"> Wallet: {req.wallet_name} </h5>
											<h5 className="text-sm text-stone-800">Wallet Address: {req.wallet_address} </h5>
										</div>
										{/* <p className="h-[63px] w-[15%] flex text-gray-800 items-center justify-between pl-6">{req.username}</p> */}
										<p className="h-[63px] w-[15%] flex text-gray-800 items-center justify-between pl-6">{req.amount}</p>
										<p className="h-[63px] w-[10%] md:w-[20%] flex text-red-600 font-bold items-center justify-between pl-6 md:pl-9">Pending</p>
										<p className="h-[63px] w-[25%] md:w-[15%] flex items-center gap-2 justify-center pl-6 ml-8">
											<button onClick={() => updateWithdrawal(req?.username)} className="px-3 py-1 bg-blue-600 rounded text-gray-50">
												Approve
											</button>
											<ReactSVG
												onClick={() => deleteWithdrawal(req?.username)}
												src={bin}
												className="py-[0.40rem] px-3 rounded bg-red-600 text-gray-50"
											/>
										</p>
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

export default pending;
