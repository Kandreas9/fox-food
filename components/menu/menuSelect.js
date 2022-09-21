import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function MenuSelect({
	handleMenuSelectModalToggle,
	user,
	menuDay,
	fetchDish,
}) {
	const router = useRouter();
	const [dishes, setDishes] = useState([]);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		async function fetchDishes() {
			const token = Cookies.get("token");

			if (token) {
				const result = await axios.get(`http://localhost:3001/dish`, {
					headers: { Authorization: `Bearer ${token}` },
				});

				if (result.data.dishes) {
					setDishes(result.data.dishes);
				}
			}
		}

		fetchDishes();

		setMounted(true);

		return () => setMounted(false);
	}, []);

	const handleSelectClick = async (dish) => {
		try {
			const userId = Cookies.get("userId");
			const token = Cookies.get("token");

			user.menu[menuDay].dish = dish._id;

			const result = await axios.patch(
				`http://localhost:3001/user/${userId}`,
				{
					menu: user.menu,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			fetchDish();
			handleMenuSelectModalToggle();
		} catch (error) {
			console.log(error);
		}
	};

	return mounted
		? createPortal(
				<>
					<div
						className="fixed top-0 w-full h-full bg-black opacity-50"
						onClick={handleMenuSelectModalToggle}
					></div>

					<div className="fixed grid grid-cols-2 gap-4 p-4 text-center -translate-x-1/2 -translate-y-1/2 bg-white border-2 rounded md:grid-cols-3 border-slate-500 top-1/2 left-1/2">
						{dishes &&
							dishes.map((dish, index) => {
								return (
									<section key={dish._id}>
										<img
											className="rounded "
											src={dish.image}
											alt={dish.name}
										/>

										<h2 className="my-2 font-bold">
											{dish.name}
										</h2>

										<button
											onClick={() =>
												handleSelectClick(dish)
											}
											className="px-2 py-1 mt-2 text-white bg-orange-500 rounded"
										>
											Select
										</button>
									</section>
								);
							})}
					</div>
				</>,
				document.querySelector("#menuSelect")
		  )
		: null;
}
