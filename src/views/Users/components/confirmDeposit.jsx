import check from "../../../assets/check.svg";
import copy from "../../../assets/copy.svg";
import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import { handleFileUpload } from "../../../services/user-services/upload";

function ConfirmDeposit({ amount, fundDeposit, type, setSubmitted }) {
	const [copied, setCopied] = useState(false);
	const [loading, setLoading] = useState(false);
	const [selectedFile, setSelectedFile] = useState(null);

	const address = useState("bc1qk2yfucs7zzasgap0y5aqz0nphvsyl27avk");

	async function handleCopy() {
		const inputElement = document.querySelector('input[type="text"]');
		await navigator.clipboard.writeText(inputElement.value);
		setCopied(!copied);
		setTimeout(() => setCopied((prev) => !prev), 1100);
	}

	const handleClick = async () => {
		await fundDeposit(amount, type);
		setLoading(!loading);
		await handleFileUpload(selectedFile)

		setTimeout(async () => {
			setSubmitted(false);
		}, 2000);
	};

	const Progress = () => (
		<div className="hollow-dots-spinner">
			<div className="dot"></div>
			<div className="dot"></div>
			<div className="dot"></div>
		</div>
	);
	return (
		<div className="w-full md:w-[50%] flex flex-col gap-4 px-4 md:px-6 py-4 md:py-5 bg-stone-900 rounded-md">
			<div className="flex flex-col gap-10 justify-between">
				<h2 className="font-semibold text-lg text-stone-100">Confirm Payment</h2>
				<div className="space-y-2">
					<p className="font-semibold text-sm">Pay with {type || "WalletXX"}</p>
					<p className="text-sm font-light">Please send only {type || "walletXX"} to this wallet address</p>
					<p className="font-semibold text-sm"> {type} Address:</p>
					<span className="flex flex-row items-center justify-between mt-2 pl-3 w-full md:w-[85%] border border-gray-500 rounded-md">
						<input type="text" value={address} className="text-sm h-full bg-transparent text-stone-100" />
						<div onClick={handleCopy} className="px-4 py-2 md:grid place-items-center bg-red-800 w-[15%] rounded-r-md hover:bg-red-600 duration-200">
							{!copied ? <ReactSVG src={copy} className="text-gray-100" /> : <ReactSVG src={check} className="font-extrabold text-gray-200" />}
						</div>
					</span>
				</div>
			</div>

			<div className="flex flex-col gap-3 w-full">
				<span className="flex flex-row items-center justify-between w-[80%]">
					<p className="text-sm">Payment method:</p> <p className="text-red-500">{type || "walletXX"}</p>
				</span>
				<span className="flex flex-row items-center justify-between w-[80%]">
					<p className="text-sm">Amount:</p> <p className="text-red-500">${amount || "000"}</p>
				</span>
			</div>

			<div className="flex flex-col space-y-3 mt-2">
				<p className="font-semibold text-sm">Upload Payment proof after payment </p>
				<span className="flex flex-row rounded-md overflow-hidden">
					<input
						type="file"
						id="file-input"
						placeholder="no file selected"
						className="rounded-md bg-stone-50 pl-8 px-1 py-2"
						onChange={(e) => setSelectedFile(e.target.files[0])}
					/>
				</span>
				<span className="rounded-md overflow-hidden grid place-items-center md:place-items-start">
					<p
						onClick={handleClick}
						className="grid place-content-center w-[60%] px-2 py-2 rounded-md bg-red-600 text-stone-100 font-semibold text-sm md:text-base"
					>
						{!loading ? "Completed payment" : <Progress />}
					</p>
				</span>
			</div>
			<div></div>
			<div></div>
		</div>
	);
}

export default ConfirmDeposit;
