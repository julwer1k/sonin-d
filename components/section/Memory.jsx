'use client';

import { FolderSVG } from '@components/FolderSVG';
import classNames from 'classnames';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCards, Keyboard } from 'swiper/modules';
import Image from 'next/image';
import clsx from 'clsx';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';

// Константи кольорів
const COLORS = {
	DEFAULT: '#2C2C2C', // Чорний
	ACTIVE: '#FFB685',  // Помаранчевий
	TEXT: '#F9FDEC',    // Світлий текст
};

const FOLDERS_DATA = [
	{
		id: 'relax',
		title: 'ВІДПОЧИНОК',
		// color прибрали звідси, бо він тепер динамічний
		zIndex: 30,
		tabPosition: 'left',
		tabCoordinats: 'left-[17%] bottom-[4%]',
		media: [
			{ type: 'photo', url: '/memory/trip-1.jpg' },
			{ type: 'photo', url: '/memory/trip-2.jpg' },
			{ type: 'photo', url: '/memory/trip-3.jpg' },
			{ type: 'photo', url: '/memory/trip-4.jpg' },
			{ type: 'photo', url: '/memory/trip-5.jpg' },
			{ type: 'photo', url: '/memory/trip-6.jpg' },
			{ type: 'photo', url: '/memory/trip-7.jpg' },
			{ type: 'photo', url: '/memory/trip-8.jpg' },
			{ type: 'photo', url: '/memory/trip-9.jpg' },
			{ type: 'photo', url: '/memory/trip-10.jpg' },
			{ type: 'photo', url: '/memory/trip-11.jpg' },
			{ type: 'photo', url: '/memory/trip-12.jpg' },
			{ type: 'photo', url: '/memory/trip-13.jpg' },
			{ type: 'photo', url: '/memory/trip-14.jpg' },
			{ type: 'photo', url: '/memory/trip-15.jpg' },
			{ type: 'photo', url: '/memory/trip-16.jpg' },
			{ type: 'photo', url: '/memory/trip-17.jpg' },
			{ type: 'photo', url: '/memory/trip-18.jpg' },
			{ type: 'photo', url: '/memory/trip-19.jpg' },
			{ type: 'photo', url: '/memory/trip-20.jpg' },
		]
	},
	{
		id: 'childhood',
		title: 'ДИТИНСТВО',
		zIndex: 20,
		tabPosition: 'right',
		tabCoordinats: 'left-[54%] bottom-[4%]',
		media: [
			{ type: 'photo', url: '/memory/kid-1.png' },
			{ type: 'photo', url: '/memory/kid-2.png' },
			{ type: 'photo', url: '/memory/kid-3.png' },
			{ type: 'photo', url: '/memory/kid-4.png' },
			{ type: 'photo', url: '/memory/kid-5.png' },
			{ type: 'photo', url: '/memory/kid-6.png' },
			{ type: 'photo', url: '/memory/kid-7.png' },
			{ type: 'photo', url: '/memory/kid-8.png' },
			{ type: 'photo', url: '/memory/kid-9.png' },
			{ type: 'photo', url: '/memory/kid-10.png' },
			{ type: 'photo', url: '/memory/kid-11.png' },
			{ type: 'photo', url: '/memory/kid-12.png' },
			{ type: 'photo', url: '/memory/kid-13.png' },
		]
	},
	{
		id: 'family',
		title: 'РОДИНА',
		zIndex: 10,
		tabPosition: 'left',
		tabCoordinats: 'left-[21%] bottom-[4%]',
		media: [
			{ type: 'photo', url: '/memory/family-1.jpg' },
			{ type: 'photo', url: '/memory/family-2.jpg' },
			{ type: 'photo', url: '/memory/family-3.jpg' },
			{ type: 'photo', url: '/memory/family-4.jpg' },
			{ type: 'photo', url: '/memory/family-5.jpg' },
			{ type: 'photo', url: '/memory/family-6.jpg' },
			{ type: 'photo', url: '/memory/family-7.jpg' },
			{ type: 'photo', url: '/memory/family-8.jpg' },
		]
	},
];

