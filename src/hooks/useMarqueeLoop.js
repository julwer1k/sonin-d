import { useState, useEffect, useRef, useMemo } from 'react';

/**
 * Хук для створення безшовної текстової петлі
 * @param {string} text - Текст для анімації
 * @param {number} pathLength - Довжина шляху (периметр) в пікселях
 * @param {string} fontClass - Класи шрифту для точного вимірювання
 */
export const useMarqueeLoop = (text, pathLength, fontClass = '') => {
	const measureRef = useRef(null);
	const [metrics, setMetrics] = useState({
		finalText: text, // Початковий стан (без повторень)
		duration: 0,
		isReady: false,
	});

	// Базова одиниця з роздільником
	const unitText = `${text} \u00A0•\u00A0 `;

	useEffect(() => {
		if (!measureRef.current) return;

		// 1. Вимірюємо ширину ОДНОГО блоку тексту
		const width = measureRef.current.offsetWidth;

		if (width === 0) return;

		// 2. Розраховуємо, скільки разів треба повторити, щоб заповнити шлях
		// + 2 запасних рази, щоб не було дірок під час руху
		const requiredRepeats = Math.ceil(pathLength / width) + 2;

		// 3. Формуємо фінальний рядок
		const finalText = unitText.repeat(requiredRepeats);

		// 4. Розраховуємо час анімації (швидкість має бути постійною)
		// Наприклад, 50 пікселів за секунду
		const speedPxPerSec = 50;
		const duration = width / speedPxPerSec;

		setMetrics({
			finalText,
			duration,
			unitWidth: width,
			isReady: true,
		});
	}, [text, pathLength, unitText]);

	return {
		measureRef,
		unitText, // Текст для вимірювального блоку
		...metrics
	};
};