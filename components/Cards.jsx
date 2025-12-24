import { CardItem } from './CardItem';

export const Cards = [
	{
		id: '1',
		name: 'СТАРШИЙ СИН',
		years: '#2004',
		colors: { tagBg: '#CFE9FF', tagText: '#0B0B0B' },
		text: 'Бажаю щастя',
		photo: '/family/son1.webp',
		position: 'xl:top-[clamp(620px,43.06vw,810px)] 2xl:top-[clamp(810px,90vw,860px)] left-[5%] z-10',
	},
	{
		id: '2',
		name: 'МЕНШИЙ СИН',
		years: '#2006',
		colors: { tagBg: '#FFD700', tagText: '#0B0B0B' },
		text: 'Успіхів у всьому',
		photo: '/family/son2.webp',
		position: 'xl:top-[clamp(660px,45.83vw,880px)]  2xl:top-[clamp(880px,61.11vw,890px)] left-[30%] z-20',
	},
	{
		id: '3',
		name: 'КОХАНА',
		years: '#1978',
		colors: { tagBg: '#FFB6C1', tagText: '#0B0B0B' },
		text: 'Любові',
		photo: '/family/wife.webp',
		position: 'xl:top-[clamp(650px,45.14vw,870px)] 2xl:top-[clamp(870px,60.42vw,900px)] left-[55%] z-30',
	},
	{
		id: '4',
		name: 'УЛЮБЛЕНЕЦЬ',
		years: '#2017',
		colors: { tagBg: '#97c264', tagText: '#0B0B0B' },
		text: 'Сімейного благополуччя',
		photo: '/family/dog.webp',
		position: 'xl:top-[clamp(600px,41.67vw,810px)] 2xl:top-[clamp(810px,56.25vw,840px)] left-[80%] z-30',
	},
];

export function CardsGrid() {
	return (
		<div className="absolute inset-0 z-[5] pointer-events-none w-full h-full overflow-hidden">
			{Cards.map((c, index) => {
				const duration = 2.5 + ((index * 1.7) % 3);
				const delay = -((index * 2.3) % 5);
				const pinRotation = Math.sin(index + 1) * 15;

				return (
					<CardItem
						key={c.id}
						{...c}
						// ВАЖНОЕ ИСПРАВЛЕНИЕ:
						// 1. absolute: Делаем саму обертку карточки абсолютной
						// 2. pointer-events-auto: Возвращаем кликабельность (так как родитель none)
						// 3. c.position: Подключаем твои классы координат (top/left/z-index)
						className={`absolute pointer-events-auto ${c.position}`}

						windParams={{
							duration: `${duration.toFixed(2)}s`,
							delay: `${delay.toFixed(2)}s`
						}}
						pinRotation={pinRotation.toFixed(1)}
					/>
				);
			})}
		</div>
	);
}