import React from "react";
import { adminState, useToggleState } from "../../../services/state/state";

function paymentMethod(prop) {
	const toggleAdminState = useToggleState(adminState);

	const handleToggleState = (coin) => {
		toggleAdminState("viewPayment");
	};
	
	return (
		<div className="bg-transparent flex flex-col gap-8 p-2 absolute md:h-[70%] w-full md:w-[80%] top-20">
			<section className="flex flex-row justify-between py-2">
				<span className="flex flex-col justify-center gap-6 md:justify-start">
					<h2 className="text-xl font-semibold text-gray-100">Payment Method</h2>
				</span>
				<button className="reduce_btn h-11">Add Payment Method</button>
			</section>
			<section className="flex flex-col items-center w-full gap-8 md:items-start md:flex-row ">
				<div className="method_cards">
					<section>
						<h3>Bitcoin</h3>
					</section>
					<section className="method_cards-section">
						<p className="text-gray-700">Coin Address</p>
						<p className="text-gray-700"> {prop.address || "J0K0Ajh789a98ca9v9s8v9"} </p>
						<button onClick={() => handleToggleState("Bitcoin")} type="submit">
							Update
						</button>
					</section>
				</div>
				<div className="method_cards">
					<section>
						<h3>Ethereum</h3>
					</section>
					<section className="method_cards-section">
						<p className="text-gray-700">Coin Address</p>
						<p className="text-gray-700"> {prop.address || "H6f5789a98ca9v9s8v9"} </p>
						<button onClick={() => handleToggleState("Ethereum")} type="submit">
							Update
						</button>
					</section>
				</div>
				<div className="method_cards">
					<section>
						<h3>USDT</h3>
					</section>
					<section className="method_cards-section">
						<p className="text-gray-700">Coin Address</p>
						<p className="text-gray-700"> {prop.address || "0X02h789a98ca9v9s8v9"} </p>
						<button onClick={() => handleToggleState("USDT")} type="submit">
							Update
						</button>
					</section>
				</div>
			</section>
		</div>
	);
}

export default paymentMethod;
