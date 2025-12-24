'use client';

import Image from 'next/image';
import classNames from 'classnames';

const STYLES = {

	wrapper: 'absolute w-[clamp(270px,18.75vw,360px)]',

	cardInner: 'origin-top w-full h-full',
	topBox: 'bg-[#EBEBEB] rounded-b-[clamp(10px,0.69vw,13px)] px-[clamp(11.25px,0.78vw,15px)] py-[clamp(15px,1.04vw,20px)]',
	imgContainer: 'relative w-full h-[clamp(277.5px,19.27vw,370px)] overflow-hidden',
	bottomBox: 'relative bg-[#EBEBEB] h-[clamp(75px,5.21vw,100px)] rounded-t-[clamp(15px,1.04vw,20px)] px-[clamp(11.25px,0.78vw,15px)] py-[clamp(11.25px,0.78vw,15px)]',
	textBox: 'flex items-end justify-between gap-3 font-karpaty text-[#2F2F2F] uppercase xl:text-[clamp(21px,1.46vw,28px)] leading-none',
	tagBox: 'relative inline-block',
	tagBg: 'absolute left-[-6px] right-[-6px] top-1/2 h-[1.4em] -translate-y-1/2 rounded-[4px]',
	tagText: 'relative font-eukraine xl:text-[clamp(13px,0.9vw,17px)] text-[#2F2F2F]',
};

export function CardItem({
	name,
	years,
	colors,
	text,
	photo,
	className = '', // Сюда теперь прилетит 'absolute pointer-events-auto top-[...]'
	windParams,
	pinRotation = 0,
}) {
	const tagBgColor = colors?.tagBg ?? '#ec6927';

	const windStyle = {
		'--wind-duration': windParams?.duration ?? '3s',
		'--wind-delay': windParams?.delay ?? '0s',
	};

	return (
		// className применяется к внешнему контейнеру -> он позиционирует карточку на экране
		<div className={classNames(STYLES.wrapper, className)}>

			{/* Прищепка */}
			<div
				className=" absolute -top-[60px] left-1/2 z-20 w-auto h-auto"
				style={{
					transform: `translateX(-50%) rotate(${pinRotation}deg)`
				}}
			>
				{/* Используем w-auto/h-auto на контейнере, но задаем размеры изображению или наоборот.
				 Лучше задать явную ширину контейнеру для стабильности. */}
				<div className="w-[21px] h-auto">
					<Image
						src="/family/clothespin.webp"
						alt="pin"
						width={21}
						height={87}
						className="w-full h-auto object-contain "
					/>
				</div>
			</div>

			{/* Тело карточки с анимацией */}
			<article
				className={classNames(STYLES.cardInner, 'animate-sway will-change-transform')}
				style={windStyle}
			>
				{/* ... контент карточки без изменений ... */}
				<div className={STYLES.topBox}>
					<div className={STYLES.imgContainer}>
						<Image
							src={photo}
							alt={name || 'Card Image'}
							fill
							sizes="(min-width: 1280px) 360px, 270px"
							className="object-cover object-center transition-transform duration-700 hover:scale-105"
						/>
					</div>
				</div>

				<div className={STYLES.bottomBox}>
					<CornerBrackets />
					<div className="py-[8px] px-[20px] flex flex-col gap-[8px] xl:gap-[clamp(10px,0.69vw,16px)]">
						<div className={STYLES.textBox}>
							<p>{name}</p>
							<p>{years}</p>
						</div>
						<div className="relative w-max max-w-full mx-auto">
          <span className={STYLES.tagBox}>
            <span
	            aria-hidden
	            className={STYLES.tagBg}
	            style={{ backgroundColor: tagBgColor }}
            />
            <span className={STYLES.tagText}>{text}</span>
          </span>
						</div>
					</div>
				</div>
			</article>
		</div>
	);
}

function CornerBrackets() {
	const common = "absolute bg-[#878384] pointer-events-none";
	const hLine = "h-[2px] w-[clamp(9px,0.63vw,12px)]";
	const vLine = "w-[2px] h-[clamp(9px,0.63vw,12px)]";
	const inset = "inset-[clamp(11.25px,0.78vw,15px)]";

	return (
		<div className={`absolute ${inset} pointer-events-none`}>
			<span className={`${common} ${hLine} top-0 left-0`} />
			<span className={`${common} ${vLine} top-0 left-0`} />
			<span className={`${common} ${hLine} top-0 right-0`} />
			<span className={`${common} ${vLine} top-0 right-0`} />
			<span className={`${common} ${hLine} bottom-0 left-0`} />
			<span className={`${common} ${vLine} bottom-0 left-0`} />
			<span className={`${common} ${hLine} bottom-0 right-0`} />
			<span className={`${common} ${vLine} bottom-0 right-0`} />
		</div>
	);
}