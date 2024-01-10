import type { MainEntityType } from './main-entity-types.js';

export type AuthorType = 'Person' | 'Organization';

/**
 * Defines common properties shared by various entities in the
 * context of SEO metadata.
 * These properties are used to describe general attributes of an
 * entity like a person, organization, or a webpage.
 */
interface CommonEntity {
	/**
	 * The name of the entity. This is generally displayed in search
	 * results and social media shares.
	 */
	name: string;

	/**
	 * The URL associated with the entity. It helps in identifying the
	 * entity's landing page or relevant link.
	 */
	url: string;

	/**
	 * A headline or title for the entity. This is typically used in
	 * search snippets or social media descriptions.
	 */
	headline: string;

	/**
	 * A short description of the entity. This summary can influence
	 * SEO and user engagement.
	 */
	description: string;

	/**
	 * URL of an image representing the entity. Used in visual previews
	 * on search engines and social media.
	 */
	image: string;

	/**
	 * The date when the entity was first published.
	 * This date is displayed in search results to indicate the
	 * original publication time.
	 * Format: ISO 8601 (e.g., 2021-03-10 or 2021-03-10T15:05:01Z).
	 */
	datePublished: string;

	/**
	 * The date when the entity was last modified.
	 * Helps users and search engines understand the freshness of the
	 * content.
	 * Format: ISO 8601 (e.g., 2021-03-10 or 2021-03-10T15:05:01Z).
	 */
	dateModified: string;
}

/**
 * Describes an author of the content, used in both Schema.org and
 * JSON-LD metadata.
 * This interface helps search engines and social media platforms
 * identify the author of a piece of content.
 */
export interface AuthorEntity {
	/**
	 * The type of author, which can be either a 'Person' or an
	 * 'Organization'.
	 */
	'@type': AuthorType;

	/**
	 * The name of the author. Displayed in authorship metadata.
	 */
	name: string;

	/**
	 * The URL of the author's webpage. Provides a link to the author's
	 *  profile or personal site.
	 */
	url: string;
}

/**
 * Details the publisher of the content, typically used in Schema.org
 * and JSON-LD metadata.
 * This information is important for search engines to identify the
 * organization responsible for publishing the content.
 */
export interface PublisherEntity {
	/**
	 * The type of publisher, which is always set to 'Organization' in
	 * this context.
	 */
	'@type': 'Organization';

	/**
	 * The name of the publishing organization. This name is displayed
	 * in search results and social shares.
	 */
	name: string;

	/** The URL to the logo of the publishing organization. Used in
	 * visual representations in search results and social shares.
	 */
	logo: string;

	/**
	 * An optional URL of the organization. Provides additional
	 * information about the publisher.
	 */
	url?: string;
}

/**
 * Represents a single breadcrumb in a breadcrumb trail.
 * Breadcrumbs are used for SEO to provide a clear path for users to
 * follow back to the home page of the site.
 */
export interface BreadcrumbItem {
	/**
	 * The name of the breadcrumb. Displayed in the breadcrumb trail on
	 * search engines and websites.
	 */
	name: string;

	/**
	 * The URL of the breadcrumb. Links back to the corresponding page
	 * in the breadcrumb trail.
	 */
	url: string;
}

/**
 * Describes the main entity of a web page, incorporating elements
 * essential for structured data and SEO.
 * This includes Schema.org and JSON-LD metadata which are vital for
 * search engines to understand the content's context.
 */
export interface MainEntity extends CommonEntity {
	/**
	 * The specific type of the main entity, as defined in
	 * MainEntityType. Helps in categorizing the content.
	 */
	'@type': MainEntityType;

	/**
	 * The author of the content. Provides authorship information to
	 * search engines and social media platforms.
	 */
	author: AuthorEntity;

	/**
	 * The publisher of the content. Indicates the entity responsible
	 * for publishing the content.
	 */
	publisher: PublisherEntity;

	/**
	 * An optional breadcrumb list for the content. Enhances site
	 * navigation and SEO through structured pathways.
	 */
	breadcrumb?: {
		/** The type of breadcrumb list, set as 'BreadcrumbList'. */
		'@type': 'BreadcrumbList';

		/**
		 * Elements of the breadcrumb list, each representing a step in
		 * the navigation path.
		 */
		itemListElement: {
			/**
			 * The type of each list item, set as 'ListItem'.
			 */
			'@type': 'ListItem';

			/**
			 * The position of the breadcrumb in the trail. Helps in
			 * structuring the breadcrumb navigation.
			 */
			position: number;

			/**
			 * The breadcrumb item detailing the name and URL of the
			 * breadcrumb.
			 */
			item: BreadcrumbItem;
		}[];
	};
}

/**
 * Extends the MainEntity interface for use in JSON-LD structured
 * data.
 * This interface is specifically tailored for JSON-LD formatting,
 * which is crucial for SEO and enhancing search engine
 * understanding of the page content.
 */
export interface JsonLdMainEntity extends MainEntity {
	/**
	 * The context of the JSON-LD data, typically set to
	 * 'https://schema.org'. This indicates the vocabulary used for the
	 * JSON-LD data.
	 */
	'@context': string;

	/**
	 * The specific type of the main entity, crucial for categorizing
	 * the content in a structured format.
	 */
	'@type': MainEntityType;

	/**
	 * The language of the content, important for regional SEO and user
	 * understanding.
	 */
	inLanguage?: string;

