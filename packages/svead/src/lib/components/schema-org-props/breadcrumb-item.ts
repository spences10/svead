/**
 * Represents a single breadcrumb in a breadcrumb trail.
 * Breadcrumbs are typically used in website navigation to indicate
 * the current page's location within a navigational hierarchy.
 */
export interface BreadcrumbItem {
	/**
	 * The display name of the breadcrumb item.
	 * This is usually the title of the page the breadcrumb links to.
	 */
	name: string;

	/**
	 * The URL associated with the breadcrumb item.
	 * This should link to the page that the breadcrumb item represents.
	 */
	url: string;
}
