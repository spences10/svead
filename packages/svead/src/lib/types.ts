import type { MainEntityType } from './main-entity-types.js';

export type AuthorType = 'Person' | 'Organization';

/**
 * Common properties for all entities.
 */
interface CommonEntity {
	/** The name of the entity. */
	name: string;
	/** The URL of the entity. */
	url: string;
	/** A headline for the entity. */
	headline: string;
	/** A brief description of the entity. */
	description: string;
	/** URL of an image representing the entity. */
	image: string;
	/**
	 * Date when the entity was first published
	 * in ISO 8601 format (e.g., 2021-03-10 or 2021-03-10T15:05:01Z).
	 */
	datePublished: string;
	/**
	 * Date when the entity was last modified
	 * in ISO 8601 format (e.g., 2021-03-10 or 2021-03-10T15:05:01Z).
	 */
	dateModified: string;
}

/**
 * Represents an author of the content.
 */
export interface AuthorEntity {
	/** Type of author (Person or Organization). */
	'@type': AuthorType;
	/** Name of the author. */
	name: string;
	/** URL of the author's webpage. */
	url: string;
}

/**
 * Represents the publisher of the content.
 */
export interface PublisherEntity {
	/** Type of publisher, always 'Organization'. */
	'@type': 'Organization';
	/** Name of the organization. */
	name: string;
	/** URL to the logo of the organization. */
	logo: string;
	/** Optional URL of the organization. */
	url?: string;
}

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
 * The main entity of a web page, including details for 
 * structured data and SEO.
 */
export interface MainEntity extends CommonEntity {
	/** Specific type of the main entity. */
	'@type': MainEntityType;
	/** The author of the content. */
	author: AuthorEntity;
	/** The publisher of the content. */
	publisher: PublisherEntity;
	/** Breadcrumb list for the content. */
	breadcrumb?: {
		/** Type of breadcrumb list. */
		'@type': 'BreadcrumbList';
		/** Elements of the breadcrumb list. */
		itemListElement: {
			/** Type of list item. */
			'@type': 'ListItem';
			/** Position of the breadcrumb in the trail. */
			position: number;
			/** The breadcrumb item. */
			item: BreadcrumbItem;
		}[];
	};
}

/**
 * Represents the main entity of a web page in JSON-LD format.
 */
export interface JsonLdMainEntity extends MainEntity {
	/** Context of the JSON-LD data. */
	'@context': string;
	/** Specific type of the main entity. */
	'@type': MainEntityType;
	/** Language of the content. */
	inLanguage?: string;
	/** Breadcrumb list for the content. */
	breadcrumb?: {
		/** Type of breadcrumb list. */
		'@type': 'BreadcrumbList';
		/** Elements of the breadcrumb list. */
		itemListElement: {
			/** Type of list item. */
			'@type': 'ListItem';
			/** Position of the breadcrumb in the trail. */
			position: number;
			/** The breadcrumb item. */
			item: BreadcrumbItem;
		}[];
	};
	/** Main entity of the page identifier. */
	mainEntityOfPage?: {
		/** Type of the main entity of the page. */
		'@type': string;
		/** Unique identifier of the main entity. */
		'@id': string;
	};
}

/**
 * SEO configuration options for a web page.
 */
export interface SeoConfig {
	/**
	 * Required | The title of the page.
	 * Recommended to be between 50-60 characters for optimal SEO performance.
	 */
	title: string;
	/**
	 * Required | A brief description of the page's content.
	 * Recommended to be between 150-160 characters for optimal SEO performance.
	 */
	description: string;
	/** Required | The full URL of the current page. */
	url: string;
	/** Optional | The language for SchemaOrg */
	language?: string | 'en';
	/**
	 * Optional | Open Graph image URL. The image should
	 * ideally be at least 1200 x 627 pixels for best display
	 * on high-resolution devices.
	 */
	image?: string;
	/** Optional | website URL. */
	website?: string;
	/** Optional | author name. */
	author_name?: string;
	/** Optional | Type of the author (Person or Organization). */
	author_type?: AuthorType;
	/** Optional | Web Monetisation payment pointer. */
	payment_pointer?: string;
	/**
	 * Optional | array of breadcrumb items.
	 * Breadcrumbs help with site navigation and SEO.
	 * The datePublished and dateModified properties
	 * of each breadcrumb item should be in ISO 8601 format.
	 */
	breadcrumbs?: BreadcrumbItem[];
	/**
	 * Optional | Main entity of the page. This is used for
	 * structured data and SEO. It should be one of the specific
	 * types extended from MainEntity. The datePublished and
	 * dateModified properties should be in ISO 8601 format.
	 */
	main_entity?: MainEntity;
}
