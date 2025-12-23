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

	const textCls = `font-eukraine font-bold align-middle uppercase text-[#2F2F2F]
		xl:h-[clamp(21px,1.46vw,28px)]
		xl:leading-[clamp(21px,1.46vw,28px)]
	
		xl:text-[clamp(25.5px,1.77vw,34px)]`;

	let animIndex = -1;

	return (
		<motion.div
			className="bp:justify-center flex flex-wrap items-center
				xl:gap-[clamp(10.5px,0.73vw,14px)]"
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
							classnames={seg.classnames}
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
							className={classNames(textCls, 'text-[#2F2F2F]', seg.classnames, videoActive ? 'opacity-[0.1]' : 'opacity-100')}
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
							'bg-clip-text',
							seg.classnames,
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
