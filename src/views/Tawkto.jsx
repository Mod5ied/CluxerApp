import React, { useEffect } from "react";

const TawkTo = () => {
	useEffect(() => {
		const s1 = document.createElement("script");
		s1.async = true;
		s1.src = "https://embed.tawk.to/652157496fcfe87d54b76f55/1hc53pukt";
		s1.charset = "UTF-8";
		s1.setAttribute("crossorigin", "*");
		document.body.appendChild(s1);
	}, []);

	return null; // This component doesn't render anything
};

export default TawkTo;
