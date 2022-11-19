export interface Company {
	h: number;
	s: number;
	l: number;
	font: string;
	fontImport: string;
}
export const companies: Record<string, Company> = {
	traist: {
		h: 205,
		s: 81,
		l: 31,
		font: '',
		fontImport: ''
	},
	github: {
		h: 0,
		s: 0,
		l: 27,
		font: "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji'",
		fontImport: ''
	},
	vercel: {
		h: 0,
		s: 0,
		l: 27,
		font: 'Inter',
		fontImport: 'https://api.fonts.coollabs.io/css2?family=Inter:wght@400%3B600%3B700&display=swap'
	},
	box: {
		h: 213,
		s: 100,
		l: 42,
		font: 'Lato',
		fontImport: 'https://api.fonts.coollabs.io/css2?family=Lato&display=swap'
	},
	sorted: {
		h: 8,
		s: 51,
		l: 47,
		font: 'Urbanist',
		fontImport:
			'https://api.fonts.coollabs.io/css2?family=Urbanist:wght@400%3B600%3B700%3B900&display=swap'
	},
	spotify: {
		h: 141,
		s: 73,
		l: 42,
		font: 'Montserrat',
		fontImport: 'https://api.fonts.coollabs.io/css2?family=Montserrat&display=swap'
	},
	nexthink: {
		h: 230,
		s: 75,
		l: 27,
		font: '"proxima-nova",arial,sans-serif',
		fontImport: ''
	},
	victorinox: {
		h: 342,
		s: 100,
		l: 35,
		font: 'Helvetica,arial,sans-serif',
		fontImport: ''
	},
	siemens: {
		h: 180,
		s: 100,
		l: 30,
		font: 'arial,sans-serif',
		fontImport: ''
	}
};
