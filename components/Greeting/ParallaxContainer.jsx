// noinspection JSValidateTypes
'use client';

import React from 'react';
import classNames from 'classnames';
import { motion, useScroll } from 'framer-motion';
import { filterBlocksByMode, useIsMobile } from '../../src/hooks/useIsMobile';
import ParallaxBlock from './ParallaxBlock';

export default function ParallaxContainer({
	blocks = [],
	className = '',
	onHoverChange,
	activeMedia,
}) {
	const ref = React.useRef(null);

	const isMobile = useIsMobile(900);
	const mode = isMobile === null ? 'desktop' : (isMobile ? 'mobile' : 'desktop');

	const filteredBlocks = React.useMemo(
		() => filterBlocksByMode(blocks, mode),
		[blocks, mode],
	);

	// викликаємо завжди, без умов
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start 85%', 'end 40%'],
	});

	const totalLines = React.useMemo(
		() => filteredBlocks.flatMap(b => b.lines).length,
		[filteredBlocks],
	);

	return (
		<motion.section
			ref={ref}
			className={classNames(
				`relative xl:left-[clamp(216px,15vw,276px)] 2xl:left-[clamp(276px,14.38vw,306px)] flex flex-col w-max 
				xl:mt-[clamp(48px,3.33vw,64px)] xl:gap-[clamp(52.5px,3.65vw,70px)]`,
				className,
			)}
		>
			{filteredBlocks.map((block, blockIndex) => {
				const startIndex = filteredBlocks
					.slice(0, blockIndex)
					.reduce((sum, b) => sum + b.lines.length, 0);

				return (
					<ParallaxBlock
						key={blockIndex}
						lines={block.lines}
						startIndex={startIndex}
						totalLines={totalLines}
						scrollProgress={scrollYProgress}
						onHoverChange={onHoverChange}
						activeMedia={activeMedia}
					/>
				);
			})}
		</motion.section>
	);
}
