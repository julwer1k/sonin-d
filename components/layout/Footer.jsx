'use client';

import Image from 'next/image';

export function Footer() {
	return (
		// 1. sticky bottom-0: Приклеиваем к НИЗУ вьюпорта
		// 2. h-screen: Занимает весь экран
		// 3. -z-10: Уходит на задний план. Это самое важное.
		<footer className="sticky bottom-0 w-full h-screen -z-10 overflow-hidden">

			{/* ФОНОВАЯ КАРТИНКА */}
			<div className="absolute inset-0 w-full h-full">
				<Image
					src="/footer/footer-bg.jpg"
					alt="Footer Background"
					fill
					className="object-cover object-center"
					priority
				/>
			</div>
		</footer>
	);
}