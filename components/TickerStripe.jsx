'use client';

import React, { useEffect, useMemo, useRef, useState, useId } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

/**
 * Разбивает текст на WORD • WORD • ... •
 */
function RowContent({ text, dotColor, textOpacity }) {
	const words = text.trim().split(/\s+/);
	return (
		<div className="inline-flex items-center">
			{words.map((w, i) => (
				<div
					key={`w-${i}`}
					className="inline-flex items-center"
				>
					<span className="uppercase">{w}</span>
					<span
						className={classNames(
							'rounded-full flex-shrink-0',
							'xs:h-[clamp(5px,1.56vw,6px)] s:h-[clamp(6px,1.54vw,10px)]',
							'xs:w-[clamp(5px,1.56vw,6px)] s:w-[clamp(6px,1.54vw,10px)]',
							'xs:mx-[clamp(3px,0.94vw,4px)] s:mx-[clamp(4px,1.03vw,6px)]',
						)}
						style={{ backgroundColor: dotColor, opacity: textOpacity }}
					/>
				</div>
			))}
		</div>
	);
}

/**
 * Бесшовная лента:
 * — измеряем ширину контента/вьюпорта
 * — рендерим нужное кол-во копий
 * — анимируем ровно на ширину одного блока (без var() в keyframes)
 */
export default function TickerStripe({
	text,
	colorFill,
	colorText,
	opacityText = 0.5,
	angle = 0,
	blendImage,          // например "/background-blend.png"
	speed = 80,          // пикселей в секунду
	className = '',
	absolute = false,
	priorityImage = false,
}) {
	const viewportRef = useRef(null);
	const measureRef = useRef(null);
	const [contentWidth, setContentWidth] = useState(0);
	const [viewportWidth, setViewportWidth] = useState(0);

	// уникальное имя для анимации этой инстанции
	const uid = useId().replace(/:/g, '-'); // React может добавить ":" — убираем для CSS
	const keyframesName = `ticker-${uid}`;

	// Подписка на ресайзы
	useEffect(() => {
		const el = viewportRef.current;
		const measureEl = measureRef.current;
		if (!el || !measureEl) return;

		const update = () => {
			setViewportWidth(el.clientWidth);
			setContentWidth(measureEl.scrollWidth);
		};

		update();

		const ro = new ResizeObserver(update);
		ro.observe(el);
		ro.observe(measureEl);
		return () => ro.disconnect();
	}, []);

	// Копии для покрытия ширины
	const copies = useMemo(() => {
		if (!contentWidth || !viewportWidth) return 2;
		return Math.max(2, Math.ceil(viewportWidth / contentWidth) + 2);
	}, [contentWidth, viewportWidth]);

	// Длительность цикла (движение на ширину блока)
	const durationSec = useMemo(() => {
		if (!contentWidth || !speed) return 12;
		return contentWidth / speed;
	}, [contentWidth, speed]);

	// Контент строки
	const rowEl = useMemo(
		() => <RowContent
			text={text}
			dotColor={colorText}
			textOpacity={opacityText}
		/>,
		[text, colorText, opacityText],
	);

	return (
		<div
			ref={viewportRef}
			className={classNames(
				absolute ? 'absolute inset-x-0 top-0' : 'relative',
				// высота + маленький оверран по ширине, чтобы при rotate не оголялся край
				`w-[108vw] sm:w-[120%] -ml-[4vw] flex items-center origin-center select-none overflow-hidden    
						xs:h-[clamp(22px,6.88vw,26px)] 
						s:h-[clamp(26px,6.67vw,44px)] `,
				className,
			)}
			style={{
				backgroundColor: colorFill,
				transform: `rotate(${angle}deg)`,
			}}
		>
			{blendImage && (
				<div className="absolute inset-0 z-[0] mix-blend-soft-light pointer-events-none">
					<Image
						src={blendImage}
						alt=""
						fill
						priority={priorityImage}
						className="object-cover opacity-60"
					/>
				</div>
			)}

			{/* Трек */}
			<div
				className={classNames(
					'relative z-[1] whitespace-nowrap will-change-transform',
					'antialiased font-druk font-medium leading-[1] items-center',
					'xs:text-[clamp(14px,4.38vw,17px)] s:text-[clamp(17px,4.36vw,28px)]',
					'flex',
				)}
				style={{
					color: colorText,
					opacity: opacityText,
					animation: contentWidth
						? `${keyframesName} ${durationSec}s linear infinite`
						: undefined,
				}}
			>
				{/* «Эталон» для измерения */}
				<div
					ref={measureRef}
					className="inline-flex items-center min-w-max"
					aria-hidden={copies > 1 ? 'true' : undefined}
					style={{
						position: contentWidth ? 'absolute' : 'static',
						left: -99999,
						visibility: 'hidden',
					}}
				>
					{rowEl}
				</div>

				{/* Видимые копии */}
				{Array.from({ length: copies }).map((_, i) => (
					<div
						key={`copy-${i}`}
						className="inline-flex items-center min-w-max"
						aria-hidden={i > 0 ? 'true' : undefined}
					>
						{rowEl}
					</div>
				))}
			</div>

			{/* Локальные keyframes c «впаянной» шириной — без var() */}
			{contentWidth > 0 && (
				<style jsx>{`
					@keyframes ${keyframesName} {
						from {
							transform: translate3d(0, 0, 0);
						}
						to {
							transform: translate3d(-${contentWidth}px, 0, 0);
						}
					}

					@media (prefers-reduced-motion: reduce) {
						:global(div[style*="${keyframesName}"]) {
							animation: none !important;
							transform: none !important;
						}
					}
				`}</style>
			)}
		</div>
	);
}
