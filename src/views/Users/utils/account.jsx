import React, { useEffect, useState, useRef } from "react";
import successSv from "../../../assets/success.svg";
import { ReactSVG } from "react-svg";
import cancel from "../../../assets/cancel.svg";
import { useSpring, animated } from "react-spring";
import { updateProfile } from "../../../services/user-services/account";
import { updatePassword } from "../../../services/user-services/account";

function account({ userAccount }) {
	const formRef = useRef(null);
	const [resp, setResp] = useState(false);
	const [fullname, setFullname] = useState("");
	const [address, setAddress] = useState("");
	const [country, setCountry] = useState("");
	const [zip, setZipCode] = useState("");
	const [phone, setPhone] = useState("");
	const [city, setCity] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [password, setPassword] = useState("");
	const [success, setSuccess] = useState(false);
	const [showAnimatedDiv, setShowAnimatedDiv] = useState(false);
	

	const toggleDropdown = () => setIsOpen(!isOpen);
	const handleSubmitAvatar = () => {};

	const refreshForm = () => {
		setAddress("");
		setCity("");
		setCountry("");
		setFullname("");
		setZipCode("");
	};

	const handlePasswordChange = async (e) => {
		e.preventDefault();
		setResp(await updatePassword(userAccount.email, password));
		
		toggleDropdown();
		refreshForm();
		setTimeout(() => {
			setShowAnimatedDiv(true);
		}, 3000);
		setTimeout(() => {
			setShowAnimatedDiv(false);
		}, 4000);
	};

	const handleProfile = async (e) => {
		e.preventDefault();
		const data = { fullname, phone, country, city, zip, address, email: userAccount.email };
		await updateProfile(data);
		setSuccess(true);
		setTimeout(() => {
			setShowAnimatedDiv(true);
		}, 3000);
		setTimeout(() => {
			setShowAnimatedDiv(false);
		}, 4000);
	};

	const props = useSpring({
		transform: isOpen ? "translateY(0)" : "translateY(-120%)",
	});

	const successMessageStyles = useSpring({
		from: { transform: "translateX(-100%)" },
		to: async (next) => {
			await next({ transform: "translateX(0)" });
			// await delay(4000);
			await next({ transform: "translateX(-100%)" });
		},
	});

	useEffect(() => {
		if (success) {
			setTimeout(() => {
				setSuccess(false);
			}, 4000);
		}
	}, [success]);
	// }, [userAccount, success]);

	return (
		<div className="flex flex-col items-center h-full bg-gray-100">
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

			<section className="flex justify-center w-full">
				<button onClick={toggleDropdown} className="w-[60%] py-2 rounded-md shadow-md text-center bg-blue-700 text-slate-100 font-semibold">
					Change Password
				</button>
				{/* drop-down */}
				<animated.form
					style={props}
					className="absolute w-[90%] md:w-[40%] py-5 px-8 rounded-md shadow-md bg-white flex flex-col gap-6"
					onSubmit={handlePasswordChange}
					ref={formRef}
				>
					<section className="flex flex-row items-center justify-between px-2">
						<h3 className="font-bold ">Change password </h3>
						<ReactSVG onClick={toggleDropdown} src={cancel} />
					</section>
					<section className="flex flex-col gap-2">
						<span>
							<label htmlFor="password">New Password</label>
							<input className="account_form_input" type="text" id="password" onChange={(e) => setPassword(e.target.value)} />
						</span>
						<span>
							<label htmlFor="passOk">Confirm Password</label>
							<input className="account_form_input" type="text" id="passOk" />
						</span>
					</section>

					<span className="flex flex-col w-full gap-2 px-4 py-3">
						<button id="account_btn_drop" type="submit">
							Update
						</button>
					</span>
				</animated.form>
			</section>

			<section className="flex flex-col justify-between w-full gap-3 p-5 md:flex-row md:gap-0">
				<form id="account_form" onSubmit={handleProfile}>
					<section>
						<h3>Username: {userAccount.userName} </h3>
					</section>
					<section>
						<span>
							<label htmlFor="fullname">Fullname</label>
							<input className="account_form_input" type="text" id="fullname" onChange={(e) => setFullname(e.target.value)} />
						</span>
						<span>
							<label htmlFor="phone">Phone</label>
							<input className="account_form_input" type="number" id="phone" onChange={(e) => setPhone(e.target.value)} />
						</span>
						<span>
							<label htmlFor="country">Country</label>
							<input className="account_form_input" type="text" id="country" onChange={(e) => setCountry(e.target.value)} />
						</span>
						<span>
							<label htmlFor="city">City</label>
							<input className="account_form_input" type="text" id="city" onChange={(e) => setCity(e.target.value)} />
						</span>
						<span>
							<label htmlFor="zip_code">Zip Code</label>
							<input className="account_form_input" type="number" id="zip_code" onChange={(e) => setZipCode(e.target.value)} />
						</span>
						<span>
							<label htmlFor="address">Address</label>
							<input className="account_form_input" type="text" id="address" onChange={(e) => setAddress(e.target.value)} />
						</span>
					</section>
					<span className="">
						<button id="account_btn" type="submit">
							Confirm
						</button>
					</span>
				</form>

				<form className="w-full	 md:w-[30%] h-[220px] rounded-md shadow-md bg-white flex flex-col items-center" onClick={handleSubmitAvatar}>
					<h3 className="w-full px-5 py-4 font-bold">Change account photo</h3>

					<span className="flex flex-col w-full gap-2 px-4 py-3">
						<input type="file" name="file" id="file" className="account_form_input" />
						<button id="account_btn" type="submit">
							Confirm
						</button>
					</span>
				</form>
			</section>
		</div>
	);
}

export default account;
