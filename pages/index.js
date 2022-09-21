import Layout from "../components/layout";

export default function Home() {
	return (
		<Layout>
			<section
				aria-labelledby="Fix Your Diet"
				className="flex flex-col items-center justify-center gap-10 py-20 text-center md:flex-row md:justify-between md:gap-24 md:mx-28 "
			>
				<div>
					<h1
						className="mb-2 text-3xl font-bold text-orange-500"
						id="Fix Your Diet"
					>
						Fix Your Diet
					</h1>
					<p className="text-gray-500">
						Find, rate, and enjoy a healthy diet
					</p>
				</div>

				<img
					className="h-44 md:h-72"
					src="/hero-img.svg"
					alt="food truch hero image"
				/>
			</section>

			<section
				className="py-20 text-center"
				aria-labelledby="Based on Your Preference"
			>
				<h2
					className="mb-2 text-2xl text-orange-500"
					id="Based on Your Preference"
				>
					Based on Your Preference
				</h2>
				<p className="mb-4 text-gray-500">Like, dislike, favorite </p>

				<div className="flex justify-center gap-2">
					<div className="p-2 border-2 border-gray-400 rounded-full shadow">
						<img className="h-7" src="/re-icon.svg" alt="re icon" />
					</div>
					<div className="p-2 border-2 border-gray-400 rounded-full shadow">
						<img className="h-7" src="/x-icon.svg" alt="re icon" />
					</div>
					<div className="p-2 border-2 border-gray-400 rounded-full shadow">
						<img className="h-7" src="/heart.svg" alt="re icon" />
					</div>
					<div className="p-2 border-2 border-gray-400 rounded-full shadow">
						<img className="h-7" src="/star.svg" alt="re icon" />
					</div>
				</div>
			</section>
		</Layout>
	);
}
