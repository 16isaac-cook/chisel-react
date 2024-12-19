//string formatter for file names
const formatString = (string: string, lower = true, hyphen = false) => {
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
