import type { AuthorType, MainEntity } from '$lib/types.js';

/**
 * Represents a single breadcrumb in a breadcrumb trail.
 */
export interface BreadcrumbItem {
	/** Name of the breadcrumb. */
	name: string;

	/** URL of the breadcrumb. */
	url: string;
}

/**
 * Properties for the SchemaOrg component.
 */
export interface SchemaOrgProps {
	/** The full URL of the current page. */
	url: string;

	/** Title of the page. */
	title: string;

	/** A brief description of the page's content. */
	description: string;

	/** Optional | Website URL. */
	website?: string;

	/** Optional | Author name. */
	authorName?: string;

	/** Optional | Type of the author (Person or Organization). */
	authorType?: AuthorType;

	/** Optional | URL of the author's webpage. */
	authorUrl?: string;

	/** Optional | URL of an image representing the entity. */
	image?: string;

	/** Optional | Name of the publisher. */
	publisherName?: string;

	/** Optional | URL of the publisher. */
	publisherUrl?: string;

	/** Optional | Logo of the publisher. */
	publisherLogo?: string;

	/** Optional | Date when the entity was first published in ISO 8601 format. */
	datePublished?: string;

	/** Optional | Date when the entity was last modified in ISO 8601 format. */
	dateModified?: string;

	/** Optional | Language of the content. */
	language?: string;

	/** Main entity of the page, including details for structured data and SEO. */
	mainEntity: MainEntity;

	/** Optional | Array of breadcrumb items. */
	breadcrumbs?: BreadcrumbItem[];
}
