'use client';

import classNames from 'classnames';
import { motion } from 'framer-motion';

export default function ParallaxButton({ label, onHoverChange, isActive, classnames }) {
	return (
		<motion.button
			type="button"
			onHoverStart={() => onHoverChange(true)} // ParallaxContainer уже обернул это, передавая медиа объект
			onHoverEnd={() => onHoverChange(false)}
			onFocus={() => onHoverChange(true)}
			onBlur={() => onHoverChange(false)}
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.96 }}
			transition={{ type: 'spring', stiffness: 500, damping: 30 }}
			className={classNames(
				`rounded-[48px] border border-[#2F2F2F] text-[#2F2F2F] font-eukraine font-medium  hover:bg-white hover:text-[#2F2F2F] transition-colors 
	      xl:py-[12px]
	      xl:px-[clamp(3px,0.21vw,4px)]
	      xl:min-h-[clamp(42px,2.92vw,56px)]
	      xl:min-w-[clamp(130px,9.03vw,172px)]
	      xl:text-[clamp(9px,0.63vw,12px)]`,
				classnames,
				isActive && 'opacity-100 ', // Пример стилизации активной кнопки
			)}
		>
			{label}
		</motion.button>
	);
}