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
import { useState } from "react";

function Dashboard(props) {
	const [stateAdmin, setStateAdmin] = useRecoilState(adminState);
	const [signal, setSignal] = useState(false);

	return (
		<div className="flex flex-row font-body">
			<Sidebar signal={signal} setSignal={setSignal} />
			<section className="h-[220px] w-full md:w-[95%] md:ml-auto flex flex-col justify-between items-center bg-blue-600">
				<Header setSignal={setSignal} signal={signal} />
				{stateAdmin.depositPending && <PendingDepo />}
				{stateAdmin.depositApproved && <ApprovedDepo />}
				{stateAdmin.withdrawnPending && <PendingWithdraw />}
				{stateAdmin.withdrawnApproved && <ApprovedWithdraw />}
				{/*  */}
				{stateAdmin.client && <Client />}
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