	/**
	 * An optional breadcrumb list for the content in JSON-LD format.
	 * Enhances navigability and context in search results.
	 */
	breadcrumb?: {
		/**
		 * The type of breadcrumb list, set as 'BreadcrumbList' in
		 * JSON-LD format.
		 */
		'@type': 'BreadcrumbList';

		/**
		 * Elements of the breadcrumb list, structured for JSON-LD.
		 */
		itemListElement: {
			/**
			 * The type of each list item, set as 'ListItem' in JSON-LD
			 * format.
			 */
			'@type': 'ListItem';

			/**
			 * The position of the breadcrumb in the trail, important for
			 * structuring the navigation path in JSON-LD.
			 */
			position: number;

			/**
			 * The breadcrumb item detailing the name and URL of the
			 * breadcrumb in JSON-LD format.
			 */
			item: BreadcrumbItem;
		}[];
	};

	/**
	 * An optional property to specify the main entity of the page
	 * identifier in JSON-LD format.
	 */
	mainEntityOfPage?: {
		/**
		 * The type of the main entity of the page, assisting in
		 * categorizing the page content in JSON-LD.
		 */
		'@type': string;

		/**
		 * A unique identifier for the main entity, often a URL, to
		 * distinctively identify the content in JSON-LD.
		 */
		'@id': string;
	};
}

/**
 * SEO configuration options for a web page.
 * Used to generate the page's metadata, this is the primary
 * configuration object.
 *
 * Configuration covers:
 * - Basic SEO (Required tags)
 * - Open Graph (OG) for social media platforms like Twitter,
 * Facebook, LinkedIn, etc.
 * - Schema.org for Google Rich Results, etc.
 * - JSON-LD for structured data
 */
export interface SeoConfig {
	/**
	 * Required | Page Title
	 * The title of the web page. It is crucial for SEO and should be
	 * concise.
	 * Recommended character count: 50-60 for optimal search engine
	 * display.
	 */
	title: string;

	/**
	 * Required | Page Description
	 * A brief description of the page's content. Key for SEO and user
	 * click-through rates.
	 * Recommended character count: 150-160 for optimal search engine
	 * display.
	 */
	description: string;

	/**
	 * Required | Page URL
	 * The full canonical URL of the current page. Essential for SEO
	 * and to prevent duplicate content issues.
	 */
	url: string;

	/**
	 * Optional | Schema.org Language
	 * The language of the content, used primarily in SchemaOrg and
	 * JSON-LD markup.
	 * Defaults to 'en' if not specified.
	 */
	language?: string | 'en';

	/**
	 * Optional | Open Graph Image URL
	 * URL of an image for Open Graph tags, used when the page is
	 * shared on social media.
	 * Recommended dimensions: at least 1200 x 627 pixels for
	 * high-resolution displays.
	 */
	open_graph_image?: string;

	/**
	 * Optional | Website URL
	 * The base URL of the website. Used in various SEO contexts,
	 * including Schema.org and JSON-LD.
	 */
	website?: string;

	/**
	 * Optional | Author Name
	 * The name of the content's author. Important for authorship
	 * metadata in Schema.org and JSON-LD.
	 */
	author_name?: string;

	/**
	 * Optional | Author Type
	 * Specifies the type of the author - either 'Person' or
	 * 'Organization'.
	 */
	author_type?: AuthorType;

	/**
	 * Optional | Author URL
	 * URL to the author's personal or professional webpage. Enhances
	 * the authorship information in Schema.org and JSON-LD.
	 */
	author_url?: string;

	/**
	 * Optional | Publication Date
	 * The date when the content was first published, in ISO 8601
	 * format. Vital for Schema.org and JSON-LD metadata.
	 */
	date_published?: string;

	/**
	 * Optional | Last Modified Date
	 * The date when the content was last modified, in ISO 8601 format.
	 * Important for keeping Schema.org and JSON-LD metadata current.
	 */
	date_modified?: string;

	/**
	 * Optional | Publisher Name
	 * The name of the publishing entity. Important for Schema.org and
	 * JSON-LD metadata.
	 */
	publisher_name?: string;

	/**
	 * Optional | Publisher URL
	 * The URL of the publishing entity. Contributes to the credibility
	 * and metadata in Schema.org and JSON-LD.
	 */
	publisher_url?: string;

	/**
	 * Optional | Publisher Logo URL
	 * URL of the publisher's logo. Used in Schema.org and JSON-LD for
	 * visual representation of the publisher.
	 */
	publisher_logo?: string;

	/**
	 * Optional | Web Monetisation
	 * A payment pointer for Web Monetisation. Not directly related to
	 * SEO but useful for monetising web content.
	 */
	payment_pointer?: string;

	/**
	 * Optional | Breadcrumbs
	 * Array of breadcrumb items for site navigation and SEO.
	 * Breadcrumbs are structured in Schema.org and JSON-LD format.
	 * Each breadcrumb item's datePublished and dateModified should be
	 * in ISO 8601 format.
	 */
	breadcrumbs?: BreadcrumbItem[];

	/**
	 * Optional | Main Entity
	 * The primary subject of the page, used for structured data and
	 * SEO in Schema.org and JSON-LD.
	 * Should be a specific type extended from MainEntity.
	 * The datePublished and dateModified properties should be in ISO
	 * 8601 format.
	 */
	main_entity?: MainEntity;
}
