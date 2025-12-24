'use client';

import Image from 'next/image';
import React from 'react';

export const Hero = () => {
	return (
		// 1. РОДИТЕЛЬСКИЙ КОНТЕЙНЕР
		// Делаем его flex-col, чтобы "НАШ МИЛИЙ" и "ТАТО" встали в колонку по центру.
		// bg-[#F9FDEC] нужен как база, если градиент не загрузится, но он перекроется.
		<div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[linear-gradient(180deg,#FFFFFF_0%,#F9FDEC_100%)]">

			{/* --- СЛОЙ ФОНА (Градиент) ---
			 Лежит абсолютно позади всех (-z-10).
			 Прямой сосед текста.
			 */}
			<div className="absolute inset-0 -z-10 " />

			{/* --- СЛОЙ КАРТИНКИ ---
			 Лежит абсолютно справа (-z-10).
			 Прямой сосед текста и фона.
			 */}
			<div className="absolute top-0 right-0 w-1/2 h-full z-10">
				<Image
					src="/hero/background.webp" // Твой путь к фото
					alt="Hero Father"
					fill
					priority
					className="object-cover object-center"
					sizes="50vw"
				/>
			</div>

			{/* --- ТЕКСТ (ГЛАВНЫЙ) ---
			 Никаких оберток. Прямые дети флекс-контейнера.
			 mix-blend-exclusion работает идеально, так как под ним сразу лежат div с фоном и div с картинкой.
			 leading-none и text-center для выравнивания.
			 */}
			<h1 className="relative z-10 font-karpaty text-[clamp(60px,8vw,150px)] text-white mix-blend-exclusion leading-none text-center pointer-events-none">
				НАШ МИЛИЙ
			</h1>

			<p className="relative z-10 font-karpaty text-[clamp(80px,10vw,200px)] text-white mix-blend-exclusion leading-none text-center pointer-events-none">
				ТАТО
			</p>

			<p className="absolute self-start top-[46%] z-10 font-eukraine font-medium text-[20px] text-[#2F2F2F] leading-none pointer-events-none">КРАЩИЙ ТАТО &</p>
			<p className="absolute self-start top-[48%] mt-1 z-10 font-eukraine font-medium text-[20px] text-[#2F2F2F] leading-none pointer-events-none">НАСТАВНИК У ЖИТТІ</p>

			{/* --- НИЖНИЕ ДАТЫ ---
			 Абсолютно снизу. Тоже с blend-mode, если нужно.
			 */}
			<div className="absolute bottom-[clamp(20px,2.5vw,40px)] w-full px-[clamp(20px,2.5vw,30px)] z-10 flex justify-between items-end pointer-events-none">
        <span className="font-eukraine font-bold text-[clamp(16px,1.5vw,24px)] text-[#2F2F2F]">
          31.12
        </span>
				<span className="font-eukraine font-bold text-[clamp(16px,1.5vw,24px)] text-[#2F2F2F] ">
          1975
        </span>
			</div>

		</div>
	);
};