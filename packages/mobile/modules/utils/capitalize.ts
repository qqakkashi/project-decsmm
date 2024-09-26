export const capitalize = (string: string, all: boolean = false) => {
	if (all) {
		return string
			.split(' ')
			.map((word: string) => {
				return word.charAt(0).toUpperCase() + word.slice(1);
			})
			.join(' ');
	}
	return string.charAt(0).toUpperCase() + string.slice(1);
};
