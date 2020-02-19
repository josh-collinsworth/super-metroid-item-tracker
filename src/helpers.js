export const sluggify = (str) => {
	if (!str) return ''
	return str.toLowerCase().replace(' ', '-')
}

export const camelCaseify = (str) => {
	if (!str) return ''
	str = str.replace(/[-_\s.]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')
	return str.substr(0, 1).toLowerCase() + str.substr(1)
}
