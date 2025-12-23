import React from 'react';

export const FolderSVG = ({ title, color, textColor = '#F9FDEC', className, tabPosition = 'left' }) => {
	// Базовий шлях для папки з язичком зліва
	const pathLeft = "M621.426 0c16.028 0 29.911 11.12 33.412 26.76l21.09 68.866c4.407 14.389 17.691 24.214 32.74 24.214h558.212c28.37 0 51.36 22.995 51.36 51.36V642H0V171.2c0-28.365 22.995-51.36 51.36-51.36h83.9c16.025 0 29.729-11.183 34.333-26.533 8.038-26.8 16.117-42.72 21.374-66.512C194.434 11.102 208.327 0 224.399 0h397.027Z";

	// Якщо язичок справа, ми віддзеркалюємо SVG за допомогою scaleX(-1)
	const isRight = tabPosition === 'right';
	const transform = isRight ? 'scale(-1, 1)' : undefined;
	// Якщо ми віддзеркалили контейнер, текст теж віддзеркалився.
	// Треба текст "повернути" назад. Але простіше просто змінити координати тексту.

	// Координати тексту залежать від позиції язичка
	// Для лівого: x ~ 25% (центр язичка)
	// Для правого: x ~ 75%
	const textX = isRight ? "68%" : "32%";

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1319 642"
			fill="none"
			className={className}
			preserveAspectRatio="none"
		>
			<path
				fill={color}
				d={pathLeft}
				transform={transform} // Віддзеркалення форми для правого язичка
				style={{ transformOrigin: 'center' }} // Щоб віддзеркалення було від центру
			/>

			{/* Текст */}
			<text
				x={textX}
				y="60"
				dominantBaseline="middle"
				textAnchor="middle"
				fill={textColor}
				className="font-karpaty text-[60px] xl:text-[80px] uppercase select-none pointer-events-none"
			>
				{title}
			</text>
		</svg>
	);
};