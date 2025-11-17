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
			className="flex flex-col
				xs:max-w-[clamp(290px,90.63vw,354px)]
				s:max-w-[clamp(354px,90.77vw,580px)]

				xs:gap-[clamp(16px,5vw,22px)]
				s:gap-[clamp(22px,5.64vw,32px)]"
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
