'use client';

import classNames from 'classnames';
import { motion } from 'framer-motion';

export default function ParallaxButton({ label, onHoverChange, videoActive }) {
	return (
		<motion.button
			type="button"
			onHoverStart={() => onHoverChange?.(true)}
			onHoverEnd={() => onHoverChange?.(false)}
			onFocus={() => onHoverChange?.(true)}
			onBlur={() => onHoverChange?.(false)}
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.96 }}
			transition={{ type: 'spring', stiffness: 500, damping: 30 }}
			className={classNames(
				`rounded-full border border-[#F6F6F6] text-white font-manrope font-medium  hover:bg-white hover:text-black transition-colors 
					xs:px-[clamp(15px,4.69vw,19px)]
					s:px-[clamp(19px,4.87vw,30px)]
					
					xs:py-[clamp(2px,0.63vw,3px)]
					s:py-[clamp(3px,0.77vw,4px)]
					
					xs:min-h-[clamp(28px,8.75vw,35px)]
					s:min-h-[clamp(35px,8.97vw,56px)]

					xs:min-w-[clamp(86px,26.88vw,105px)]
					s:min-w-[clamp(105px,26.92vw,172px)]
					
					xs:text-[clamp(6px,1.88vw,7px)]
					s:text-[clamp(7px,1.79vw,12px)]`,
				videoActive && 'opacity-100',
			)}
		>
			{label}
		</motion.button>
	);
}
