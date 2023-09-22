import React, { useState, useEffect } from "react";
import test1 from "../assets/testimonial1.jpg";
import test2 from "../assets/testimonial2.jpg";
import test3 from "../assets/test3.jpg";
import left from "../assets/left.svg";
import right from "../assets/right.svg";
import { ReactSVG } from "react-svg";

function footerSlide() {
	const [activeIndex, setActiveIndex] = useState(0);
	const carouselData = [
		{
			image: test1,
			text: "I highly recommend you try Blockvault Trade if you really want your money to work for you. Great people to deal with. Very professional and offer a fantastic level of personal customer service.",
			author: "Ted Moralee",
		},
		{
			image: test2,
			text: "I am very impressed with the thoroughness and professionalism of the investment diligence packages Blockvault Trade provides.",
			author: "Peter Bowyer",
		},
		{
			image: test3,
			text: "Your diligence is why we investors trust you. You're not out to make a quick buck, you're looking after our best interest. Thank you!",
			author: "Mr L. & Mrs H. M. Steward",
		},
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
		}, 8000);

		return () => clearInterval(interval);
	}, []);

	const handleNext = () => {
		setActiveIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
	};

	const handlePrev = () => {
		setActiveIndex((prevIndex) => (prevIndex - 1 + carouselData.length) % carouselData.length);
	};

	return (
		<div>
			{carouselData.map((item, index) => (
				<div key={index} className={`flex flex-col items-center gap-10 md:h-[500px] w-full ${index === activeIndex ? "active" : ""}`}>
					<span className="md:w-[50%] flex flex-col items-center gap-3">
						<img src={item.image} alt={item.author} className="rounded-full" />
						<p className="text-lg text-center text-stone-600">{item.text}</p>
						<p className="text-lg font-bold text-stone-800"> {item.author} </p>
					</span>
					<span className="flex flex-row gap-4">
						<ReactSVG onClick={handleNext} src={left} className="p-3 text-gray-100 bg-yellow-500 rounded-full hover:text-gray-50 hover:bg-yellow-600" />
						<ReactSVG onClick={handlePrev} src={right} className="p-3 text-gray-100 bg-yellow-500 rounded-full hover:text-gray-50 hover:bg-yellow-600" />
					</span>
				</div>
			))}
		</div>
	);
}

export default footerSlide;
