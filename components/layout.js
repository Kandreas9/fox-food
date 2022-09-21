import axios from "axios";
import Cookies from "js-cookie";

import { useEffect, useState } from "react";
import Header from "./header/header";
import Register from "./register/register";

export default function Layout({ children }) {
	const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

	const handleModalToggle = () => {
		setIsRegisterModalOpen(!isRegisterModalOpen);
	};

	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const token = Cookies.get("token");
			const userId = Cookies.get("userId");

			let result;

			if (token) {
				result = await axios.get(
					`http://localhost:3001/user/${userId}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);

				if (result.data.user) {
					setUser(result.data.user);
				}
			}
		};

		fetchData();
	}, []);

	return (
		<>
			<Header handleModalToggle={handleModalToggle} user={user}></Header>
			<main className="max-w-[90rem] mx-auto relative">{children}</main>

			{isRegisterModalOpen && (
				<Register handleModalToggle={handleModalToggle}></Register>
			)}
		</>
	);
}
