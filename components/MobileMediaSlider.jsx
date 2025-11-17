'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function MobileMediaSlider({ files }) {
	const [activeFile, setActiveFile] = useState(null);
	const [activeIndex, setActiveIndex] = useState(0);

	if (!files?.length) return null;

	return (
		<>
			{/* ОБЛАСТЬ СЛАЙДЕРА — по центру по вертикали */}
			<div
				className="
          relative
          w-full
          max-w-[640px]
          mx-auto
          pointer-events-auto
          xs:top-[clamp(25px,7.81vw,35px)]
					s:top-[clamp(35px,8.97vw,60px)]
          flex items-center justify-center
          z-[40]
        "
			>
				<Swiper
					className="mobile-media-slider"
					modules={[Autoplay]}
					slidesPerView="auto"
					centeredSlides
					loop
					autoplay={{
						delay: 4000,
						disableOnInteraction: false,
					}}
					speed={600}
					spaceBetween={0}
					onSlideChange={(swiper) => {
						setActiveIndex(swiper.realIndex);
					}}
				>
					{files.map((file, index) => {
						const isVertical = file.orientation === 'vertical';
						const isActive = index === activeIndex;

						const sizeClasses = isVertical
							? `
                xs:w-[clamp(180px,56.25vw,219px)]
								s:w-[clamp(219px,56.15vw,360px)]
                xs:h-[clamp(280px,87.5vw,341px)]
								s:h-[clamp(341px,87.44vw,560px)]
              `
							: `
                xs:w-[clamp(300px,93.75vw,366px)]
								s:w-[clamp(366px,93.85vw,600px)]
                xs:h-[clamp(200px,62.5vw,244px)]
								s:h-[clamp(244px,62.56vw,400px)]
              `;

						const stateClasses = isActive
							? 'opacity-100 scale-100 blur-none brightness-100'
							: 'opacity-70 scale-95 blur-[5px] brightness-90';

						return (
							<SwiperSlide
								key={file.id}
								style={{ width: 'auto' }}
								className={sizeClasses}
							>
								<button
									type="button"
									onClick={() => setActiveFile(file)}
									className={`
                    block
                    ${sizeClasses}
                    ${stateClasses}
                    overflow-hidden
                    bg-black/40
                    xs:rounded-[clamp(5px,1.56vw,6px)]
										s:rounded-[clamp(6px,1.54vw,10px)]
                    shadow-[0_20px_40px_rgba(0,0,0,0.35)]
                    active:scale-[0.97]
                    transition-all duration-200 ease-out
                  `}
								>
									{file.type === 'photo' ? (
										<Image
											src={file.url}
											alt=""
											width={isVertical ? 400 : 600}
											height={isVertical ? 600 : 400}
											className="w-full h-full object-cover"
										/>
									) : (
										<video
											src={file.url}
											className="w-full h-full object-cover"
											muted
											loop
											playsInline
											autoPlay
										/>
									)}
								</button>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>

			{/* МОДАЛКА ПОЛНОЭКРАННАЯ */}
			{activeFile && (
				<div
					className="
            absolute inset-0 z-[999]
            flex items-center justify-center
            bg-black/80
          "
				>
					{/* КНОПКА ЗАКРЫТЬ */}
					<button
						type="button"
						onClick={() => setActiveFile(null)}
						className="
              absolute top-4 right-4
              w-9 h-9
              z-[10]
              rounded-full
              bg-white/10
              border border-white/30
              flex items-center justify-center
              text-white
              text-xl
              backdrop-blur
              active:scale-95
            "
					>
						✕
					</button>

					{/* КОНТЕЙНЕР ДЛЯ КАРТИНКИ / ВИДЕО */}
					<div
						className="
              relative
              w-[90vw]
              max-w-[640px]
              max-h-[100vh]
              rounded-[18px]
              overflow-hidden
              bg-black
              flex items-center justify-center
            "
					>
						{activeFile.type === 'photo' ? (
							<div className="relative w-full h-full">
								<Image
									src={activeFile.url}
									alt=""
									width={900}
									height={900}
									className="object-contain"
								/>
							</div>
						) : (
							<video
								src={activeFile.url}
								className="w-full h-full object-contain bg-black"
								controls
								autoPlay
								playsInline
							/>
						)}
					</div>
				</div>
			)}
		</>
	);
}
