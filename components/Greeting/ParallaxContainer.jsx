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
	videoActive,
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
				`flex flex-col relative w-max s:ml-[0px]`,
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
						videoActive={videoActive}
					/>
				);
			})}
		</motion.section>
	);
}
