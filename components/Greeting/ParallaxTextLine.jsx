// noinspection JSValidateTypes
'use client';

import classNames from 'classnames';
import { motion, useTransform } from 'framer-motion';
import { formatInlineNumbers } from '../../src/utils/formatInlineNumbers';
import ParallaxButton from './ParallaxButton';

export default function ParallaxTextLine({
	textSegments = [],
	parentProgress,
	globalIndex = 0,
	totalLines = 1,
	onHoverChange,
	videoActive,
}) {
	const lineStart = globalIndex / totalLines;
	const lineEnd = (globalIndex + 1) / totalLines;

	// 1) Прогресс строки: 0..100 (число)
	const lineProgressPct = useTransform(parentProgress, [lineStart, lineEnd], [0, 100]);
	// 2) ТА ЖЕ величина, но как СТРОКА с единицами ('%'), чтобы calc() не ломался
	const lineProgressPctStr = useTransform(lineProgressPct, (v) => `${v}%`);

	const animatableSegments = textSegments.filter((s) => s.type === 'text' && !s.prefilled);
	const segCount = Math.max(animatableSegments.length, 1);

	const textCls = `font-manrope font-extrabold align-middle uppercase
		xs:h-[clamp(22px,6.88vw,28px)]
		s:h-[clamp(28px,7.18vw,46px)]
		
		xs:leading-[clamp(22px,6.88vw,28px)]
		s:leading-[clamp(28px,7.18vw,46px)]
	
		xs:text-[clamp(20px,6.25vw,24px)]
		s:text-[clamp(24px,6.15vw,40px)]`;

	let animIndex = -1;

	return (
		<motion.div
			className="bp:justify-center flex flex-wrap items-center
				xs:gap-y-[clamp(2px,0.63vw,2px)]
				s:gap-y-[clamp(2px,0.51vw,3px)]
				xs:gap-x-[clamp(12px,3.75vw,15px)]
				s:gap-x-[clamp(15px,3.85vw,24px)]
				"
			// ВАЖНО: MotionValue<string> с единицами — '%'
			style={
				/** @type {any} */ ({
					'--progress': lineProgressPctStr,
				})
			}
		>
			{textSegments.map((seg, i) => {
				if (seg.type === 'button') {
					return (
						<ParallaxButton
							key={i}
							label={seg.content}
							onHoverChange={(hovering) => onHoverChange?.(hovering ? seg.video : null)}
							videoActive={videoActive}
						/>
					);
				}

				if (seg.prefilled) {
					return (
						<span
							key={i}
							className={classNames(textCls, 'text-white', videoActive ? 'opacity-[0.1]' : 'opacity-100')}
						>
              {formatInlineNumbers(seg.content, 'uk-UA')}
            </span>
					);
				}

				// Без хуков: только расчёт чисел и CSS vars
				animIndex += 1;
				const segStartPct = (animIndex / segCount) * 100;
				const segEndPct = ((animIndex + 1) / segCount) * 100;

				return (
					<span
						key={i}
						className={classNames(
							textCls,
							'text-transparent bg-clip-text',
							videoActive ? 'opacity-[0.1]' : 'opacity-100',
						)}
						style={
							/** @type {any} */ ({
								// даём ЕДИНИЦЫ — проценты
								'--start': `${segStartPct}%`,
								'--end': `${segEndPct}%`,
								// итоговая заливка в процентах (тоже с %), полностью на стороне CSS
								'--fill':
									'clamp(0%, calc(((var(--progress) - var(--start)) / (var(--end) - var(--start))) * 100%), 100%)',
								backgroundImage:
									'linear-gradient(90deg, #fff var(--fill), rgba(255,255,255,0.2) var(--fill))',
							})
						}
					>
            {formatInlineNumbers(seg.content, 'uk-UA')}
          </span>
				);
			})}
		</motion.div>
	);
}
