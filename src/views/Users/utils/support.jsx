import { ReactSVG } from "react-svg";
import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import arrRight from "../../../assets/arrow-right.svg";
import { submitSupportTicket } from "../../../services/user-services/support";

function support() {
	const [resp, setResp] = useState({});
	const [priority, setPriority] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const [details, setDetails] = useState("");
	const [subject, setSubject] = useState("");
	const toggleDropdown = () => setIsOpen(!isOpen);
	const [showSuccess, setShowSuccess] = useState(false);
	const delay = (ms) => new Promise((res) => setTimeout(res, ms));

	const createRequest = async (e) => {
		e.preventDefault()
		try {
			setIsOpen(!isOpen);
			const res = await submitSupportTicket(subject, priority, details);
			setResp(res);
		} catch (error) {
			console.error(error);
		}
	};

	const successMessageStyles = useSpring({
		from: { transform: "translateX(-100%)" },
		to: async (next) => {
			await next({ transform: "translateX(0)" });
			await delay(4000);
			await next({ transform: "translateX(-100%)" });
		},
	});

	const props = useSpring({
		transform: isOpen ? "translateY(50%) translateX(0%)" : "translateY(-100%)  translateX(0%)",
	});

	useEffect(() => {
		if (resp?.saved) {
			setShowSuccess(true);
			setTimeout(() => {
				setShowSuccess(false);
			}, 4000);
		}
	}, [resp?.saved]);

	return (
		<div className="flex flex-col items-center h-full bg-gray-100">
			{showSuccess && resp?.saved && (
				<animated.div
					style={successMessageStyles}
					id="success"
					className="w-[300px] absolute flex flex-row gap-3 items-center bg-green-500 text-stone-50 px-5 py-3 ml-4 rounded-md"
				>
					<ReactSVG src={success} />
					{resp?.message}
				</animated.div>
			)}
			<section className="flex flex-col gap-2 p-5 justify-center bg-stone-900 w-full h-[120px] rounded-md shadow-md">
				<h3 className="text-xl font-bold text-yellow-400">Customer Support</h3>
				<button
					onClick={toggleDropdown}
					className="w-[50%] md:w-[13%] flex flex-row justify-center items-center gap-1 mb-4 px-3 py-1 rounded-md shadow-md bg-white font-bold text-sm text-blue-600"
				>
					<ReactSVG src={arrRight} />
					Create request
				</button>
				<animated.form
					style={props}
					className="absolute md:mx-auto w-full md:w-[50%] py-5 px-4 md:px-8 rounded-md shadow-md bg-white flex flex-col justify-around gap-6"
					onSubmit={createRequest}
				>
					<section className="flex flex-col gap-2">
						<span className="flex flex-row items-center justify-between gap-2 md:gap-0">
							<label htmlFor="fullname">Subject</label>
							<input className="account_form_input" required={true} type="text" id="fullname" onChange={(e) => setSubject(e.target.value)} />
						</span>
						<span className="flex flex-row items-center justify-between gap-2 md:gap-0">
							<label htmlFor="fullname">Priority</label>
							<select className="account_form_input" onChange={(e) => setPriority(e.target.value)}>
								<option value="low">Low</option>
								<option value="medium">Medium</option>
								<option value="high">High</option>
							</select>
						</span>
						<span className="flex flex-row items-center justify-between gap-2 md:gap-0">
							<label htmlFor="fullname">Details</label>
							<textarea className="account_form_input" required={true} type="text" id="details" onChange={(e) => setDetails(e.target.value)} />
						</span>
					</section>

					<span className="flex flex-col w-full gap-2 py-3">
						<button onClick={createRequest} id="account_btn" type="submit">
							Submit
						</button>
					</span>
				</animated.form>
			</section>
		</div>
	);
}

export default support;
