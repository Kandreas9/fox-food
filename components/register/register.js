import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { useRouter } from "next/router";

export default function Register({ handleModalToggle }) {
	const router = useRouter();
	const [mounted, setMounted] = useState(false);
	const [modal, setModal] = useState("Register");

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleModalChange = (state) => {
		setModal(state);
	};

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		try {
			if (modal === "Register") {
				let result = await axios.post(`http://localhost:3001/user`, {
					email,
					password,
				});

				document.cookie = `token=${result.data.token}`;
				document.cookie = `userId=${result.data.user._id}`;

				router.reload(window.location.pathname);
			} else if (modal === "Login") {
				console.log("login");
				let result = await axios.post(
					`http://localhost:3001/user/login`,
					{
						email,
						password,
					}
				);

				document.cookie = `token=${result.data.token}`;
				document.cookie = `userId=${result.data.user._id}`;

				router.reload(window.location.pathname);
			}
			console.log("login 2");
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		setMounted(true);

		return () => setMounted(false);
	}, []);

	return mounted
		? createPortal(
				<>
					<div
						className="fixed top-0 w-full h-full bg-black opacity-50"
						onClick={handleModalToggle}
					></div>

					<form
						onSubmit={handleFormSubmit}
						className="fixed p-4 text-center -translate-x-1/2 -translate-y-1/2 bg-white border-2 rounded border-slate-500 top-1/2 left-1/2"
					>
						<h1 className="mb-5 text-2xl font-bold text-orange-500">
							{modal}
						</h1>

						<label>
							Email:
							<input
								required
								className="p-2 mb-4 bg-gray-300 rounded"
								type="email"
								value={email}
								onChange={handleEmailChange}
							/>
						</label>

						<label>
							Password:
							<input
								required
								className="p-2 mb-4 bg-gray-300 rounded"
								type="password"
								value={password}
								onChange={handlePasswordChange}
							/>
						</label>

						{modal == "Register" ? (
							<button
								type="button"
								onClick={() => {
									handleModalChange("Login");
								}}
								className="mb-4 text-blue-500"
							>
								Already have an acount?
							</button>
						) : (
							<button
								type="button"
								onClick={() => {
									handleModalChange("Register");
								}}
								className="mb-4 text-blue-500"
							>
								Dont have an account yet?
							</button>
						)}

						<button className="p-2 text-white bg-orange-500 rounded">
							{modal}
						</button>
					</form>
				</>,
				document.querySelector("#register")
		  )
		: null;
}
