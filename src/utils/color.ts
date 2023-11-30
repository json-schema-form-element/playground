/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
// From: https://github.com/davidmarkclements/hsl_rgb_converter/blob/master/converter.js

export function hslToArgb([h, s, l]: [h: number, s: number, l: number]) {
	s /= 100;
	l /= 100;
	const k = (n: number) => (n + h / 30) % 12;
	const a = s * Math.min(l, 1 - l);
	const f = (n: number) =>
		l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
	const rgb = [255 * f(0), 255 * f(8), 255 * f(4)];

	return (
		((255 << 24) |
			((rgb[0] & 0x0ff) << 16) |
			((rgb[1] & 0x0ff) << 8) |
			(rgb[2] & 0x0ff)) >>>
		0
	);
}
