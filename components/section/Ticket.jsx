'use client';

import { RunningLine } from '@components/section/RunningLine';
import { TicketBadge } from '@components/TicketBadge';
import classNames from 'classnames';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

// --- КОМПОНЕНТ ЧАСОВ ---
const DigitalClock = () => {
	const [time, setTime] = useState('');

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			const hours = String(now.getHours()).padStart(2, '0');
			const minutes = String(now.getMinutes()).padStart(2, '0');
			setTime(`${hours}:${minutes}`);
		};

		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	}, []);

	if (!time) return <span className="opacity-0">00:00</span>;
	return <span>{time}</span>;
};

const TICKETS = [
	{
		id: 1,
		path: '/ticket/ticket-1.webp',
		alt: 'Popcorn Ticket',
		// Данные для бейджа
		popImage: '/ticket/image-1.webp', // Твоя картинка попкорна (без фона)
		bgColor: '#FFC067', // Оранжевый
		badgePosition: "absolute top-[35.5%] rotate-[6deg] right-[4%]",
		runningText: 'EARLY-EVENING SPECIAL # EVERY MONDAY & TUESDAY & WENSDAY &'
	},
	{
		id: 2,
		path: '/ticket/ticket-2.webp',
		alt: 'Cocktail Ticket',
		popImage: '/ticket/image-2.webp',
		badgePosition: "absolute top-[17%] rotate-[-3deg] right-[4%]",
		bgColor: '#ED8781', // Розовый
		runningText: 'SUMMER VIBES ONLY # FRESH DRINKS & GOOD TIMES &'
	},
	{
		id: 3,
		path: '/ticket/ticket-3.webp',
		alt: 'Snowboard Ticket',
		popImage: '/ticket/image-3.webp',
		bgColor: '#86BADA', // Голубой
		badgePosition: "absolute top-[10%] rotate-[-14deg] right-[5%]",
		runningText: 'WINTER SEASON PASS # SNOWBOARDING & SKIING &'
	},
];

