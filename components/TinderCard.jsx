import classNames from 'classnames';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function TinderCard({ images, reaction, setReaction, setEmojiBurst }) {
	const swiperRef = useRef(null);
	const [activeIndex, setActiveIndex] = useState(0);

	{/* КАРТОЧКА ТИНДЕР */
	}
	return (
		<div
			className="
          relative
          overflow-hidden
          xs:rounded-[clamp(15px,4.69vw,18px)]
					s:rounded-[clamp(18px,4.62vw,29px)]
          bg-black/40
          shadow-[0_30px_60px_rgba(0,0,0,0.5)]
          xs:w-[clamp(290px,90.63vw,354px)]
					s:w-[clamp(354px,90.77vw,580px)]
          aspect-[580/924]
        "
		>
			{/* СЛАЙДЕР КАРТИНОК (как в Tinder) */}
			<Swiper
				className="h-full w-full"
				slidesPerView={1}
				spaceBetween={0}
				onSwiper={(s) => (swiperRef.current = s)}
				onSlideChange={(swiper) => {
					setActiveIndex(swiper.realIndex);
					setReaction('none');
					setEmojiBurst(null)
				}}
			>
				{images.map((file) => (
					<SwiperSlide key={file.id}>
						<div className="relative w-full h-full">
							<Image
								src={file.url}
								alt=""
								fill
								className="object-cover select-none pointer-events-none"
								priority={file.id === 0}
							/>

							{/* TAP ZONE — ЛЕВАЯ СТОРОНА */}
							<div
								className="
										absolute left-0 top-0 h-full
										w-1/2
										z-20
										cursor-pointer
									"
								onClick={() => {
									if (!swiperRef.current) return;
									swiperRef.current.slidePrev();
								}}
							/>

							{/* TAP ZONE — ПРАВАЯ СТОРОНА */}
							<div
								className="
										absolute right-0 top-0 h-full
										w-1/2
										z-20
										cursor-pointer
									"
								onClick={() => {
									if (!swiperRef.current) return;
									swiperRef.current.slideNext();
								}}
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			{/* ГРАДИЕНТ-ПОДЛОЖКА НА КАРТИНКУ */}
			<div
				className="pointer-events-none absolute inset-0 z-[1]"
				style={{
					background: `
              linear-gradient(
                to bottom,
                rgba(255,255,255,0) 31%,
                rgba(13,13,13,0.62) 75%,
                rgba(0,0,0,1) 92%
              )
            `,
				}}
			/>

			{/* ВЕРХНИЕ РИСОЧКИ (индикатор фото) */}
			<div
				className="
            absolute
						xs:top-[clamp(15px,4.69vw,19px)]
						s:top-[clamp(19px,4.87vw,31px)]
            left-0 right-0
            flex items-center justify-center
            xs:gap-[clamp(4px,1.25vw,4px)]
						s:gap-[clamp(4px,1.03vw,7px)]
            z-10
          "
			>
				{images.map((img, index) => {
					const isActive = index === activeIndex;
					return (
						<div
							key={img.id}
							className={`
                  xs:h-[clamp(5px,1.56vw,6px)]
									s:h-[clamp(6px,1.54vw,10px)]
									xs:rounded-[clamp(12px,3.75vw,15px)]
									s:rounded-[clamp(15px,3.85vw,25px)]
                  transition-all
                  duration-200
                  xs:max-w-[clamp(40px,12.5vw,50px)]
									s:max-w-[clamp(50px,12.82vw,90px)]
                  ${isActive ? 'bg-[#FAFAFA]' : 'bg-[#60606099]'}
                `}
							style={{
								flex: '1 1 0',
							}}
						/>
					);
				})}
			</div>

			{/* НИЖНЯЯ ОБЛАСТЬ С КОНТЕНТОМ + КНОПКИ */}
			<div
				className={classNames(
					'absolute inset-x-0 z-10 flex flex-col text-white',
					{
						[`
				        bottom-0
				        xs:px-[clamp(18px,5.63vw,22px)]
				        s:px-[clamp(22px,5.64vw,36px)]
				        xs:pb-[clamp(18px,5.63vw,22px)]
				        s:pb-[clamp(22px,5.64vw,35px)]
				        pt-[24px]
				      `]: reaction === 'none',
						[`
				        xs:top-[clamp(153px,47.81vw,187px)]
				        s:top-[clamp(187px,47.95vw,306px)]
				      `]: reaction !== 'none',
					},
				)}
			>
				{reaction === 'none' && (
					<>
						<div
							className="flex items-center w-max
									xs:gap-[clamp(6px,1.88vw,7px)]
									s:gap-[clamp(7px,1.79vw,12px)]
									xs:mb-[clamp(11px,3.44vw,13px)]
									s:mb-[clamp(13px,3.33vw,22px)]"
						>

						<span
							className="inline-block bg-[#25DD6F] rounded-full
							xs:w-[clamp(6px,1.88vw,7px)]
							s:w-[clamp(7px,1.79vw,12px)]
							xs:h-[clamp(6px,1.88vw,7px)]
							s:h-[clamp(7px,1.79vw,12px)]"
						/>

							<span
								className="font-inter font-medium
								xs:text-[clamp(8px,2.5vw,10px)]
								s:text-[clamp(10px,2.56vw,16px)]
								xs:h-[clamp(6px,1.88vw,7px)]
								s:h-[clamp(7px,1.79vw,12px)]
								xs:leading-[clamp(6px,1.88vw,7px)]
								s:leading-[clamp(7px,1.79vw,12px)]"
							>
							Была недавно
						</span>

							<Image
								src="/tinder/sticker.png"
								alt="Sticker"
								width={14}
								height={14}
								priority
								className="inset-0 z-[0] object-cover pointer-events-none
								xs:w-[clamp(14px,4.38vw,17px)]
								s:w-[clamp(17px,4.36vw,28px)]
								xs:h-[clamp(14px,4.38vw,17px)]
								s:h-[clamp(17px,4.36vw,28px)]
								xs:rounded-[clamp(2px,0.63vw,3px)]
								s:rounded-[clamp(3px,0.77vw,4px)]
								"
							/>
						</div>

						{/* КОНТЕНТ КАРТОЧКИ (пока просто пример, потом заменишь) */}
						<div
							className="flex flex-col
									xs:gap-[clamp(8px,2.5vw,10px)]
									s:gap-[clamp(10px,2.56vw,16px)]
									xs:mb-[clamp(17px,5.31vw,21px)]
									s:mb-[clamp(21px,5.38vw,34px)]"
						>
							<div
								className="flex items-baseline
							xs:gap-[clamp(8px,2.5vw,10px)]
							s:gap-[clamp(10px,2.56vw,16px)]"
							>
								<p
									className="font-inter font-semibold
								xs:text-[clamp(22px,6.88vw,27px)]
								s:text-[clamp(27px,6.92vw,44px)]
								xs:h-[clamp(16px,5vw,20px)]
								s:h-[clamp(20px,5.13vw,32px)]
								xs:leading-[clamp(16px,5vw,20px)]
								s:leading-[clamp(20px,5.13vw,32px)]"
								>
									Britni Spirsa
								</p>

								<span
									className="font-manrope font-medium
								xs:text-[clamp(22px,6.88vw,27px)]
								s:text-[clamp(27px,6.92vw,45px)]
								xs:h-[clamp(16px,5vw,19px)]
								s:h-[clamp(19px,4.87vw,32px)]
								xs:leading-[clamp(16px,5vw,19px)]
								s:leading-[clamp(19px,4.87vw,32px)]"
								>
                22
              </span>
							</div>
						</div>

						<div
							className="flex flex-col
									xs:gap-[clamp(7px,2.19vw,9px)]
									s:gap-[clamp(9px,2.31vw,14px)]"
						>
							<div
								className="flex items-center xs:gap-[clamp(10px,3.13vw,12px)]
									s:gap-[clamp(12px,3.08vw,20px)]"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="25"
									height="21"
									fill="none"
									viewBox="0 0 25 21"
									className="
											xs:w-[clamp(14px,4.38vw,17px)]
											s:w-[clamp(17px,4.36vw,28px)]
											xs:h-[clamp(12px,3.75vw,15px)]
											s:h-[clamp(15px,3.85vw,24px)]"
								>
									<path
										fill="#fff"
										d="M24.06 19.32H22.4V9.612a1.699 1.699 0 0 0-.536-1.237L13.568.449a1.648 1.648 0 0 0-2.244-.012l-.012.012-8.287 7.926a1.68 1.68 0 0 0-.536 1.237v9.708H.829a.825.825 0 0 0-.586.246.846.846 0 0 0 0 1.188A.824.824 0 0 0 .83 21h23.23c.22 0 .43-.088.586-.246a.845.845 0 0 0 0-1.188.825.825 0 0 0-.587-.246ZM4.147 9.612l.012-.01 8.284-7.924L20.73 9.6l.012.01v9.71h-4.979v-5.04a1.69 1.69 0 0 0-.486-1.188 1.649 1.649 0 0 0-1.173-.492h-3.319c-.44 0-.862.177-1.173.492a1.69 1.69 0 0 0-.486 1.188v5.04H4.148V9.613Zm9.956 9.708h-3.319v-5.04h3.319v5.04Z"
									/>
								</svg>

								<span
									className="font-inter font-normal
											xs:text-[clamp(10px,3.13vw,12px)]
											s:text-[clamp(12px,3.08vw,20px)]
											xs:h-[clamp(8px,2.5vw,10px)]
											s:h-[clamp(10px,2.56vw,16px)]
											xs:leading-[clamp(8px,2.5vw,10px)]
											s:leading-[clamp(10px,2.56vw,16px)]
											"
								>Живет в Днепре</span>
							</div>

							<div
								className="flex items-center ml-[2px]
								xs:gap-[clamp(121px,37.81vw,15px)]
								s:gap-[clamp(15px,3.85vw,26px)]"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="19"
									height="24"
									fill="none"
									viewBox="0 0 19 24"
									className="
											xs:w-[clamp(10px,3.13vw,12px)]
											s:w-[clamp(12px,3.08vw,20px)]
											xs:h-[clamp(13px,4.06vw,16px)]
											s:h-[clamp(16px,4.1vw,26px)]"
								>
									<path
										fill="#fff"
										d="M16.741 22.23h-5.175a28.21 28.21 0 0 0 2.455-2.538c2.872-3.374 4.394-6.931 4.394-10.287 0-2.494-.97-4.887-2.697-6.65A9.11 9.11 0 0 0 9.208 0a9.11 9.11 0 0 0-6.511 2.755A9.508 9.508 0 0 0 0 9.405c0 3.356 1.518 6.913 4.395 10.287a28.218 28.218 0 0 0 2.454 2.538H1.674a.828.828 0 0 0-.592.25.864.864 0 0 0 0 1.21c.157.16.37.25.592.25h15.067c.222 0 .435-.09.592-.25a.864.864 0 0 0 0-1.21.828.828 0 0 0-.592-.25ZM1.674 9.405a7.78 7.78 0 0 1 2.207-5.441A7.454 7.454 0 0 1 9.208 1.71c1.998 0 3.914.81 5.327 2.254a7.78 7.78 0 0 1 2.206 5.44c0 6.117-5.804 11.223-7.533 12.612-1.73-1.39-7.534-6.495-7.534-12.611Zm11.719 0a4.34 4.34 0 0 0-.705-2.375 4.206 4.206 0 0 0-1.879-1.575 4.104 4.104 0 0 0-2.418-.243 4.159 4.159 0 0 0-2.143 1.17 4.304 4.304 0 0 0-1.145 2.189 4.36 4.36 0 0 0 .238 2.47 4.257 4.257 0 0 0 1.541 1.918c.689.47 1.498.72 2.326.72 1.11 0 2.174-.45 2.96-1.251a4.322 4.322 0 0 0 1.225-3.023Zm-6.697 0c0-.507.148-1.003.424-1.425.276-.422.668-.75 1.127-.945a2.462 2.462 0 0 1 1.45-.146c.488.1.935.343 1.286.702.351.359.59.816.688 1.314a2.617 2.617 0 0 1-.143 1.482c-.19.468-.512.869-.925 1.15a2.474 2.474 0 0 1-3.171-.318 2.593 2.593 0 0 1-.736-1.814Z"
									/>
								</svg>

								<span
									className="font-inter font-normal
											xs:text-[clamp(10px,3.13vw,12px)]
											s:text-[clamp(12px,3.08vw,20px)]
											xs:h-[clamp(8px,2.5vw,10px)]
											s:h-[clamp(10px,2.56vw,16px)]
											xs:leading-[clamp(8px,2.5vw,10px)]
											s:leading-[clamp(10px,2.56vw,16px)]
											"
								>На расстоянии 3101 км</span>
							</div>
						</div>

						{/* КНОПКИ НИЗА (UNDO, DISLIKE, SUPER LIKE, LIKE, FLASH) */}
						<div
							className="
		              flex items-center justify-center
		              xs:gap-[clamp(10px,3.13vw,12px)]
									s:gap-[clamp(12px,3.08vw,19px)]
		              xs:mt-[clamp(27px,8.44vw,33px)]
									s:mt-[clamp(33px,8.46vw,54px)]"
						>
							{/* UNDO — просто декор, svg вставишь внутрь */}
							<button
								type="button"
								className="
						    group inline-flex items-center justify-center
						    text-[#808080]
						    active:scale-95
						    transition-transform duration-150
						  "
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="9 9 80 80"
									className="
						    pointer-events-none
						    xs:w-[clamp(38px,11.88vw,47px)]
						    s:w-[clamp(47px,12.05vw,77px)]
						    h-auto
						    transition-transform duration-200
						    group-hover:scale-105
						    group-active:scale-95
						  "
									fill="none"
								>
									<g filter="url(#undoShadow)">
										<circle
											cx="38.242"
											cy="38.242"
											r="37.445"
											transform="matrix(-1 0 0 1 87.191 9.178)"
											stroke="currentColor"
											strokeWidth="1.593"
											fill="none"
										/>
									</g>
									<path
										fill="currentColor"       // тоже из text-[#808080]
										d="M34.837 38.962a1.801 1.801 0 0 1 0-2.84l11.204-8.74c1.182-.923 2.909-.08 2.909 1.42v4.596c3.151 0 6.232.972 8.852 2.793 2.62 1.821 4.663 4.41 5.869 7.437a17.19 17.19 0 0 1 .907 9.575c-.615 3.214-2.133 6.167-4.361 8.485-2.229 2.317-5.068 3.895-8.159 4.535-3.09.64-6.294.311-9.206-.943s-5.4-3.378-7.151-6.104a16.91 16.91 0 0 1-2.223-5.241c-.509-2.15 1.329-3.965 3.538-3.965 2.21 0 3.92 1.886 4.92 3.856.127.249.266.492.418.727a8.009 8.009 0 0 0 3.56 3.04 7.65 7.65 0 0 0 4.583.469 7.843 7.843 0 0 0 4.062-2.258 8.357 8.357 0 0 0 2.171-4.224 8.56 8.56 0 0 0-.451-4.767 8.189 8.189 0 0 0-2.922-3.703 7.717 7.717 0 0 0-4.407-1.39v4.56c0 1.5-1.727 2.343-2.91 1.42l-11.203-8.738Z"
									/>
									<defs>
										<filter
											id="undoShadow"
											x="0"
											y="0"
											width="97.899"
											height="97.899"
											colorInterpolationFilters="sRGB"
											filterUnits="userSpaceOnUse"
										>
											<feFlood
												floodOpacity="0"
												result="BackgroundImageFix"
											/>
											<feColorMatrix
												in="SourceAlpha"
												result="hardAlpha"
												values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
											/>
											<feOffset dy="1.53" />
											<feGaussianBlur stdDeviation="5.354" />
											<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0" />
											<feBlend
												in2="BackgroundImageFix"
												result="effect1_dropShadow_undo"
											/>
											<feBlend
												in="SourceGraphic"
												in2="effect1_dropShadow_undo"
												result="shape"
											/>
										</filter>
									</defs>
								</svg>
							</button>

							{/* DISLIKE */}
							<button
								type="button"
								onClick={() => setReaction('dislike')}
								className="
						    group inline-flex items-center justify-center
						    active:scale-95
						    transition-transform duration-150
						  "
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="111"
									height="111"
									fill="none"
									viewBox="10 10 91 91"
									className="
								  pointer-events-none
								  xs:w-[clamp(45px,14.06vw,54px)]
									s:w-[clamp(54px,13.85vw,89px)]
								  h-auto
								  transition-transform duration-200
								  group-hover:scale-105
								  group-active:scale-95
						    "
								>
									<g filter="url(#a)">
										<circle
											cx="55.026"
											cy="53.539"
											r="43.819"
											stroke="#F24C65"
											strokeWidth="1.593"
										/>
									</g>
									<path
										fill="#F24C65"
										d="M71.688 44.806a3.477 3.477 0 0 0 0-4.916l-3.014-3.014a3.476 3.476 0 0 0-4.917 0l-8.732 8.732-8.732-8.732a3.477 3.477 0 0 0-4.916 0l-3.014 3.014a3.476 3.476 0 0 0 0 4.916l8.732 8.732-8.732 8.732a3.476 3.476 0 0 0 0 4.917l3.014 3.014a3.477 3.477 0 0 0 4.916 0l8.732-8.732 8.732 8.732a3.477 3.477 0 0 0 4.917 0l3.014-3.014a3.477 3.477 0 0 0 0-4.917l-8.732-8.732 8.732-8.732Z"
									/>
									<defs>
										<filter
											id="a"
											width="110.052"
											height="110.052"
											x="0"
											y="0"
											colorInterpolationFilters="sRGB"
											filterUnits="userSpaceOnUse"
										>
											<feFlood
												floodOpacity="0"
												result="BackgroundImageFix"
											/>
											<feColorMatrix
												in="SourceAlpha"
												result="hardAlpha"
												values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
											/>
											<feOffset dy="1.487" />
											<feGaussianBlur stdDeviation="5.205" />
											<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0" />
											<feBlend
												in2="BackgroundImageFix"
												result="effect1_dropShadow_179_1216"
											/>
											<feBlend
												in="SourceGraphic"
												in2="effect1_dropShadow_179_1216"
												result="shape"
											/>
										</filter>
									</defs>
								</svg>
							</button>

							{/* SUPER LIKE */}
							<button
								type="button"
								className="
						    group inline-flex items-center justify-center
						    active:scale-95
						    transition-transform duration-150
						  "
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="102"
									height="102"
									fill="none"
									viewBox="10 10 82 82"
									className="
								  pointer-events-none
								  xs:w-[clamp(40px,12.5vw,49px)]
									s:w-[clamp(49px,12.56vw,80px)]
								  h-auto
								  transition-transform duration-200
								  group-hover:scale-105
								  group-active:scale-95
						    "
								>
									<g filter="url(#a)">
										<circle
											cx="39.835"
											cy="39.835"
											r="39.038"
											stroke="#27AAE4"
											strokeWidth="1.593"
											transform="matrix(-1 0 0 1 90.824 9.56)"
										/>
									</g>
									<path
										fill="#27AAE4"
										d="M49.345 31.62c.719-1.285 2.568-1.285 3.287 0l5.283 9.444 10.555 2.169c1.428.294 1.995 2.03 1.016 3.11l-7.29 8.04 1.22 10.813c.165 1.458-1.327 2.536-2.66 1.922l-9.767-4.503-9.768 4.503c-1.332.614-2.824-.464-2.66-1.921l1.221-10.814-7.29-8.04c-.98-1.08-.413-2.817 1.016-3.11l10.555-2.169 5.282-9.444Z"
									/>
									<defs>
										<filter
											id="a"
											width="101.978"
											height="101.978"
											x="0"
											y="0"
											colorInterpolationFilters="sRGB"
											filterUnits="userSpaceOnUse"
										>
											<feFlood
												floodOpacity="0"
												result="BackgroundImageFix"
											/>
											<feColorMatrix
												in="SourceAlpha"
												result="hardAlpha"
												values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
											/>
											<feOffset dy="1.593" />
											<feGaussianBlur stdDeviation="5.577" />
											<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0" />
											<feBlend
												in2="BackgroundImageFix"
												result="effect1_dropShadow_179_1219"
											/>
											<feBlend
												in="SourceGraphic"
												in2="effect1_dropShadow_179_1219"
												result="shape"
											/>
										</filter>
									</defs>
								</svg>
							</button>

							{/* LIKE */}
							<button
								type="button"
								onClick={() => setReaction('like')}
								className="
						    group inline-flex items-center justify-center
						    active:scale-95
						    transition-transform duration-150
						  "
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="111"
									height="111"
									fill="none"
									viewBox="10 10 91 91"
									className="
								  pointer-events-none
								  transition-transform duration-200
								  group-hover:scale-105
								  group-active:scale-95
								  xs:w-[clamp(45px,14.06vw,54px)]
									s:w-[clamp(54px,13.85vw,89px)]
								    h-auto
						    "
								>
									<g filter="url(#a)">
										<circle
											cx="55.026"
											cy="53.538"
											r="43.819"
											stroke="#3CDBA7"
											strokeWidth="1.593"
										/>
									</g>
									<path
										fill="#3CDBA7"
										d="M70.757 37.915a11.369 11.369 0 0 0-3.7-2.587c-1.384-.6-2.87-.91-4.37-.911-2.838 0-5.572 1.11-7.661 3.107-2.09-1.998-4.824-3.107-7.662-3.107-1.502.002-2.989.312-4.375.914a11.378 11.378 0 0 0-3.702 2.592 12.087 12.087 0 0 0 .004 16.776l13.338 13.873a3.325 3.325 0 0 0 4.794 0L70.76 54.699c4.513-4.693 4.515-12.064-.004-16.784Z"
									/>
									<defs>
										<filter
											id="a"
											width="110.052"
											height="110.052"
											x="0"
											y="0"
											colorInterpolationFilters="sRGB"
											filterUnits="userSpaceOnUse"
										>
											<feFlood
												floodOpacity="0"
												result="BackgroundImageFix"
											/>
											<feColorMatrix
												in="SourceAlpha"
												result="hardAlpha"
												values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
											/>
											<feOffset dy="1.487" />
											<feGaussianBlur stdDeviation="5.205" />
											<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0" />
											<feBlend
												in2="BackgroundImageFix"
												result="effect1_dropShadow_179_1222"
											/>
											<feBlend
												in="SourceGraphic"
												in2="effect1_dropShadow_179_1222"
												result="shape"
											/>
										</filter>
									</defs>
								</svg>
							</button>

							{/* FLASH */}
							<button
								type="button"
								className="
						    group inline-flex items-center justify-center
						    active:scale-95
						    transition-transform duration-150
						  "
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="98"
									height="98"
									fill="none"
									viewBox="9 9 80 80"
									className="
								  pointer-events-none
								  transition-transform duration-200
								  group-hover:scale-105
								  group-active:scale-95
								  xs:w-[clamp(38px,11.88vw,47px)]
									s:w-[clamp(47px,12.05vw,77px)]
									h-auto
						    "
								>
									<g filter="url(#a)">
										<circle
											cx="38.242"
											cy="38.242"
											r="37.445"
											stroke="#A34FDB"
											strokeWidth="1.593"
											transform="matrix(-1 0 0 1 87.191 9.178)"
										/>
									</g>
									<path
										fill="#A34FDB"
										d="m38.541 44.819 15.829-15.8c.633-.633 1.692-.001 1.437.857L51.72 43.59a.863.863 0 0 0 .511 1.05l6.507 2.558c.579.228.734.975.294 1.414l-15.829 15.8c-.633.633-1.692 0-1.437-.857l4.087-13.715a.863.863 0 0 0-.511-1.05l-6.507-2.557a.863.863 0 0 1-.294-1.414Z"
									/>
									<defs>
										<filter
											id="a"
											width="97.899"
											height="97.899"
											x="0"
											y="0"
											colorInterpolationFilters="sRGB"
											filterUnits="userSpaceOnUse"
										>
											<feFlood
												floodOpacity="0"
												result="BackgroundImageFix"
											/>
											<feColorMatrix
												in="SourceAlpha"
												result="hardAlpha"
												values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
											/>
											<feOffset dy="1.53" />
											<feGaussianBlur stdDeviation="5.354" />
											<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0" />
											<feBlend
												in2="BackgroundImageFix"
												result="effect1_dropShadow_179_1225"
											/>
											<feBlend
												in="SourceGraphic"
												in2="effect1_dropShadow_179_1225"
												result="shape"
											/>
										</filter>
									</defs>
								</svg>
							</button>
						</div>
					</>
				)}

				{reaction !== 'none' && (
					<>
						<div
							className="
									z-[20] left-0 right-0
									flex items-center justify-center
									pointer-events-none
								"
						>
							<Image
								src={reaction === 'like' ? '/tinder/like.svg' : '/tinder/dislike.svg'}
								alt="Reaction overlay"
								width={502}
								height={312}
								className={classNames(
									`select-none h-auto`,
									{
										[
											`
									        xs:w-[clamp(251px,78.44vw,306px)]
									        s:w-[clamp(306px,78.46vw,501px)]
									      `
											]: reaction === 'like',
										[
											`
									        xs:w-[clamp(290px,90.63vw,354px)]
									        s:w-[clamp(354px,90.77vw,580px)]
									      `
											]: reaction === 'dislike',
									},
								)}
								priority
							/>
						</div>

						<div className="flex flex-col items-center
								xs:gap-[clamp(16px,5vw,19px)]
								s:gap-[clamp(19px,4.87vw,32px)]
								xs:mt-[clamp(73px,22.81vw,82px)]
								s:mt-[clamp(82px,21.03vw,135px)]">

							{/* 🔹 Текст Britni Likes You Too (для обеих реакций, по твоему описанию) */}
							<p
								className="font-inter font-medium
									xs:text-[clamp(10px,3.13vw,12px)]
									s:text-[clamp(12px,3.08vw,19px)]
									xs:h-[clamp(8px,2.5vw,10px)]
									s:h-[clamp(10px,2.56vw,16px)]
									xs:leading-[clamp(8px,2.5vw,10px)]
									s:leading-[clamp(10px,2.56vw,16px)]
				          text-center"
							>
								Britni Likes You Too
							</p>

							{/* 🔹 Плашка Tell Britni Something Nice */}
							<div
								className="
					          inline-flex items-center
					          xs:rounded-[clamp(16px,5vw,20px)]
										s:rounded-[clamp(20px,5.13vw,32px)]
										px-4
					          bg-white
					          xs:w-[clamp(238px,74.38vw,292px)]
										s:w-[clamp(292px,74.87vw,478px)]
										xs:h-[clamp(35px,10.94vw,43px)]
										s:h-[clamp(43px,11.03vw,70px)]"
							>
					        <span
						        className="
					            font-inter
					            xs:text-[clamp(13px,4.06vw,16px)]
											s:text-[clamp(16px,4.1vw,26px)]
											xs:h-[clamp(13px,4.06vw,16px)]
											s:h-[clamp(16px,4.1vw,26px)]
											xs:leading-[clamp(13px,4.06vw,16px)]
											s:leading-[clamp(16px,4.1vw,26px)]
					            text-black/40"
					        >
					          Tell Britni Something Nice
			            </span>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}