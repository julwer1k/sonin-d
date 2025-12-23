import ParallaxTextLine from '@components/Greeting/ParallaxTextLine';

export default function ParallaxBlock({
	lines,
	startIndex,
	totalLines,
	scrollProgress,
	onHoverChange,
	videoActive,
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
					videoActive={videoActive}
				/>
			))}
		</div>
	);
}
