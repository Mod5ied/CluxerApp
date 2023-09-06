import { adminState, useToggleState } from "../../../../services/state/state";
import arrDouble from "../../../../assets/arrow-double.svg";
import arrDown from "../../../../assets/arrow-down.svg";
import bin from "../../../../assets/bin.svg";
import React, { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";

function client({ userRecord, userRecords }) {
	const [paginateNumDrop, setPaginateNum] = useState(false);
	const toggleAdminState = useToggleState(adminState);
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({});

	useEffect(() => {
		// console.log(userRecord);
		// console.log(users);
		setUser(userRecord);
		setUsers(userRecords)
	}, [userRecord, userRecords]);

	return (
		<div className="bg-transparent flex flex-col gap-4 py-2 px-2 md:p-2 absolute h-full w-full md:w-[80%] top-20">
			<section className="flex flex-row justify-between px-4 py-2 md:px-0">
				<h2 className="text-xl font-semibold text-gray-100">Client</h2>
				<button onClick={() => toggleAdminState("addStaff")} className="reduce_btn" type="submit">
					Add Staff
				</button>
			</section>

			{/* White card */}
			<section className="flex flex-col w-full gap-8 py-3 bg-white border rounded-md md:px-5">
				<div>
					<h2 className="text-xl text-gray-700">Client</h2>
				</div>

				{/* table section. */}
				<div className="flex flex-col gap-4 overflow-x-scroll md:w-full">
					<div className="flex flex-col justify-center overflow-x-scroll md:flex-row md:justify-between">
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
							<h3 className="h-[60px] md:w-[10%] w-[4%] flex items-center justify-between px-1 ml-5">
								S.N <ReactSVG src={arrDouble} className="text-gray-600" />
							</h3>
							<h3 className="h-[60px] md:w-[30%] w-[35%] flex items-center justify-between px-1 ml-5">
								Details <ReactSVG src={arrDouble} className="text-gray-600" />
							</h3>
							<h3 className="h-[60px] md:w-[20%] w-[14%] flex items-center justify-between px-1 ml-5">
								Username <ReactSVG src={arrDouble} className="text-gray-600" />
							</h3>
							<h3 className="h-[60px] md:w-[20%] w-[14%] flex items-center justify-between px-1 ml-5">
								Role <ReactSVG src={arrDouble} className="text-gray-600" />
							</h3>
							<h3 className="h-[60px] md:w-[25%] w-[25%] flex items-center justify-between px-1 ml-5">
								Created at <ReactSVG src={arrDouble} className="text-gray-600" />
							</h3>
							<h3 className="h-[60px] md:w-[15%] w-[25%] flex items-center justify-between px-1 ml-10">Actions</h3>
						</span>
						{/* 10 list below */}
						{users.map((user, index) => {
							return (
								<span key={index} className={`flex flex-row w-[640px] px-4 md:px-0 md:w-full ${index % 2 === 0 ? "bg-gray-200" : "bg-white"}`}>
									<p className="h-[63px] w-[10%] flex text-gray-800 items-center justify-between md:px-1 md:ml-5">{index}</p>
									<p className="h-[63px] w-[35%] flex text-gray-800 flex-col justify-between md:px-1 py-1 md:ml-5 overflow-hidden">
										<h5 className="text-sm">{user.fullname}</h5>
										<h5 className="text-sm">{user.email}</h5>
										<h5 className="text-sm">{user.mobile}</h5>
									</p>
									<p className="h-[63px] w-[20%] flex text-gray-800 items-center justify-between px-1 md:ml-3">{user.username}</p>
									<p className="h-[63px] w-[20%] flex text-gray-800 items-center justify-between px-1 md:ml-3">{!user.is_admin && "Client"}</p>
									<p className="h-[63px] md:w-[20%] w-[25%] flex text-gray-800 items-center justify-between px-1 md:ml-5">{user.created}</p>
									<p className="h-[63px] md:w-[25%] w-[20%] flex items-center gap-2 justify-center pl-6">
										<button className="px-3 py-1 text-sm duration-200 bg-blue-600 rounded text-gray-50 hover:bg-blue-400">Edit</button>
										<ReactSVG
											src={bin}
											className="py-[0.40rem] px-3 rounded bg-red-600 text-gray-50 hover:bg-red-400 cursor-pointer duration-200"
										/>
									</p>
								</span>
							);
						})}
					</div>

					{/* sectioning by right. */}
					{/* <div className="flex justify-end w-full border-t">
						<span className="w-[50%] h-[50px] py-2 px-1 flex justify-end gap-1">
							<button className="px-3 py-1 duration-200 border border-gray-300 rounded-xl hover:bg-slate-300">Previous</button>
							<span className="w-[22%] flex justify-around gap-2">
								<button className="p-1 px-3 duration-200 border border-gray-300 rounded-full hover:bg-blue-500 hover:text-gray-50">1</button>
								<button className="p-1 px-3 duration-200 border border-gray-300 rounded-full hover:bg-blue-500 hover:text-gray-50">2</button>
								<button className="p-1 px-3 duration-200 border border-gray-300 rounded-full hover:bg-blue-500 hover:text-gray-50">3</button>
							</span>
							<button className="px-3 py-1 duration-200 border border-gray-300 rounded-xl hover:bg-slate-300">Next</button>
						</span>
					</div> */}
				</div>
			</section>
		</div>
	);
}

export default client;
