import React, { useEffect } from "react";
import SignIn from "./views/signin/signin";
import SignUp from "./views/signup/signup";
import Contact from "./components/contact";
import Homepage from "./components/homepage";
import Aboutpage from "./components/aboutpage";
import AdminDashboard from "./views/Admin/dashboard";
import GuestDashboard from "./views/Users/main/dashboard";
import ResetPassword from "./views/recovery/forgotPassword";
import { useRoutes, useNavigate } from "react-router-dom";

function App() {
	const navigate = useNavigate();

	useEffect(() => {
		const userRecord = JSON.parse(localStorage.getItem("userRecord"));

		switch (userRecord?.is_admin) {
			case true:
				return navigate("/admin/dashboard");

			case false:
				return navigate("/dashboard");

			default:
				return navigate("/signin");
		}
	}, [navigate]);

	let routes = useRoutes([
		{ path: "/", element: <Homepage /> },
		{ path: "/contact", element: <Contact /> },
		{ path: "/about", element: <Aboutpage /> },
		{ path: "/signin", element: <SignIn /> },
		{ path: "/signup", element: <SignUp /> },
		{ path: "/reset_password", element: <ResetPassword /> },
		{ path: "/dashboard", element: <GuestDashboard /> },
		{ path: "/admin/dashboard", element: <AdminDashboard /> },
	]);

	return <main className="bg-gray-100 h-[980px] md:h-[1100px]">{routes}</main>;
}

export default App;