export const Memory = () => {
	const [selectedId, setSelectedId] = useState(null); // Для модалки
	const [activeId, setActiveId] = useState('childhood');

	const selectedFolder = FOLDERS_DATA.find(f => f.id === selectedId);

	const handleClose = () => {
		setSelectedId(null);
		// При закритті активна папка залишається активною (помаранчевою),
		// або можна скидати activeId, якщо треба.
		// Зараз логіка така: остання відкрита залишається помаранчевою.
	};

	const handleFolderClick = (id) => {
		setActiveId(id); // Робимо помаранчевою
		setSelectedId(id); // Відкриваємо модалку
	};

	return (
		<section className="relative bg-[#F9FDEC] overflow-hidden py-[100px] ">

			<p className="relative font-karpaty xl:text-[clamp(100px,10.42vw,200px)] text-[#2F2F2F] mix-blend-multiply leading-none w-max mx-auto z-[2]">
				СПОГАДИ
			</p>

			<div className="relative z-10 text-center mb-10">

				<p className="font-quietism xl:text-[clamp(22px,1.56vw,30px)] mb-[100px]">
					Тут ми згадаємо усі теплі моменти
				</p>
			</div>

			{/* Стек папок */}
			<div className="relative w-full max-w-[1200px] mx-auto h-[600px] flex justify-center mt-10">
				{FOLDERS_DATA.map((folder, index) => {
					const zIndex = FOLDERS_DATA.length - index;
					const topOffset = -(FOLDERS_DATA.length - 1 - index) * 200;

					// Логіка кольору: якщо це активна папка - помаранчевий, інакше чорний
					const isActive = activeId === folder.id;
					const currentColor = isActive ? COLORS.ACTIVE : COLORS.DEFAULT;

					return (
						<motion.div
							key={folder.id}
							layoutId={`folder-container-${folder.id}`}
							onClick={() => handleFolderClick(folder.id)}
							className={clsx(
								"absolute xl:w-[clamp(988.68px,68.66vw,1318.24px)] h-auto cursor-pointer origin-bottom",
							)}
							style={{
								zIndex: zIndex,
								bottom: `${topOffset}px`,
							}}
							initial={false}
							animate={{
								y: 0,
							}}
							whileHover={{
								y: -30,
								transition: { duration: 0.2 }
							}}
						>
							<FolderSVG
								title={folder.title}
								color={currentColor} // Передаємо динамічний колір
								textColor={COLORS.TEXT}
								tabPosition={folder.tabPosition}
								className="w-full h-auto drop-shadow-[-10px_-10px_30px_rgba(0,0,0,0.15)] transition-colors duration-300"
							/>
						</motion.div>
					);
				})}
			</div>

			<Image
				src="/memory/ticket.png"
				alt="line"
				width={500}
				height={574}
				className="absolute z-[1] top-[30%] left-[40%]"
			/>

			{/* Модальне вікно */}
			<AnimatePresence>
				{selectedId && selectedFolder && (
					<div className="fixed inset-0 z-[100] flex items-center justify-center px-4">

						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="absolute inset-0 bg-black/60 backdrop-blur-sm"
							onClick={handleClose}
						/>

						<motion.div
							layoutId={`folder-container-${selectedId}`}
							className="relative w-full max-w-[90vw] h-[85vh] xl:max-w-[1300px] xl:h-[80vh] flex flex-col overflow-hidden isolate"
						>
							{/* Фон SVG */}
							<div className="absolute inset-0 w-full h-full -z-10">
								<FolderSVG
									title=""
									// Коли папка відкрита, вона точно активна, тому колір ACTIVE
									color={COLORS.ACTIVE}
									tabPosition={selectedFolder.tabPosition}
									className="w-full h-full drop-shadow-2xl"
								/>
							</div>

							{/* Кнопка закриття */}
							<button
								onClick={handleClose}
								className="absolute top-6 right-8 z-50 w-12 h-12 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-colors"
							>
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
									<path d="M18 6L6 18M6 6L18 18" />
								</svg>
							</button>

							{/* Заголовок */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3 }}
								className={classNames(
									"relative z-10 pt-10 w-max xl:pt-16 pb-4 text-center",
									selectedFolder.tabCoordinats
								)}
							>
								<h2 className="font-karpaty text-white text-[clamp(40px,5vw,80px)] uppercase">
									{selectedFolder.title}
								</h2>
							</motion.div>

							{/* Слайдер */}
							<motion.div
								className="relative z-10 flex-1 px-4 pb-12 w-full h-full flex items-center justify-center"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.4 }}
							>
								<Swiper
									// 2. Оновлюємо список модулів
									modules={[Navigation, EffectCards, Keyboard]}
									effect={'cards'}
									grabCursor={true}
									centeredSlides={true}
									slidesPerView={'auto'}
									cardsEffect={{
										rotate: false,
										perSlideOffset: 15,
										slideShadows: false,
									}}
									navigation={true} // Стрілочки залишаються
									// 3. Додаємо керування клавіатурою
									keyboard={{
										enabled: true,
										onlyInViewport: true, // Працює тільки коли слайдер у полі зору
									}}
									// pagination={{ clickable: true }} // 4. Видалили пагінацію
									className="w-full max-w-[300px] xl:max-w-[800px] aspect-[4/3] memory-swiper"
								>
									{selectedFolder.media.map((file, idx) => (
										<SwiperSlide key={idx} className="rounded-2xl overflow-hidden bg-black shadow-lg">
											{file.type === 'video' ? (
												<video
													src={file.url}
													controls
													className="w-full h-full object-contain"
												/>
											) : (
												<div className="relative w-full h-full">
													<Image
														src={file.url}
														alt="memory"
														fill
														className="object-cover"
													/>
												</div>
											)}
										</SwiperSlide>
									))}
								</Swiper>
							</motion.div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</section>
	);
};