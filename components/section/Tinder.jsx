'use client';

import FallingStickers from '@components/FallingStickers';
import TinderCard from '@components/TinderCard';
import Image from 'next/image';
import React, { useState } from 'react';
import 'swiper/css';

const images = [
	{ id: 0, url: '/tinder/photo-1.jpg', type: 'photo' },
	{ id: 1, url: '/tinder/photo-2.jpg', type: 'photo' },
	{ id: 2, url: '/tinder/photo-3.jpg', type: 'photo' },
	{ id: 3, url: '/tinder/photo-4.jpg', type: 'photo' },
	{ id: 5, url: '/tinder/photo-5.jpg', type: 'photo' },
	// добавишь свои
];

const buttonsLike = [
	{ id: 'smile', url: '/tinder/smile.png', },
	{ id: 'kiss', url: '/tinder/kiss.png',},
	{ id: 'heart', url: '/tinder/heart.png',},
	{ id: 'love', url: '/tinder/love.png',},
];

export default function Tinder() {
	const [reaction, setReaction] = useState('none');
	const [emojiBurst, setEmojiBurst] = useState(null);
	if (!images.length) return null;

	return (
		<section
			className="
        relative min-h-[100dvh]
        bg-background isolate
        flex items-center flex-col justify-center
        xs:px-[clamp(15px,4.69vw,18px)]
        s:px-[clamp(18px,4.62vw,30px)]
        xs:py-[clamp(50px,15.63vw,62px)]
				s:py-[clamp(62px,15.9vw,100px)]
      "
		>
			{emojiBurst && (
				<FallingStickers
					key={emojiBurst}         // новый key — перезапускаем анимацию
					images={[emojiBurst]}   // важное место: передаём массив с одним url
					count={10}
				/>
			)}

			<TinderCard
				images={images}
				reaction={reaction}
				setReaction={(res) => {setReaction(res)}}
				setEmojiBurst={setEmojiBurst}
			/>

			{/* 🔹 Кнопки с эмоциями — ТОЛЬКО при like */}
			{reaction === 'like' && (
				<div className="mt-2 flex items-center justify-center gap-2">
					{buttonsLike.map((item) => (
						<button
							key={item.id}
							type="button"
							onClick={() => setEmojiBurst?.(item.url)}
							className="
		              flex items-center justify-center
		              xs:w-[clamp(66px,20.63vw,81px)]
									s:w-[clamp(81px,20.77vw,133px)]
									xs:h-[clamp(28px,8.75vw,34px)]
									s:h-[clamp(34px,8.72vw,57px)]
									xs:rounded-[clamp(22px,6.88vw,27px)]
									s:rounded-[clamp(27px,6.92vw,44px)]
		              border-white/30
		              xs:border-[clamp(1.45px,0.45vw,1.77px)]
									s:border-[clamp(1.77px,0.45vw,2.9px)]
		              bg-white/20
		              shadow-[0_0_12px_rgba(255,255,255,0.25)]
		              active:scale-95
		              transition-transform duration-150
		            "
						>
							<Image
								src={item.url}
								alt="Item Buttons"
								width={32}
								height={32}
								priority
								className="inset-0 z-[0] object-cover pointer-events-none
									xs:w-[clamp(16px,5vw,20px)]
									s:w-[clamp(20px,5.13vw,32px)]
									xs:h-[clamp(16px,5vw,20px)]
									s:h-[clamp(20px,5.13vw,32px)]"
							/>
						</button>
					))}
				</div>
			)}

			<Image
				src="/grid.svg"
				alt="background image"
				width={320}
				height={2000}
				priority
				className="pointer-events-none
            absolute inset-0 z-[-1]
            object-cover opacity-30 mix-blend-screen
            xs:w-[clamp(320px,100vw,390px)]
            s:w-[clamp(390px,100vw,640px)]
            xs:min-h-[clamp(878px,274.38vw,1070px)]
						s:min-h-[clamp(1070px,274.36vw,1752px)]"
			/>
		</section>
	);
}
