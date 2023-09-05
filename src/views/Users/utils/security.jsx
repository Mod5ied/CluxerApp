import { ReactSVG } from "react-svg";
import React, { useState } from "react";
import send from "../../../assets/send.svg";
import qr_code from "../../../assets/qrcode.png";
import { updatePassword, updatePin } from "../../../services/user-services/account";
import { useSpring, animated } from "react-spring";
import successSv from "../../../assets/success.svg";

function security({ userAccount }) {
	const [pin, setPin] = useState("");
	const [oldPin, setOldPin] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPin, setConfirmPin] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showAnimatedDiv, setShowAnimatedDiv] = useState(false);

	const handleEnable = () => {};
	
	const handleSubmitPin = async (e) => {
		e.preventDefault();
		const res = await updatePin(userAccount.email, pin);
		setTimeout(() => {
			setPin("");
			setOldPin("");
			setConfirmPin("");
		}, 300);
		setTimeout(() => {
			setShowAnimatedDiv(true);
		}, 2000);
		setTimeout(() => {
			setShowAnimatedDiv(false);
		}, 3000);
	};

	const successMessageStyles = useSpring({
		from: { transform: "translateX(-100%)" },
		to: async (next) => {
			await next({ transform: "translateX(0)" });
			// await delay(4000);
			await next({ transform: "translateX(-100%)" });
		},
	});

	const handleSubmitPassword = async (e) => {
		e.preventDefault();
		await updatePassword(userAccount.email, password);
		setTimeout(() => {
			setPassword("");
			setConfirmPassword("");
		}, 300);
		setTimeout(() => {
			setShowAnimatedDiv(true);
		}, 2000);
		setTimeout(() => {
			setShowAnimatedDiv(false);
		}, 3000);
	};

	return (
		<div className="flex flex-col items-center h-full gap-4 bg-gray-100">
			{showAnimatedDiv && (
				<animated.p
					style={successMessageStyles}
					id="success"
					className="w-[330px] absolute flex flex-row gap-3 items-center bg-green-500 text-stone-50 px-5 py-3 ml-4 rounded-md"
				>
					<ReactSVG src={successSv} />
					Account updated successfully!
				</animated.p>
			)}

			<section className="flex flex-col justify-between w-full gap-4 md:flex-row md:gap-0">
				<form
					className="flex flex-col justify-around md:gap-5 px-6 py-2 rounded-md bg-stone-900 w-full md:w-[45%] h-[300px] text-gray-100"
					onSubmit={handleSubmitPassword}
				>
					<section className="flex flex-row items-center justify-between">
						<h3 className="font-bold text-gray-100">Change password </h3>
					</section>
					<section className="flex flex-col gap-4">
						<span className="flex flex-col justify-between md:flex-row">
							<label htmlFor="fullname">New Password</label>
							<input className="security_form_input" type="text" id="password" onChange={(e) => setPassword(e.target.value)} />
						</span>
						<span className="flex flex-col justify-between md:flex-row">
							<label htmlFor="confirm">Confirm Password</label>
							<input className="security_form_input" type="text" id="confirm" onChange={(e) => setConfirmPassword(e.target.value)} />
						</span>
					</section>
					<span className="flex justify-end w-full py-3">
						<button className="security_btn" type="submit">
							Submit
						</button>
					</span>
				</form>

				<form
					className="flex flex-col justify-around md:gap-5 px-6 py-2 rounded-md bg-stone-900 w-full md:w-[45%] h-[380px] md:h-[320px] text-gray-100"
					onSubmit={handleSubmitPin}
				>
					<section className="flex flex-row items-center justify-between">
						<h3 className="font-bold text-gray-100">Change Pin (Default pin on registration is 0000)</h3>
					</section>
					<section className="flex flex-col gap-2">
						<span className="flex flex-col justify-between md:flex-row">
							<label htmlFor="fullname">Old Pin</label>
							<input className="security_form_input" type="text" id="password" value={oldPin} onChange={(e) => setOldPin(e.target.value)} />
						</span>
						<span className="flex flex-col justify-between md:flex-row">
							<label htmlFor="fullname">New Pin</label>
							<input className="security_form_input" type="text" id="password" value={pin} onChange={(e) => setPin(e.target.value)} />
						</span>
						<span className="flex flex-col justify-between md:flex-row">
							<label htmlFor="fullname">Confirm Pin</label>
							<input className="security_form_input" type="text" id="password" value={confirmPin} onChange={(e) => setConfirmPin(e.target.value)} />
						</span>
					</section>
					<span className="flex justify-end w-full py-3">
						<button class="security_btn" type="submit">
							Submit
						</button>
					</span>
				</form>
			</section>

			<section className="w-full text-gray-100 py-5 px-8 rounded-md shadow-md bg-stone-900 flex flex-col gap-6;">
				<h3>Two-Factor Security Option</h3>
				<span className="flex flex-col gap-2 mt-4">
					<p>
						Two-factor authentication is a method for protection your web account. When it is activated you need to enter not only your password, but also a
						special code. You can receive this code by in mobile app. Even if third person will find your password, then can't access with that code.
					</p>
					<div className="flex flex-col gap-2">
						<button className="w-[50%] md:w-[12%] px-3 py-2 md:py-1 text-xs text-center text-blue-600 rounded-md font-bold bg-stone-200">DISABLED</button>
						<p>1) Install an authentication app on your device. Any app that supports the Time-based One-Time Password (TOTP) protocol should work.</p>
						<p>2) Use the authenticator app to scan the barcode below.</p>
						<img src={qr_code} alt="qr_code" className="w-[100%] md:w-[18%] h-[100%]" />

						<p>3) Enter the code generated by the authenticator app</p>
						<section className="w-full md:w-[60%] flex flex-col gap-3">
							<input className="security_form_input" type="number" placeholder="Enter code" />
							<ReactSVG onClick={handleEnable} src={send} className="absolute left-[80%] md:left-[40%] mt-2 hover:text-green-600" />
						</section>
					</div>
				</span>
			</section>
		</div>
	);
}

export default security;
