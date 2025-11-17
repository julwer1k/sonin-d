import React from 'react';

export function useIsMobile(breakpointPx = 900) {
	const [isMobile, setIsMobile] = React.useState(null);

	React.useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${breakpointPx - 0.02}px)`);
		const onChange = () => setIsMobile(mql.matches);
		onChange();
		mql.addEventListener?.('change', onChange);
		return () => mql.removeEventListener?.('change', onChange);
	}, [breakpointPx]);

	return isMobile; // true / false / null до маунта
}

// фильтруем blocks по visibleOn
export function filterBlocksByMode(blocks, mode /* 'mobile' | 'desktop' */) {
	if (!Array.isArray(blocks)) return [];
	return blocks.map(b => ({
		...b,
		lines: (b.lines || []).map(l => ({
			...l,
			segments: (l.segments || []).filter(seg => {
				const v = seg.visibleOn;
				if (!v || v.length === 0) return true; // нет флага — видим везде
				return v.includes(mode);
			}),
		})),
	}));
}