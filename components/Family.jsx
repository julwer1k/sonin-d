import { CardsGrid } from '@components/Cards';
import { RunningLine } from '@components/section/RunningLine';
import Image from 'next/image';

export default function Family() {
	return (
		<section className="w-full bg-[#9CC5FD]">

			{/* ГЛАВНЫЙ БЛОК: Relative, чтобы высоту задавала картинка */}
			<div className="relative w-full">

				{/* 1. КАРТИНКА (В потоке)
				 Она задает высоту всему блоку.
				 Убрали z-index, он тут не нужен, картинка и так первая.
				 */}
				<Image
					src="/family/bg.webp"
					alt="Background"
					width={1920}
					height={1555}
					className="block w-full h-auto object-cover"
					priority
				/>

				{/* 2. СЛОЙ КОНТЕНТА (Оверлей)
				 УБРАЛИ z-[10] отсюда!
				 Это позволяет mix-blend-mode работать с картинкой под низом.
				 absolute inset-0 растягивает этот блок поверх картинки.
				 */}
				<div className="absolute inset-0 w-full h-full pointer-events-none">

					{/* ВНУТРЕННЯЯ СЕТКА
					 Добавляем flex flex-col justify-between СЮДА.
					 Это разнесет "[ СІМЕЙНИЙ АРХІВ ]" и нижний контент по краям высоты картинки.
					 */}
					<div className="w-full h-full xl:px-[20px] 2xl:px-[30px] xl:py-[clamp(48px,3.33vw,64px)]">

						{/* ВЕРХНИЙ ТЕКСТ
						 z-10 ставим точечно сюда, если нужно, но обычно и так работает.
						 Вернул цвет #EA935D, так как белый Exclusion часто не виден.
						 */}
						<div className="pointer-events-auto">
							<p className="font-eukraine font-bold text-[#EA935D] mix-blend-exclusion xl:text-[clamp(18px,1.25vw,24px)]">
								[ СІМЕЙНИЙ АРХІВ ]
							</p>
						</div>

						{/* НИЖНИЙ БЛОК КОНТЕНТА */}
						<div>
							<div className="relative pointer-events-none">
								<div className="pointer-events-auto text-[#2F2F2F]">
									<div className="flex items-center justify-between">
										<Image
											src="/family/text.svg"
											width={643}
											height={128}
											alt="Text"
											className="xl:w-[clamp(482px,33.47vw,643px)] xl:h-[clamp(96px,6.67vw,128px)]"
										/>
										<p className="font-eukraine font-medium xl:text-[clamp(16px,1.11vw,20px)] xl:max-w-[clamp(766px,53.19vw,1021px)] leading-[120%]">
											Сім’я Соніних — це унікальна колекція особистостей, де кожен елемент важливий. Але саме ти — основа нашого
											всесвіту. Маючи статус «Кращий Тато», ти отримуєш довічний доступ до нашої любові, підтримки та
											ексклюзивних сімейних пригод, які недоступні більше нікому в світі.
										</p>
									</div>

									<p className="flex justify-end font-karpaty xl:text-[clamp(75px,5.21vw,100px)] xl:leading-[100%] xl:mt-[clamp(40px,2.78vw,54px)]">
										ТВОЯ ЛЮБОВ ОБ'ЄДНУЄ НАС
									</p>
								</div>
							</div>

							{/* Финальная фраза в самом низу блока контента */}
							<p className="pointer-events-auto flex justify-end font-karpaty xl:text-[clamp(75px,5.21vw,100px)] mix-blend-soft-light text-white xl:leading-[100%] mt-4 opacity-70">
								В ОДНУ ВЕЛИКУ КОМАНДУ
							</p>
						</div>

					</div>

					{/* КАРТОЧКИ
					 Лежат поверх всего (так как идут последними в коде),
					 но внутри CardsGrid не забудь поставить pointer-events-none на контейнер,
					 чтобы клики проходили сквозь пустоту.
					 */}
					<CardsGrid />
				</div>
			</div>

			{/* СИНЯЯ ПОЛОСА
			 Встанет ровно под картинкой, так как у картинки h-auto (в потоке).
			 */}
			<div className="w-full bg-[#79AFFC] xl:h-[clamp(128px,8.89vw,170px)]">
				<RunningLine
					text="З ДНЕМ НАРОДЖЕННЯ"
					count={6} // Для Family было 6 повторений
					// 1. Стили контейнера (Синий фон)
					className="bg-[#79AFFC]"
					// 2. Стили текста (Белый, Karpaty, большие размеры + отступы)
					textClassName="font-karpaty text-white xl:text-[clamp(96px,6.67vw,128px)] whitespace-nowrap px-[clamp(10px,1vw,20px)] mx-[clamp(10px,1vw,20px)]"
				/>
			</div>

		</section>
	);
}