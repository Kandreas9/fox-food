import axios from "axios";
import Layout from "../../components/layout";
import getCookieServer from "../../utils/getCookieServer";

export default function Home({ user }) {
	console.log(user);
	return (
		<Layout>
			<section aria-labelledby="Menu" className="py-10 text-center">
				<h1
					id="Menu"
					className="mb-2 text-3xl font-bold text-orange-500"
				>
					Menu
				</h1>
				<p className="text-gray-500">
					Pick the foods you have liked to be set for your menu
				</p>
			</section>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const token = getCookieServer(context, "token");
	const userId = getCookieServer(context, "userId");

	let user;

	if (token) {
		const result = await axios.get(`http://localhost:3001/user/${userId}`, {
			headers: { Authorization: `Bearer ${token}` },
		});

		if (result.data.user) {
			user = result.data.user;
		}
	}

	// redirect
	if (!user) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			user,
		},
	};
}
