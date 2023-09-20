import { useRecoilState } from "recoil";
import AddStaff from "./utils/addStaff";
import AddBonus from "./utils/addBonus";
import AddProfit from "./utils/addProfit";
import PendingDepo from "./main/deposit/pending";
import ApprovedDepo from "./main/deposit/approved";
import ReduceFunds from "./utils/reduceFund";
import FundDeposit from "./utils/fundDeposit";
import Header from "../../components/header";
import Metrics from "../../components/metrics";
import Sidebar from "../../components/sidebar";
import PendingWithdraw from "./main/withdrawn/pending";
import PaymentMethod from "./utils/paymentMethod";
import Client from "./main/users/client";
import ApprovedWithdraw from "./main/withdrawn/approved";
import ViewPayment from "./layouts/viewPayment";
import { adminState } from "../../services/state/state";
import { useEffect, useState } from "react";
import { deleteDeposit, updateDeposit } from "../../services/user-services/deposits";
import { approveWithdrawal, deleteWithdrawal } from "../../services/user-services/withdrawals";

function Dashboard() {
	const [signal, setSignal] = useState(false);
	const [stateAdmin, setStateAdmin] = useRecoilState(adminState);
	const [users, setUsers] = useState([]);
	const [userRecord, setUserRecord] = useState({});
	const [approvedWithdraw, setApprovedWith] = useState([]);
	const [approvedDeposits, setApprovedDepo] = useState([]);
	const [deposits, setDepo] = useState([]);

	useEffect(() => {
		const userRecord = localStorage.getItem("userRecord");
		const userRecords = localStorage.getItem("userRecords");

		if (userRecord) {
			setUserRecord(JSON.parse(userRecord));
			setUsers(JSON.parse(userRecords));
			setApprovedWith(JSON.parse(localStorage.getItem("approvedWithdraw")));
			setApprovedDepo(JSON.parse(localStorage.getItem("approvedDeposits")));
			setDepo(JSON.parse(localStorage.getItem("userDeposits")));
		}
	}, []);

	const deleteDepo = async (val) => {
		await deleteDeposit(val);
	};

	const updateDepo = async (val) => {
		await updateDeposit(val);
	};

	return (
		<div className="flex flex-row font-body">
			<Sidebar signal={signal} setSignal={setSignal} />
			<section className="h-[220px] w-full md:w-[95%] md:ml-auto flex flex-col justify-between items-center bg-blue-600">
				<Header user={userRecord} setSignal={setSignal} signal={signal} />
				{stateAdmin.depositApproved && <ApprovedDepo approvedReqs={approvedDeposits} />}
				{stateAdmin.withdrawnApproved && <ApprovedWithdraw approvedReqs={approvedWithdraw} />}
				{stateAdmin.depositPending && <PendingDepo deps={deposits} deleteDepo={deleteDepo} updateDepo={updateDepo} />}
				{stateAdmin.withdrawnPending && <PendingWithdraw deleteWith={deleteWithdrawal} updateWith={approveWithdrawal} />}
				{/*  */}
				{stateAdmin.client && <Client userRecords={users} userRecord={userRecord} />}
				{stateAdmin.dashboard && <Metrics />}
				{stateAdmin.addStaff && <AddStaff />}
				{stateAdmin.addBonus && <AddBonus />}
				{stateAdmin.addProfit && <AddProfit />}
				{stateAdmin.fundDeposit && <FundDeposit />}
				{stateAdmin.reduceFunds && <ReduceFunds />}
				{stateAdmin.viewPayment && <ViewPayment />}
				{stateAdmin.paymentMethod && <PaymentMethod />}
			</section>
		</div>
	);
}

export default Dashboard;
