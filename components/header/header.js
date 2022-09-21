import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Header({ handleModalToggle, user }) {
	const router = useRouter();

	const handleLogout = async () => {
		const token = Cookies.get("token");
		await axios.post(
			"http://localhost:3001/user/logout",
			{},
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);

		Cookies.remove("token", { path: "" });
		Cookies.remove("userId", { path: "" });

		router.reload(window.location.pathname);
	};

	let menu;

	if (user) {
		menu = (
			<button
				onClick={handleLogout}
				className="p-2 text-white bg-orange-500 rounded"
			>
				Logout
			</button>
		);
	} else {
		menu = (
			<button
				onClick={handleModalToggle}
				className="p-2 text-white bg-orange-500 rounded"
			>
				Sign In
			</button>
		);
	}

	return (
		<header className="max-w-[90rem] mx-auto flex items-center justify-between py-4 px-2">
			<div className="flex items-center">
				<Link href="/">
					<a>
						<img
							className="h-12 mr-2 md:mr-10"
							src="/logo.svg"
							alt="fox logo"
						/>
					</a>
				</Link>

				<nav className="flex gap-2">
					<Link href="/preference">
						<a>Preference</a>
					</Link>
					<Link href="/menu">
						<a>Menu</a>
					</Link>
				</nav>
			</div>

			<div className="flex items-center gap-4">
				{menu}

				<Link href="/settings">
					<a>
						<img
							className="h-6 px-3 border-l-2"
							src="/settings.svg"
							alt="settings cog icon"
						/>
					</a>
				</Link>
			</div>
		</header>
	);
}
