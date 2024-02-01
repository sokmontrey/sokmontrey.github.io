export function getRootColor(color_name) {
	return getComputedStyle(document.documentElement).getPropertyValue(
		color_name,
	);
}
