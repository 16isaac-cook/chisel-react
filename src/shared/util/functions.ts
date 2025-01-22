//string formatter for file names
export const formatString = (
	string: string,
	lower = true,
	hyphen = false
): string => {
	let newString = string.trim();

	if (hyphen) {
		newString = newString.replaceAll(" ", "-");
	} else {
		newString = newString.replaceAll(" ", "");
	}

	newString = newString
		.replaceAll("\\", "")
		.replaceAll("/", "")
		.replaceAll(":", "_")
		.replaceAll("*", "")
		.replaceAll('"', "")
		.replaceAll("<", "")
		.replaceAll(">", "")
		.replaceAll("|", "")
		.replaceAll(",", "")
		.replaceAll("(", "")
		.replaceAll(")", "")
		.replaceAll("'", "")
		.replaceAll("`", "")
		.replaceAll("~", "")
		.replaceAll("!", "")
		.replaceAll("@", "")
		.replaceAll("#", "")
		.replaceAll("$", "")
		.replaceAll("%", "")
		.replaceAll("^", "")
		.replaceAll("&", "")
		.replaceAll("*", "")
		.replaceAll("+", "")
		.replaceAll("=", "")
		.replaceAll(".", "-");

	if (lower) {
		newString = newString.toLowerCase();
	}

	return newString;
};

export const getDate = (): string => {
	const now = new Date();
	const pad = (num: number) => String(num).padStart(2, "0");

	const month = pad(now.getMonth() + 1);
	const day = pad(now.getDate());
	const year = now.getFullYear();
	const hours = pad(now.getHours());
	const minutes = pad(now.getMinutes());
	const seconds = pad(now.getSeconds());

	return `${month}/${day}/${year}-${hours}:${minutes}:${seconds}`;
};
