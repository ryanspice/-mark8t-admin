import { browser } from '$app/environment';

export const csr = true;
export const prerender = true;
export const ssr = true;

// use sessions storage to ensure that Tenant has been loaded before rendering the page but not to call the server on subsuquent page loads
export async function load() {
	if (browser) {

		const Core = (await import('@mark8t/core')).default;
		const Admin = (await import('../../lib/+Admin.svelte')).default;
		const Modules = (await import('../../lib/modules/index')).default;
		return {
			props: {
				Core: Core,
				Admin: Admin,
				Modules: Modules,
				Tenant: await Core.Services.Tenant.getLatestModified()
			}
		};
	}
}