import React, { useState } from "react";
import { adminState, useToggleState } from "../../../services/state/state";

function paymentMethod({methods}) {
	const toggleAdminState = useToggleState(adminState);
	

	const handleToggleState = () => toggleAdminState("viewPayment");

	return (
		<div className="bg-transparent flex flex-col gap-8 p-2 absolute md:h-[70%] w-full md:w-[80%] top-20">
			<section className="flex flex-row justify-between py-2">
				<span className="flex flex-col justify-center gap-6 md:justify-start">
					<h2 className="text-xl font-semibold text-gray-100">Payment Method</h2>
				</span>
				<button onClick={() => toggleAdminState("addMethod")} className="reduce_btn h-11">
					Add Payment Method
				</button>
			</section>
			<section className="flex flex-col items-center w-full gap-8 md:items-start md:flex-row ">
				{methods.map((doc) => (
					<div className="method_cards" key={doc.coin}>
						<section>
							<h3>{doc.coin}</h3>
						</section>
						<section className="method_cards-section">
							<p className="text-gray-700">Coin Address</p>
							<p className="text-gray-700"> {doc.address} </p>
							<button onClick={() => handleToggleState(doc.coin)} type="submit">
								Update
							</button>
						</section>
					</div>
				))}
			</section>
		</div>
	);
}

export default paymentMethod;
