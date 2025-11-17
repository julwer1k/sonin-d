import { Footer } from '@components/layout/Footer';
import { Greeting } from '@components/section/Greeting';
import { Hero } from '@components/section/Hero';
import { Memory } from '@components/section/Memory';
import { Ticket } from '@components/section/Ticket';
import Tinder from '@components/section/Tinder';
import Image from 'next/image';
import React from 'react';

export default function Home() {
	return (
		<main className="flex flex-col bg-background sm:container w-full overflow-x-hidden">
			<Hero />
			<Greeting />
			<Tinder />
			<Ticket />
			<section className="relative overflow-hidden min-h-screen">
				<Image
					src="/grid.svg"
					alt="background image"
					width={320}
					height={4523}
					priority
					className="pointer-events-none
            absolute inset-0 z-[11]
            object-cover opacity-10 mix-blend-screen
            xs:w-[clamp(320px,100vw,390px)]
            s:w-[clamp(390px,100vw,640px)]
            xs:min-h-[clamp(878px,274.38vw,1070px)]
						s:min-h-[clamp(1070px,274.36vw,1752px)]"
				/>

				<div className="relative z-10">
					<Memory />
					<Footer />
				</div>

			</section>
		</main>
	);
}
