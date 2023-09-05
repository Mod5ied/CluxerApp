import { ReactSVG } from "react-svg";
import success from "../../../assets/success.svg"

function notifier(prop) {
	return (
		<div className="bg-white w-[300px] h-[280px] flex flex-col absolute top-16 right-8 md:right-36 rounded-md overflow-hidden border">
			<section id="notif-top" className="py-2 px-4 border-b">
				<h3 className="font-bold">Messages</h3>
			</section>
			<section id="notif-mid" className="h-full flex flex-row justify-between px-2">
				{/* creation-success icons */}
				<p className="m-auto">
					<ReactSVG src={success} className="text-gray-800" />
				</p>
				<div className="flex flex-col w-4/5 justify-around">
					<h3 className="font-semibold">Registration Successful!</h3>
					<span className="">
						<p className="text-gray-800 text-sm">Thank you for joining our program</p>
						<p className="text-gray-800 text-sm">
							You are now an official member of this program. You can login to your account to start investing with us and use all the services that are
							available to our members.
						</p>
						<p className="text-green-400 text-sm">{prop.date || "creation date here!"}</p>
					</span>
				</div>
			</section>
			<section className="border-t px-2">
				<div className="flex flex-row items-center justify-between p-2">
					<p className="text-gray-800">See all messages</p>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-5">
						<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
					</svg>
				</div>
			</section>
		</div>
	);
}

export default notifier;
