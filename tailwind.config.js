/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/**/*.{js,jsx,ts,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		screens: {
			xl: '1440',
			'2xl': '1920',
			'3xl': '2000',
		},
		container: {
			center: true,
		},
		extend: {
			keyframes: {
				sway: {
					'0%, 100%': { transform: 'rotate(-3deg)' }, // Увеличил угол для наглядности
					'50%': { transform: 'rotate(3deg)' },
				},
				scroll: {
					from: { transform: 'translate3d(0, 0, 0)' },
					to: { transform: 'translate3d(-50%, 0, 0)' }, // Сдвигаем на 50%, так как у нас 2 набора текста
				},
				'marquee-infinite': {
					'0%': { transform: 'translateX(0%)' },
					'100%': { transform: 'translateX(-50%)' }, // <-- ВАЖНО: двигаем только на 50%
				},
				'marquee-digital': {
					'0%': { transform: 'translateX(0%)' }, // Старт
					'100%': { transform: 'translateX(-100%)' }, // Конец (весь блок уехал влево)
				}
			},
			animation: {
				// Указываем фоллбек 3s, если переменная не пришла
				sway: 'sway var(--wind-duration, 3s) ease-in-out infinite',
				marquee: 'scroll 20s linear infinite',
				'marquee-digital': 'marquee-digital 10s linear infinite',
				'marquee-infinite': 'marquee-infinite 20s linear infinite',
			},
			fontFamily: {
				manrope: ['var(--font-manrope)', 'sans-serif'],
				inter: ['var(--font-inter)', 'sans-serif'],
				karpaty: ['var(--font-kar)', 'sans-serif'],
				poppins: ['var(--font-poppins)', 'sans-serif'],
				eukraine: ['var(--font-eukraine)', 'sans-serif'],
				quietism: ['var(--font-quietism)', 'sans-serif'],
				krapka: ['var(--font-krapka)', 'sans-serif'],
			},
			colors: {
				background: '#1A1A1A',
				black: '#000',
				white: '#fff',
			},
		},
	},
	plugins: [],
};
