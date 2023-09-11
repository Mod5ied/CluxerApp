import React from "react";
import "./loader.css";

function Loader() {
	return (
		<div class="spring-spinner">
			<div class="spring-spinner-part top">
				<div class="spring-spinner-rotator"></div>
			</div>
			<div class="spring-spinner-part bottom">
				<div class="spring-spinner-rotator"></div>
			</div>
		</div>
	);
}

export default Loader;