export const Ticket = () => {
	return (
		<div className={`relative w-full overflow-hidden pb-[50px]`}>

			{/* Фон секции */}
			<div
				className="absolute inset-0 w-full h-full z-0 origin-top-left -skew-y-[7deg] scale-y-[1.2]"
				style={{
					background: 'linear-gradient(180deg, #F9FDEC 28%, #9CC5FD 75%)'
				}}
			/>

			<div className="absolute bottom-[-200px] left-0 w-full h-[774px] z-[5] pointer-events-none">
				<Image
					src="/ticket/background-2.webp"
					alt="Top Decoration"
					width={1920}
					height={774}
					className="object-fill object-bottom" // object-bottom гарантує, що низ картинки притиснутий до низу блоку
				/>
			</div>

			<section className="relative z-10 w-full flex flex-col items-center">

				{/* --- ТАБЛО (Top Decor) --- */}
				<div className="relative w-full max-w-[1200px] xl:h-[clamp(320px,22.22vw,426px)] mb-[50px]">
					<Image
						src="/ticket/top-element.webp"
						alt="Top Decoration"
						fill
						className="object-contain object-top"
					/>

					{/* --- СЕТКА ДАННЫХ ТАБЛО --- */}
					<div className="absolute inset-0 font-krapka text-[#EEDC27] text-[clamp(14px,1.5vw,24px)] tracking-widest uppercase shadow-digital">

						<div className="absolute xl:top-[110px] w-full flex xl:text-[clamp(49.25px,3.42vw,66px)] gap-[112px]">

							{/* Колонка 1: Поезд */}
							<div className="relative xl:h-[clamp(80.77px,5.61vw,107.69px)] xl:leading-[clamp(80.77px,5.61vw,107.69px)] xl:left-[clamp(40px,120px-4.167vw,60px)] text-center">
								<Image
									src="/ticket/background-time.svg"
									alt="bg"
									fill
									// ИСПРАВЛЕНО: -z-10 (убрали на задний план)
									className="z-10 object-fill"
								/>
								<span className="relative z-10">13:12</span>
							</div>

							{/* Колонка 2: Прибытие */}
							<div className="relative xl:h-[clamp(80.77px,5.61vw,107.69px)] xl:leading-[clamp(80.77px,5.61vw,107.69px)] xl:left-[clamp(-30px,250px-14.58vw,40px)] text-center">
								<Image
									src="/ticket/background-time.svg"
									alt="bg"
									fill
									// ИСПРАВЛЕНО: -z-10
									className="z-10 object-fill"
								/>
								<span className="relative z-10">12:00</span>
							</div>

							{/* Колонка 3: Отправление */}
							<div className="relative xl:left-[clamp(-80px,440px-27.08vw,50px)] xl:h-[clamp(80.77px,5.61vw,107.69px)] xl:leading-[clamp(80.77px,5.61vw,107.69px)] text-center">
								<Image
									src="/ticket/background-time.svg"
									alt="bg"
									fill
									// ИСПРАВЛЕНО: -z-10
									className="z-10 object-fill"
								/>
								<span className="relative z-10">12:30</span>
							</div>

							{/* Колонка 4: Час (Таймер) */}
							<div className="relative top-[-5px] xl:left-[clamp(-164px,572px-38.33vw,20px)] xl:h-[clamp(80.77px,5.61vw,107.69px)] xl:leading-[clamp(80.77px,5.61vw,107.69px)] text-center">
								<Image
									src="/ticket/background-time.svg"
									alt="bg"
									fill
									// ИСПРАВЛЕНО: -z-10
									className="z-10 object-fill"
								/>
								<span className="relative z-10">
                  <DigitalClock />
                </span>
							</div>

						</div>

						{/* 2. БЕГУЩАЯ СТРОКА (Внизу табло) */}
						<div className="absolute bottom-[14%] xl:bottom-[clamp(45px,19.1vw-230px,136px)] left-[10%] right-[20%] h-[20%] flex items-center">
							<Image
								src="/ticket/background-long-time.svg"
								alt="bg"
								fill
								// ИСПРАВЛЕНО: -z-10. Теперь фон точно сзади.
								className="z-10 object-fill"
							/>
							<RunningLine
								text="З ДНЕМ НАРОДЖЕННЯ, БАТЬКО!"
								count={4} // Для Ticket достаточно 4
								// 1. Стили контейнера (z-index, relative, без фона)
								className="relative z-20"
								// 2. Стили текста (Желтый, Krapka, отступы mx-4)
								textClassName="mx-4 font-krapka text-[32px] text-[#EEDC27] whitespace-nowrap"
							/>
						</div>

					</div>
				</div>

				{/* --- БИЛЕТЫ --- */}
				<div className="relative w-full flex flex-col items-center gap-[40px] px-4 pb-20">
					{TICKETS.map((ticket) => (
						<div
							key={ticket.id}
							className={clsx(
								// Базовые стили
								'group relative w-full max-w-[clamp(300px,80vw,1000px)] transition-transform duration-500 hover:scale-[1.02]',
							)}
						>

							{/* --- ФОН БИЛЕТА --- */}
							<div className="relative w-full h-auto drop-shadow-2xl">
								<Image
									src={ticket.path}
									alt={ticket.alt}
									width={1000}
									height={400}
									className="w-full h-auto"
								/>
							</div>

							{/* --- КОНТЕНТ ПОВЕРХ БИЛЕТА --- */}
							{/* absolute inset-0 позволяет накладывать элементы поверх картинки */}
							<div className="absolute inset-0 pointer-events-none">

								{/* Позиционирование Бейджа.
								 right-[12%]: Смещаем в правую часть (отрывной талон).
								 top-1/2 -translate-y-1/2: Центрируем вертикально.
								 pointer-events-auto: Возвращаем кликабельность бейджу (важно для hover)
								 */}
								<div className={classNames('absolute pointer-events-auto', ticket.badgePosition)}>
									<TicketBadge
										popImage={ticket.popImage}
										bgColor={ticket.bgColor}
										text={ticket.runningText}
									/>
								</div>

								{/* Здесь может быть остальной текст (Локация, Дата) из предыдущих шагов */}
								{/* <div className="absolute top-[20%] left-[5%] ...">...</div> */}

							</div>

						</div>
					))}
				</div>

			</section>
		</div>
	);
};