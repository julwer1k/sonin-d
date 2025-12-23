'use client';

import ParallaxContainer from '@components/Greeting/ParallaxContainer';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const Greeting = () => {
	const [videoActive, setVideoActive] = useState(null);
	const blocks = useMemo(() => [
		{
			lines: [
				{
					segments: [
						{ type: 'text', content: 'Сьогодні',  prefilled: true, visibleOn: ['mobile', 'desktop'], classnames: 'xl:ml-[clamp(43.5px,3.02vw,58px)]' },
						{ type: 'button', content: 'ТАТА', video: '/greeting/video-1.mp4', visibleOn: ['mobile', 'desktop'], classnames: 'xl:mr-[clamp(165.75px,11.51vw,221px)]' },

						{ type: 'text', content: 'МИ МІЦНО ОБІЙМАЄМО', visibleOn: ['mobile', 'desktop'] },
					],
				},
				{
					segments: [
						{ type: 'text', content: 'І В СЕРЦІ СПРАВЖНЄ', visibleOn: ['mobile', 'desktop'], classnames: 'xl:ml-[clamp(18px,1.25vw,24px)] xl:mr-[clamp(195.75px,13.59vw,261px)]' },
						{ type: 'button', content: 'СВЯТО', video: '/greeting/video-2.mp4', visibleOn: ['mobile', 'desktop'] },
						{ type: 'text', content: 'ВІДЧУВАЄМО', visibleOn: ['mobile', 'desktop'] },
					],
				},
				{
					segments: [
						{ type: 'text', content: 'ТИ ВМІЄШ', visibleOn: ['mobile', 'desktop'] },
						{ type: 'button', content: 'НАСТРІЙ', video: '/greeting/video-3.mp4', visibleOn: ['mobile', 'desktop'], classnames: 'xl:mr-[clamp(248.25px,17.24vw,331px)]' },
						{ type: 'text', content: 'НАМ ЗАВЖДИ ПІДНЯТИ', visibleOn: ['mobile', 'desktop'] },
					],
				},
				{
					segments: [
						{ type: 'text', content: 'І СВОЄ ЧОЛОВІЧЕ', visibleOn: ['mobile', 'desktop'], classnames: 'xl:mr-[clamp(225.75px,15.68vw,301px)] xl:ml-[clamp(54px,3.75vw,72px)]' },
						{ type: 'button', content: 'СЛОВО', video: '/greeting/photo-1.jpg', visibleOn: ['mobile', 'desktop'] },
						{ type: 'text', content: 'ТРИМАТИ', visibleOn: ['mobile', 'desktop'] },
					],
				},
			],
		},
		{
			lines: [
				{
					segments: [
						{ type: 'text', content: 'ТИ ДЛЯ НАС ЯК', visibleOn: ['mobile', 'desktop'], classnames: 'xl:ml-[clamp(109.5px,7.6vw,146px)] xl:mr-[clamp(247.5px,17.19vw,330px)]' },
						{ type: 'button', content: 'ПРИКЛАД', video: '/greeting/video-1-small.mp4', visibleOn: ['mobile', 'desktop'] },
						{ type: 'text', content: 'СИЛИ Й ВОЛІ', visibleOn: ['mobile', 'desktop'] },
					],
				},
				{
					segments: [
						{ type: 'text', content: 'І ГОЛОВНИЙ', visibleOn: ['mobile', 'desktop'] },
						{ type: 'button', content: 'ГЕРОЙ', video: '/greeting/video-2-small.mp4', visibleOn: ['mobile', 'desktop'], classnames: 'xl:mr-[clamp(277.5px,19.27vw,370px)]' },

						{ type: 'text', content: 'У НАШІЙ ДОЛІ', visibleOn: ['mobile', 'desktop'] },
					],
				},
				{
					segments: [
						{ type: 'text', content: 'МИ БУДЕМО', visibleOn: ['mobile', 'desktop'], classnames: 'xl:ml-[clamp(143.25px,9.95vw,191px)] xl:mr-[clamp(262.5px,18.23vw,350px)]' },
						{ type: 'button', content: 'ПОРУЧ', video: '/greeting/video-3-small.mp4', visibleOn: ['mobile', 'desktop'] },
						{ type: 'text', content: 'З ТОБОЮ ЙТИ', visibleOn: ['mobile', 'desktop'] },
					],
				},
				{
					segments: [
						{ type: 'text', content: 'БО НАЙКРАЩИЙ ', visibleOn: ['mobile', 'desktop'], classnames: 'xl:ml-[clamp(69.75px,4.84vw,93px)] xl:mr-[clamp(292.5px,20.31vw,390px)]' },
						{ type: 'text', content: 'У СВІТІ — ЦЕ', visibleOn: ['mobile', 'desktop'] },
						{ type: 'button', content: 'ТИ', video: '/greeting/video-4-small.mp4', visibleOn: ['mobile', 'desktop'] },
					],
				},
			],
		},
	], []);

	const videoSources = useMemo(
		() =>
			Array.from(
				new Set(
					blocks[0].lines
						.flatMap((line) => line.segments)
						.filter((seg) => seg.type === 'button' && seg.video)
						.map((seg) => seg.video),
				)
			),
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

			<section
				className="relative z-[1] w-full bg-[#F9FDEC] text-[#2F2F2F] overflow-hidden h-full xl:px-[20px] 2xl:px-[30px] xl:py-[clamp(48px,3.33vw,64px)]"
			>

				{videoActive && (
					<motion.video
						key={`${videoActive}`}
						src={videoActive}
						preload="auto"
						autoPlay
						loop
						playsInline
						className="absolute inset-0 z-[0] w-full h-full object-cover pointer-events-none"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.1 }}
					/>
				)}

				<p className="font-karpaty font-bold xl:text-[clamp(38px,2.64vw,50px)] mx-auto xl:w-[clamp(750px,52.08vw,1000px)]">НАРРУ</p>

				<Image
					src="/greeting/title.png"
					alt="title"
					width={1000}
					height={207}
					className="mx-auto xl:w-[clamp(750px,52.08vw,1000px)] xl:h-[clamp(155.25px,10.78vw,207px)]"
				/>

				{/* Ваше зображення елемента з Фігми */}
				<Image
					src="/greeting/element.png"
					alt="element"
					width={366}
					height={923}
					className={classNames(`absolute left-[45%] -translate-x-1/2 top-[39px] z-[1] xl:w-[clamp(274.5px,19.06vw,366px)] xl:h-[clamp(692.25px,48.07vw,923px)] pointer-events-none ${videoActive && 'opacity-0'}`)}
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
				src="/line.svg"
				alt="line"
				width={1920}
				height={574}
				className="absolute z-[2] top-[89%]"
			/>
		</div>
	);
};