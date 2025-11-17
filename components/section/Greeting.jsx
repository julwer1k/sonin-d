'use client';

import ParallaxContainer from '@components/Greeting/ParallaxContainer';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

export const Greeting = () => {
	const [videoActive, setVideoActive] = useState(false);
	const blocks = useMemo(() => [
		{
			lines: [
				{
					segments: [
						{ type: 'text', content: 'HAPPY BIRTHDAY — СЕГОДНЯ', prefilled: true, visibleOn: ['mobile', 'desktop'] },
						{ type: 'text', content: 'ТВОЙ ДЕНЬ, ТЫ', visibleOn: ['mobile', 'desktop'] },
						{ type: 'button', content: 'СИЯЕШЬ', video: '/greeting/video-1-small.mp4', visibleOn: ['mobile', 'desktop'] },
						{ type: 'text', content: 'ЯРЧЕ, ЧЕМ ГОРОД НОЧЬЮ. ', visibleOn: ['mobile', 'desktop'] },
					],
				},
				{
					segments: [
						{ type: 'text', content: 'С тобой любой момент —', visibleOn: ['mobile', 'desktop'] },
						{ type: 'text', content: 'УЖЕ', visibleOn: ['mobile', 'desktop'] },

						{ type: 'button', content: 'ЛОВСТОРИ', video: '/greeting/video-2-small.mp4', visibleOn: ['mobile', 'desktop'] },
					],
				},
				{
					segments: [
						{ type: 'text', content: 'и даже Холод', visibleOn: ['mobile', 'desktop'] },
						{ type: 'button', content: 'ТАЕТ', video: '/greeting/video-3-small.mp4', visibleOn: ['mobile', 'desktop'] },
						{ type: 'text', content: 'от твоей истории.', visibleOn: ['mobile', 'desktop'] },
					],
				},
				{
					segments: [
						{ type: 'text', content: 'Твоё настроение — мой', visibleOn: ['mobile', 'desktop'] },
						{ type: 'text', content: 'лучший', visibleOn: ['mobile', 'desktop'] },
						{ type: 'button', content: 'ПЛЕЙЛИСТ', video: '/greeting/video-4-small.mp4', visibleOn: ['mobile', 'desktop'] },
					],
				},
				{
					segments: [
						{ type: 'text', content: 'мы с тобой один', visibleOn: ['mobile', 'desktop'] },
						{ type: 'button', content: 'САЛАТМИКС', video: '/greeting/video-5-small.mp4', visibleOn: ['mobile', 'desktop'] },
					],
				},
				{
					segments: [
						{ type: 'text', content: 'С тобой я глупышка,', visibleOn: ['mobile', 'desktop'] },
						{ type: 'text', content: 'но шарю за', visibleOn: ['mobile', 'desktop'] },
						{ type: 'button', content: 'TEMU', video: '/greeting/video-6-small.mp4', visibleOn: ['mobile', 'desktop'] },
					],
				},
				{
					segments: [
						{ type: 'text', content: 'Пиздюкать просто ВЕДЬ', visibleOn: ['mobile', 'desktop'] },
						{ type: 'text', content: 'МЫ в  одной', visibleOn: ['mobile', 'desktop'] },
						{ type: 'button', content: 'ТЕМЕ', video: '/greeting/video-7-small.mp4', visibleOn: ['mobile', 'desktop'] },
					],
				},
				{
					segments: [
						{ type: 'text', content: 'Твой смех звучит, ', visibleOn: ['mobile', 'desktop'] },
						{ type: 'text', content: 'как любимый тренд,', visibleOn: ['mobile', 'desktop'] },
					],
				},
				{
					segments: [
						{ type: 'text', content: 'в нашем фильме ты — ', visibleOn: ['mobile', 'desktop'] },
						{ type: 'text', content: 'мой', visibleOn: ['mobile', 'desktop'] },
						{ type: 'button', content: 'HAPPY END', video: '/greeting/video-8-small.mp4', visibleOn: ['mobile', 'desktop'] },
					],
				},
				{
					segments: [
						{ type: 'text', content: 'С днюхой, Даша —', visibleOn: ['mobile', 'desktop'] },
						{ type: 'text', content: 'мой КАПРИЗНЫЙ', visibleOn: ['mobile', 'desktop'] },
						{ type: 'button', content: 'СВЕТ', video: '/greeting/video-9-small.mp4', visibleOn: ['mobile', 'desktop'] },
					],
				},
			],
		},
	], []);

	const videoSources = useMemo(
		() =>
			blocks[0].lines
				.flatMap((line) => line.segments)
				.filter((seg) => seg.type === 'button' && seg.video)
				.map((seg) => seg.video),
		[blocks]
	);

	return (
		<div className="relative">
			<div aria-hidden="true">
				{videoSources.map((src) => (
					<video
						key={src}
						src={src}
						preload="auto"
						muted
						playsInline
						className="fixed w-0 h-0 opacity-0 pointer-events-none"
					/>
				))}
			</div>

			<Image
				src="/words/background.png"
				alt="background image"
				fill
				priority
				className="absolute inset-0 z-[0] object-cover opacity-40 mix-blend-screen pointer-events-none"
			/>

			<Image
				src="/words/paper-top.png"
				alt="Paper Top"
				width={640}
				height={884}
				priority
				className="absolute xs:top-[-10px] sm:top-0 sm:inset-0 z-[0] object-cover pointer-events-none"
			/>

			<section
				className="relative z-[1] w-full text-white overflow-hidden
					xs:mt-[clamp(55px,17.19vw,70px)]
					s:mt-[clamp(70px,17.95vw,112px)]
					xs:px-[clamp(15px,4.69vw,18px)]
					s:px-[clamp(18px,4.62vw,30px)]
					xs:pb-[clamp(65px,20.31vw,80px)]
					s:pb-[clamp(80px,20.51vw,130px)]"
			>

				<motion.video
					src={videoActive || null}
					className="absolute inset-0 z-[0] w-full h-full object-cover pointer-events-none"
					autoPlay
					muted={!videoActive}
					loop
					playsInline
					initial={false}
					animate={{ opacity: videoActive ? 1.0 : 0 }}
					transition={{ duration: 0.25 }}
				/>

				<motion.div
					className="relative z-[2]"
				>
					<ParallaxContainer
						blocks={blocks}
						onHoverChange={setVideoActive}
						videoActive={videoActive}
					/>
				</motion.div>
			</section>

			<Image
				src="/words/paper-bottom.png"
				alt="Paper bottom"
				width={640}
				height={884}
				priority
				className="absolute z-[0] bottom-0 object-cover pointer-events-none"
			/>
		</div>
	);
};