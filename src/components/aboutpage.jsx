import React from "react";
import logo from "../assets/block-logo.png";
import expert from "../assets/expert1.png";
import badge from "../assets/badge1.png";
import slide1 from "../assets/slide1.jpg";
import pc from "../assets/computers.jpg";
import staff1 from "../assets/staff1.jpg";
import staff2 from "../assets/staff2.jpeg";
import staff3 from "../assets/staff3.jpg";
import staff4 from "../assets/staff4.jpeg";
import { useNavigate } from "react-router";
import TawkTo from "../views/Tawkto";

const AboutPage = () => {
	const navigator = useNavigate();

	const redirectToHome = () => navigator("/");
	const redirectToAbout = () => navigator("/about");
	const redirectToSignup = () => navigator("/signup");
	const redirectToSignin = () => navigator("/signin");
	const redirectToContact = () => navigator("/contact");

	return (
		<div className="font-home">
			<header className="w-full">
				<section id="top" className="flex flex-row justify-between w-full px-8 py-2 bg-indigo-900">
					<p className="flex flex-row items-center gap-1 text-sm text-gray-100">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
							/>
						</svg>
						info@blockvault.com
					</p>
					<span className="flex flex-row items-center gap-4 text-sm text-gray-100"></span>
				</section>
				<section id="flat" className="w-full h-[130px] flex flex-row justify-between bg-stone-50 px-8">
					<span className="[60%] flex flex-row items-center gap-2">
						<img src={logo} alt="cluxter_logo" className="w-[50%] h-[50%]" />
						<h1 className="text-3xl font-bold">BLOCKVAULT</h1>
					</span>
					<span className="w-[30%] flex flex-row items-center justify-between">
						<a onClick={redirectToHome} className="border-orange-500 hover:border-b" href="">
							Home
						</a>
						<a onClick={redirectToAbout} className="border-orange-500 hover:border-b" href="">
							About us
						</a>
						{/* <a className="border-orange-500 hover:border-b" href="">Faq</a> */}
						<a onClick={redirectToContact} className="border-orange-500 hover:border-b" href="">
							Contact
						</a>
						<a onClick={redirectToSignin} className="border-orange-500 hover:border-b" href="">
							Sign-In
						</a>
						<a onClick={redirectToSignup} className="border-orange-500 hover:border-b" href="">
							Sign-Up
						</a>
					</span>
					<span className="w-[12%] flex flex-row items-center justify-around">
						<ion-icon class="text-orange-500 bg-stone-200 p-2 rounded-full" name="logo-facebook"></ion-icon>
						<ion-icon class="text-orange-500 bg-stone-200 p-2 rounded-full" name="logo-twitter"></ion-icon>
						<ion-icon class="text-orange-500 bg-stone-200 p-2 rounded-full" name="logo-linkedin"></ion-icon>
						<ion-icon class="text-orange-500 bg-stone-200 p-2 rounded-full" name="logo-instagram"></ion-icon>
					</span>
				</section>
			</header>

			<section id="mid" className="w-full h-[300px] relative flex flex-col items-center justify-center">
				<div id="hue-mid"></div>
				<div className="w-[50%] flex flex-col items-center gap-4 relative z-20">
					<h3 className="text-3xl font-semibold text-white">About Us</h3>
					<span className="flex flex-row justify-between gap-9 ">
						<a onClick={redirectToHome} className="text-lg font-semibold text-stone-200 hover:text-orange-500">
							Home
						</a>
						<a onClick={redirectToContact} className="text-lg font-semibold text-stone-200 hover:text-orange-500">
							Contact
						</a>
						<a onClick={redirectToContact} className="text-lg font-semibold text-orange-500">
							About
						</a>
					</span>
				</div>
			</section>

			<section id="welcome-section" className="w-full h-[550px] bg-white flex flex-row items-center justify-between px-20">
				<div id="left" className="w-[45%] relative md:left-20 flex flex-col justify-center pt-10 gap-8">
					<h2 className="text-4xl font-bold">Welcome To Blockvault</h2>
					<span className="flex flex-row justify-between ">
						<p className="flex flex-row items-center gap-2 text-lg font-bold text-stone-800">
							<img src={expert} alt="Expert_trader" /> Expert Traders
						</p>
						<p className="flex flex-row items-center gap-2 text-lg font-bold text-stone-800">
							<img src={badge} alt="Best_quality" /> Best Quality Services
						</p>
					</span>
					<p className="text-lg text-stone-600">
						Blockvault is a registered investment platform providing digital asset investment management services to individuals. We provide a dynamic
						investment solution to clients in need of a self-operating portfolio, as well as a smart fund with flexible time and investment amount. Focused,
						Active Management of High-Growth Digital Assets. Thanks to this, you can distribute funds in various directions and not miss profitable projects
						and deals. Our approach to active investment management is based on an investment process that fully integrates sustainability analysis into our
						decision-making and is focused on long-term performance. Our investment process underpins our differentiated thinking about the dynamics that
						drive and influence the performance of portfolios. We construct portfolios of sustainable markets with the confidence derived from our deep
						research and analysis.
					</p>
				</div>
				<div id="right" className="w-[40%] relative md:right-10">
					<img src={pc} alt="computers" className="w-full h-full" />
				</div>
			</section>

			<section id="meet-section" className="w-full h-[600px] flex flex-col items-center gap-10 py-10 bg-white">
				<span className="flex flex-col items-center justify-center gap-5">
					<h3 className="w-[70%] font-extrabold text-center text-stone-900 text-4xl">Meet Our Professional Team Members</h3>
				</span>
				<div className="md:w-[80%] h-[380px] flex flex-row justify-around py-2">
					<span className="h-[350px] w-[200px] flex flex-col items-center gap-4 py-4">
						<img src={staff1} alt="david_forrest" className="w-full h-[280px]" />
						<p className="text-xl font-semibold text-stone-800">David Forrest</p>
					</span>
					<span className="h-[350px] w-[200px] flex flex-col items-center gap-4 py-4">
						<img src={staff2} alt="david_forrest" className="w-full h-[300px]" />
						<p className="text-xl font-semibold text-stone-800">Evelyn Mason</p>
					</span>
					<span className="h-[350px] w-[200px] flex flex-col items-center gap-4 py-4">
						<img src={staff3} alt="david_forrest" className="w-full h-[270px]" />
						<p className="text-xl font-semibold text-stone-800">Gary Adamson</p>
					</span>
					<span className="h-[350px] w-[200px] flex flex-col items-center gap-4 py-4">
						<img src={staff4} alt="david_forrest" className="w-full h-[300px]" />
						<p className="text-xl font-semibold text-stone-800">Darlington Smith</p>
					</span>
				</div>
			</section>

			<footer className="h-[600px] flex flex-col items-center gap-5 bg-indigo-900 py-5">
				<section id="top" className="w-[80%] flex flex-row justify-between">
					<div className="w-[50%] flex flex-col gap-3">
						<span className="flex flex-row items-center gap-2 ">
							<img src={logo} alt="cluxter_logo" className="w-[80px] h-[80px]" />
							<h1 className="text-3xl font-bold text-stone-100">BLOCKVAULT</h1>
						</span>
						<p className="font-light text-stone-300">
							Blockvault is a registered investment platform providing digital asset investment management services to individuals. We provide a dynamic
							investment solution to clients in need of a self-operating portfolio, as well as a smart fund with flexible time and investment amount.
						</p>
					</div>

					<div className="w-[40%] flex flex-col gap-4">
						<h3 className="text-2xl font-bold text-stone-100">Newsletter</h3>
						<p>For update about our investment. Please subscribe</p>
						<span className="h-[50px] border">
							<input type="text" className="w-[80%] h-full bg-transparent text-stone-200 px-5" />
							<button className="w-[16%] h-[80%] text-sm rounded-md p-1 ml-3 bg-yellow-500 text-stone-100">Sign Up</button>
						</span>
					</div>
				</section>

				<section id="mid" className="w-[80%] flex flex-row gap-5">
					<span className="flex flex-col gap-5">
						<h3 className="text-2xl font-bold text-stone-100">Get In Touch</h3>
						<p className="flex flex-row text-sm font-light text-stone-300">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
								<path
									fillRule="evenodd"
									d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
									clipRule="evenodd"
								/>
							</svg>
							25 High St. Coventry CV! 5RE, United Kingdom
						</p>
						<p className="flex flex-row items-center text-sm font-light text-stone-300">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
								<path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
								<path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
							</svg>
							info@blockvault.com
						</p>
					</span>
					<span className="w-[30%] flex flex-col gap-5">
						<h3 className="text-2xl font-bold text-stone-100">Quick Links</h3>
						<span className="flex flex-col gap-4">
							<a className="cursor-pointer hover:text-yellow-600 text-sm font-light text-stone-300">About Us</a>
							<a className="cursor-pointer hover:text-yellow-600 text-sm font-light text-stone-300">Contact Us</a>
							<a className="cursor-pointer hover:text-yellow-600 text-sm font-light text-stone-300">Blog</a>
							<a className="cursor-pointer hover:text-yellow-600 text-sm font-light text-stone-300">Terms & Condition</a>
						</span>
					</span>
					<div className="w-[40%] flex flex-col gap-5">
						<h3 className="text-2xl font-bold text-stone-100">Follow Us</h3>
						<span className="flex flex-row items-center gap-3">
							<ion-icon
								class="bg-transparent p-3 text-stone-200 rounded-full border border-gray-200 hover:border-amber-500"
								name="logo-facebook"
							></ion-icon>
							<ion-icon
								class="bg-transparent p-3 text-stone-200 rounded-full border border-gray-200 hover:border-amber-500"
								name="logo-twitter"
							></ion-icon>
							<ion-icon
								class="bg-transparent p-3 text-stone-200 rounded-full border border-gray-200 hover:border-amber-500"
								name="logo-linkedin"
							></ion-icon>
							<ion-icon
								class="bg-transparent p-3 text-stone-200 rounded-full border border-gray-200 hover:border-amber-500"
								name="logo-instagram"
							></ion-icon>
						</span>
					</div>
				</section>

				<section id="flat" className="w-[80%] flex flex-row justify-between py-2 border-t-gray-400">
					<p className="flex flex-row items-center text-sm font-light">
						© <span className="text-yellow-600">Blockvault</span>, All Right Reserved.
					</p>

					<p className="text-sm font-light">Designed By Blockvault and Distributed by Blockvault Marketer</p>
				</section>
			</footer>
			<TawkTo />
		</div>
	);
};

export default AboutPage;
