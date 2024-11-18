export function formatTitle(str: string) {
	let result = str[0].toUpperCase();
	result += str.slice(1);
	result = result.replace("_", " ");
	return result;
}
