import { PUBLIC_BASE_URL, PUBLIC_NODE_ENV } from '$env/static/public';

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

export const urlToStatically = (url: string, options?: {
	h: number,
	w: number,
	f: 'auto',
	q: number
}) => {
	if (PUBLIC_NODE_ENV !== 'production') {
		return url;
	}
	let urlToConvert = url;
	if (url.startsWith('/')) {
		urlToConvert = PUBLIC_BASE_URL + url;
	}
	const { hostname, pathname } = new URL(urlToConvert);

	let optionsString = '/';
	if (options?.h) optionsString += `h=${options.h}`;
	if (options?.w) optionsString += `w=${options.w}`;
	if (options?.f) optionsString += `f=${options.f}`;
	if (options?.q) optionsString += `q=${options.q}`;

	if (optionsString = '//') optionsString = '';
	return `https://cdn.statically.io/img/${hostname}${pathname}`
}