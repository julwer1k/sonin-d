import React from 'react';
import clsx from 'clsx';

export const RunningLine = ({
	text,
	count = 4, // Сколько раз повторять фразу в одном буфере
	className, // Стили для внешнего контейнера (фон, z-index, position)
	textClassName // Стили для текста (шрифт, цвет, отступы)
}) => {
	// Создаем массив повторяющихся фраз
	const content = Array(count).fill(text);

	return (
		// Внешний контейнер
		<div className={clsx("w-full h-full overflow-hidden flex items-center", className)}>

			{/* Движущаяся лента (-50%) */}
			<div className="flex w-max animate-marquee-infinite will-change-transform">

				{/* ЧАСТЬ 1: Оригинальный набор */}
				<div className="flex items-center shrink-0">
					{content.map((item, i) => (
						<span
							key={`orig-${i}`}
							className={textClassName}
						>
              {item}
            </span>
					))}
				</div>

				{/* ЧАСТЬ 2: Дубликат (для бесшовности) */}
				<div aria-hidden="true" className="flex items-center shrink-0">
					{content.map((item, i) => (
						<span
							key={`copy-${i}`}
							className={textClassName}
						>
              {item}
            </span>
					))}
				</div>

			</div>
		</div>
	);
};