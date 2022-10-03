export const dateFormatter = (dateStr: string) => {
	const date = new Date(dateStr);
	if (!(date instanceof Date) || isNaN(date)) return '';
	const formattedDate = new Intl.DateTimeFormat('en-GB', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: 'numeric',
		dayPeriod: 'short',
		hour12: true
	}).format(date);
	return formattedDate;
};
