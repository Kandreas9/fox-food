import MenuItem from "./menuItem";

export default function MenuList({ user }) {
	const menuKeys = Object.keys(user.menu);

	return (
		<div className="grid items-center grid-cols-2 gap-4 mx-4 md:grid-cols-3 xl:grid-cols-4">
			{menuKeys.map((menuDay, index) => {
				return (
					<MenuItem
						key={index}
						user={user}
						menuDay={user.menu[menuDay]}
					></MenuItem>
				);
			})}
		</div>
	);
}
