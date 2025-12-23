import React, { useId } from 'react';
import Image from 'next/image';
import { useMarqueeLoop } from '../src/hooks/useMarqueeLoop';
import clsx from 'clsx'; // Убедитесь, что импортировали clsx

// Добавили className в пропсы
export const TicketBadge = ({ popImage, bgColor, text }) => {
	const pathId = useId();

	// Константи геометрії
	const PATH_SIZE = 232;
	const INNER_SIZE = 168;
	const CORNER_RADIUS = 22;
	const PATH_OFFSET = 19;
	const PERIMETER = 740;

	const { measureRef, unitText, finalText, duration, isReady, unitWidth } = useMarqueeLoop(
		text,
		PERIMETER,
		"font-eukraine font-bold text-[16px] uppercase tracking-[0.15em]"
	);

	return (
		// ВАЖНО: Добавляем ${className} в конец строки классов.
		// Теперь внешние стили (absolute, top, left) применятся к этому диву.
		<div className={clsx(
			"group relative transition-transform duration-500 hover:scale-105 pointer-events-auto",
		)}>

			{/* 1. КОНТЕЙНЕР БЕЙДЖА (Скло) */}
			<div
				className="relative flex items-center justify-center bg-white/30 backdrop-blur-md shadow-sm"
				style={{ width: PATH_SIZE, height: PATH_SIZE, borderRadius: CORNER_RADIUS }}
			>
				{/* ... (внутренности без изменений: measureRef, svg, content) ... */}

				<div
					ref={measureRef}
					className="absolute opacity-0 pointer-events-none font-eukraine text-[16px] font-bold uppercase tracking-[0.15em] whitespace-nowrap"
					aria-hidden="true"
				>
					{unitText}
				</div>

				<div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
					<svg viewBox={`0 0 ${PATH_SIZE} ${PATH_SIZE}`} className="w-full h-full overflow-visible">
						<path
							id={pathId}
							d={`
                M ${PATH_OFFSET + CORNER_RADIUS},${PATH_OFFSET} 
                H ${PATH_SIZE - PATH_OFFSET - CORNER_RADIUS} 
                A ${CORNER_RADIUS},${CORNER_RADIUS} 0 0 1 ${PATH_SIZE - PATH_OFFSET},${PATH_OFFSET + CORNER_RADIUS} 
                V ${PATH_SIZE - PATH_OFFSET - CORNER_RADIUS} 
                A ${CORNER_RADIUS},${CORNER_RADIUS} 0 0 1 ${PATH_SIZE - PATH_OFFSET - CORNER_RADIUS},${PATH_SIZE - PATH_OFFSET} 
                H ${PATH_OFFSET + CORNER_RADIUS} 
                A ${CORNER_RADIUS},${CORNER_RADIUS} 0 0 1 ${PATH_OFFSET},${PATH_SIZE - PATH_OFFSET - CORNER_RADIUS} 
                V ${PATH_OFFSET + CORNER_RADIUS} 
                A ${CORNER_RADIUS},${CORNER_RADIUS} 0 0 1 ${PATH_OFFSET + CORNER_RADIUS},${PATH_OFFSET} 
                Z
              `}
							fill="none"
						/>

						<text
							className="font-eukraine text-[16px] font-bold fill-black uppercase tracking-[0.15em]"
							dominantBaseline="middle"
						>
							<textPath href={`#${pathId}`} startOffset="0" lengthAdjust="spacing">
								{finalText}
								{isReady && (
									<animate
										attributeName="startOffset"
										from="0"
										to={`-${unitWidth}`}
										dur={`${duration}s`}
										repeatCount="indefinite"
										calcMode="linear"
									/>
								)}
							</textPath>
						</text>
					</svg>
				</div>

				<div
					className="relative flex items-center justify-center shadow-inner z-10 overflow-visible"
					style={{
						width: INNER_SIZE,
						height: INNER_SIZE,
						borderRadius: CORNER_RADIUS,
						backgroundColor: bgColor
					}}
				>
					<div className="relative w-[90%] h-[90%] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-125 group-hover:-rotate-12">
						<Image
							src={popImage}
							alt="Badge Icon"
							fill
							className="object-contain drop-shadow-lg"
							sizes={`${INNER_SIZE}px`}
							priority
						/>
					</div>
				</div>
			</div>
		</div>
	);
};