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
			xs: '320',
			s: '390',
			sm: '640px',
		},
		container: {
			center: true,
		},
		extend: {
			fontFamily: {
				manrope: ['var(--font-manrope)', 'sans-serif'],
				druk: ['var(--font-druk)', 'sans-serif'],
				inter: ['var(--font-inter)', 'sans-serif'],
				poppins: ['var(--font-poppins)', 'sans-serif'],
				eukraine: ['var(--font-eukraine)', 'sans-serif'],
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
