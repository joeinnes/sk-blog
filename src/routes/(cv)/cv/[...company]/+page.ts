import type { PageLoad } from './$types';
import { companies, type Company } from '$lib/companies';

export const load: PageLoad = async ({ params }) => {
  const { company } = params;
  let thisCompany: Company;

  if (company && companies[company]) {
    thisCompany = companies[company]
  } else {
    thisCompany = companies['traist'];
  }

  return {
    company,
    ...thisCompany
  }
}