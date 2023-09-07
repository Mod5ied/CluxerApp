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

function Dashboard() {
	const [signal, setSignal] = useState(false);
	const [stateAdmin, setStateAdmin] = useRecoilState(adminState);
	const [userRecord, setUserRecord] = useState({});
	const [wallets, setWallets] = useState([]);
	const [users, setUsers] = useState([]);
	const [pendingWithdraw, setPendingWith] = useState([]);
	const [approvedWithdraw, setApprovedWith] = useState([]);

	useEffect(() => {
		const userWallet = localStorage.getItem("userWallet");
		const userRecord = localStorage.getItem("userRecord");
		const userRecords = localStorage.getItem("userRecords");
		const penWithdraw = localStorage.getItem("pendingWithdraw");
		const appWithdraw = localStorage.getItem("approvedWithdraw");

		if (userRecord) {
			const parsedUserRecord = JSON.parse(userRecord);
			const parsedUsers = JSON.parse(userRecords);
			const parsedWallets = JSON.parse(userWallet);
			const parsedPendingWithdraw = JSON.parse(penWithdraw);
			const parsedApprovedWithdraw = JSON.parse(appWithdraw);

			setUserRecord(parsedUserRecord);
			setWallets(parsedWallets);
			setUsers(parsedUsers);
			setPendingWith(parsedPendingWithdraw);
			setApprovedWith(parsedApprovedWithdraw);
		}
	}, []);

	return (
		<div className="flex flex-row font-body">
			<Sidebar signal={signal} setSignal={setSignal} />
			<section className="h-[220px] w-full md:w-[95%] md:ml-auto flex flex-col justify-between items-center bg-blue-600">
				<Header user={userRecord} setSignal={setSignal} signal={signal} />
				{stateAdmin.depositPending && <PendingDepo users={users} deposits={wallets} />}
				{stateAdmin.depositApproved && <ApprovedDepo />}
				{stateAdmin.withdrawnPending && <PendingWithdraw />}
				{stateAdmin.withdrawnApproved && <ApprovedWithdraw />}
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
