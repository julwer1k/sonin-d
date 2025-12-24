import ParallaxTextLine from '@components/Greeting/ParallaxTextLine';

export default function ParallaxBlock({
	lines,
	startIndex,
	totalLines,
	scrollProgress,
	onHoverChange,
	activeMedia,
}) {
	return (
		<div
			className="flex flex-col last:ml-[-52px]"
		>
			{lines.map((line, i) => (
				<ParallaxTextLine
					key={i}
					textSegments={line.segments}
					globalIndex={startIndex + i}
					totalLines={totalLines}
					parentProgress={scrollProgress}
					onHoverChange={onHoverChange}
					activeMedia={activeMedia}
				/>
			))}
		</div>
	);
}
