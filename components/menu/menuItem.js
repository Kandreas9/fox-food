import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import MenuSelect from "./menuSelect";

export default function MenuItem({ user, menuDay, menuItem }) {
	const [isMenuSelectModalOpen, setIsMenuSelectModalOpen] = useState(false);
	const [dish, setDish] = useState(null);

	const handleMenuSelectModalToggle = () => {
		setIsMenuSelectModalOpen(!isMenuSelectModalOpen);
	};

	async function fetchDish() {
		const token = Cookies.get("token");

		if (token && menuItem.dish) {
			const result = await axios.get(
				`http://localhost:3001/dish/${menuItem.dish}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (result.data.dish) {
				setDish(result.data.dish);
			}
		}
	}

	useEffect(() => {
		fetchDish();
	}, []);

	return (
		<section className="w-40 p-2 text-center bg-gray-300 rounded justify-self-center">
			{dish ? (
				<img
					className="h-20 mx-auto rounded"
					src={dish.image}
					alt={dish.name}
				></img>
			) : (
				<img
					className="h-20 mx-auto"
					src="./no-dish.svg"
					alt="an image of toast"
				/>
			)}

			<h2 className="my-2 font-bold">{menuItem.title}</h2>

			{dish ? (
				<p className="text-gray-500">{dish.name}</p>
			) : (
				<p className="text-gray-500">No Dish</p>
			)}

			{dish ? (
				<button className="p-2 mt-2 text-white bg-orange-500 rounded">
					See More
				</button>
			) : (
				<button
					onClick={handleMenuSelectModalToggle}
					className="p-2 mt-2 text-white bg-orange-500 rounded"
				>
					Select
				</button>
			)}

			{isMenuSelectModalOpen && (
				<MenuSelect
					menuDay={menuDay}
					user={user}
					handleMenuSelectModalToggle={handleMenuSelectModalToggle}
					fetchDish={fetchDish}
				></MenuSelect>
			)}
		</section>
	);
}
