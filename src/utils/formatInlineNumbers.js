// utils/formatInlineNumbers.js
export function formatInlineNumbers(str, locale = 'uk-UA') {
	if (typeof str !== 'string') return str;

	// Знаходимо числа (групи тисяч + опційна десяткова частина)
	const re = /(?:\d{1,3}(?:[ \u00A0,._]\d{3})+|\d+)(?:[.,]\d+)?/g;

	return str.replace(re, (raw) => {
		const hasComma = raw.includes(',');
		const hasDot = raw.includes('.');

		let normalized = raw;

		if (hasComma && !hasDot) {
			// Є тільки кома. Вирішуємо: це тисячний роздільник чи десятковий?
			// Приклад тисяч: "10,000", "1,234,567" -> після останньої коми рівно 3 цифри
			const parts = raw.split(',');
			const last = parts[parts.length - 1];

			const looksLikeThousands =
				/^\d{3}$/.test(last) && parts.slice(0, -1).every(p => /^\d{1,3}$/.test(p));

			if (looksLikeThousands) {
				// Коми — тисячні роздільники: просто прибираємо все, що не цифри
				normalized = raw.replace(/\D/g, '');
			} else {
				// Кома — десятковий роздільник
				normalized = raw
					.replace(/[\s\u00A0._]/g, '') // прибираємо пробіли/НБП/підкреслення
					.replace(',', '.');           // конвертуємо кому в крапку
			}
		} else {
			// Випадки з крапкою (може бути і з комами) -> коми/пробіли як тисячні
			// Лишаємо єдину десяткову крапку
			normalized = raw.replace(/[\s\u00A0,._]/g, '');
		}

		const n = Number.parseFloat(normalized);
		if (Number.isNaN(n)) return raw;

		return n.toLocaleString(locale);
	});
}
