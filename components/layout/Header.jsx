import React from 'react';

const topItems = [
	{
		id: 0,
		label: 'kapriznaya.design'
	},
	{
		id: 1,
		label: '26.11.2025'
	}
]

export const Header = () => {
	return (
		<header
			className="
				xs:py-[clamp(30px,9.38vw,38px)]
				s:py-[clamp(38px,9.74vw,60px)]"
		>
			<div className="flex items-center m-0">

				{/* Навигация */}
				<nav className="block w-full">
					<ul
						className="
		          flex justify-between"
					>
						{topItems.map(item => (
							<li key={item.id} className="block text-center w-max
		            font-eukraine font-light leading-none text-white opacity-50

								xs:text-[clamp(5px,1.56vw,6px)]
								s:text-[clamp(6px,1.54vw,10px)]">
								{item.label}
							</li>
						))}
					</ul>
				</nav>

			</div>
		</header>);
};
