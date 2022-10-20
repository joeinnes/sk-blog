import type { LayoutLoad } from './$types';
import { companies, type Company } from '$lib/companies';

export const load: LayoutLoad = async ({ url, params }) => {
	let company = url.pathname.substring(14);
	if (params.company) {
		company = params.company;
	}
	let thisCompany: Company;

	if (company && companies[company]) {
		thisCompany = companies[company];
	} else {
		thisCompany = companies['traist'];
	}

	return {
		company,
		...thisCompany
	};
};
