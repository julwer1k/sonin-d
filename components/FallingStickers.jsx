'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function FallingStickers({ images, count = 24 }) {
	const [stickers, setStickers] = useState([]);

	useEffect(() => {
		if (!images?.length) return;

		const generated = Array.from({ length: count }, (_, i) => {
			const src = images[i % images.length];

			return {
				id: i,
				src,
				left: Math.random() * 100,
				delay: Math.random() * 4,        // 0–4 c до первого старта
				duration: 10 + Math.random() * 6, // 10–16 c на полный цикл
				drift: (Math.random() - 0.5) * 40,
			};
		});

		setStickers(generated);
	}, [images, count]);

	if (!stickers.length) return null;

	return (
		<div className="pointer-events-none absolute inset-0 overflow-visible z-[30]">
			{stickers.map((s) => (
				<div
					key={s.id}
					className="absolute will-change-transform"
					style={{
						left: `${s.left}%`,
						top: '-10%',
						opacity: 0,
						transform: 'translate3d(0, -20dvh, 0)',

						// вместо animation: `stickerFall ...`
						animationName: 'stickerFall',
						animationDuration: `${s.duration}s`,
						animationTimingFunction: 'linear',
						animationDelay: `${s.delay}s`,
						animationIterationCount: 'infinite',
						animationFillMode: 'both',

						['--drift']: `${s.drift}px`,
					}}
				>
					<div className="rounded-[8px] overflow-hidden">
						<Image
							src={s.src}
							alt="sticker"
							width={52}
							height={52}
							className="w-full h-full object-cover
				        xs:w-[clamp(28px,8.75vw,32px)]
				        s:w-[clamp(32px,8.21vw,52px)]
				        xs:h-[clamp(28px,8.75vw,32px)]
				        s:h-[clamp(32px,8.21vw,52px)]"
						/>
					</div>
				</div>
			))}

			<style jsx>{`
				@keyframes stickerFall {
					0% {
						transform: translate3d(0, -20dvh, 0);
						opacity: 0;
					}
					15% {
						opacity: 1;
					}
					80% {
						transform: translate3d(var(--drift), 90dvh, 0);
						opacity: 1;
					}
					100% {
						transform: translate3d(var(--drift), 100dvh, 0) scale(0.2);
						opacity: 0;
					}
				}
			`}</style>
		</div>
	);
}
