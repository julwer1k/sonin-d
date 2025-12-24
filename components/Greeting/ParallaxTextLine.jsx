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
	activeMedia, // Ми приймаємо саме activeMedia
}) {
	const lineStart = globalIndex / totalLines;
	const lineEnd = (globalIndex + 1) / totalLines;

	const lineProgressPct = useTransform(parentProgress, [lineStart, lineEnd], [0, 100]);
	const lineProgressPctStr = useTransform(lineProgressPct, (v) => `${v}%`);

	const animatableSegments = textSegments.filter((s) => s.type === 'text' && !s.prefilled);
	const segCount = Math.max(animatableSegments.length, 1);

	// 1. ДОДАНО: transition-opacity duration-300 для плавності зникнення
	const textCls = `font-eukraine font-bold align-middle uppercase text-[#2F2F2F]
   xl:h-[clamp(21px,1.46vw,28px)]
   xl:leading-[clamp(21px,1.46vw,28px)]
   xl:text-[clamp(25.5px,1.77vw,34px)]
   transition-opacity duration-300 ease-in-out`;

	let animIndex = -1;

	// Визначаємо, чи є взагалі активне медіа (щоб сховати текст)
	const isMediaActive = !!activeMedia;

	return (
		<motion.div
			className="bp:justify-center flex flex-wrap items-center xl:gap-[clamp(10.5px,0.73vw,14px)]"
			style={{ '--progress': lineProgressPctStr }}
		>
			{textSegments.map((seg, i) => {
				if (seg.type === 'button') {
					// Визначаємо, чи активна САМЕ ЦЯ кнопка
					const isThisBtnActive = activeMedia?.src === seg.media?.src;

					return (
						<ParallaxButton
							key={i}
							classnames={seg.classnames}
							label={seg.content}
							onHoverChange={(hovering) => onHoverChange?.(hovering ? seg.media : null)}
							// 2. ВИПРАВЛЕНО: Передаємо isActive замість videoActive
							isActive={isThisBtnActive}
						/>
					);
				}

				if (seg.prefilled) {
					return (
						<span
							key={i}
							// 3. Логіка прозорості: якщо активне БУДЬ-ЯКЕ медіа -> текст стає прозорим
							className={classNames(
								textCls,
								'text-[#2F2F2F]',
								seg.classnames,
								isMediaActive ? 'opacity-20' : 'opacity-100'
							)}
						>
              {formatInlineNumbers(seg.content, 'uk-UA')}
            </span>
					);
				}

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
							// 3. Логіка прозорості для анімованого тексту
							isMediaActive ? 'opacity-20' : 'opacity-100',
						)}
						style={{
							'--start': `${segStartPct}%`,
							'--end': `${segEndPct}%`,
							'--fill': 'clamp(0%, calc(((var(--progress) - var(--start)) / (var(--end) - var(--start))) * 100%), 100%)',
							backgroundImage: 'linear-gradient(90deg, #fff var(--fill), rgba(255,255,255,0.2) var(--fill))',
						}}
					>
            {formatInlineNumbers(seg.content, 'uk-UA')}
          </span>
				);
			})}
		</motion.div>
	);
}