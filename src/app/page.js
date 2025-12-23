import Family from '@components/Family';
import { Footer } from '@components/layout/Footer';
import { Greeting } from '@components/section/Greeting';
import { Hero } from '@components/section/Hero';
import { Memory } from '@components/section/Memory';
import { Ticket } from '@components/section/Ticket';
import React from 'react';
import Image from 'next/image';


export default function Home() {
	return (
		<main className="min-h-screen w-full">
			<div className="relative z-10 w-full bg-[#9CC5FD] shadow-2xl">
				<Hero />
				<Greeting />
				<Memory />
				<div className="relative w-full xl:h-[clamp(232px,16.11vw,314px)]">
					<Image
						src="/separator.png"
						alt="Separator"
						fill
						className="object-cover"
					/>
				</div>

				<Ticket />
				<Family />

			</div>

			<Footer />

		</main>
	);
}