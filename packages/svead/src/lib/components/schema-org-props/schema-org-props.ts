import type { AuthorType, MainEntity } from '$lib/types.js';
import type { BreadcrumbItem } from './breadcrumb-item.js';
import type { EntityMeta } from './entity-meta.js';
import type { FeaturedImage } from './featured-image.js';

/**
 * Defines the properties used for constructing structured data 
 * (JSON-LD) for a web page, following Schema.org standards. These 
 * properties enhance SEO and provide richer context
 * for search engines.
 */
export interface SchemaOrgProps {
	/**
	 * The full URL of the current page.
	 * This URL is used as an identifier for the page in the structured
   * data.
	 */
	url: string;

	/**
	 * The title of the page.
	 * This is typically the main headline or name of the page, used in
   * search results and browser tabs.
	 */
	title: string;

	/**
	 * A brief description of the page's content.
	 * This description can be used in search engine results to provide
   * a preview of the page content.
	 */
	description: string;

	/**
	 * Optional: The base URL of the website.
	 * Can be used to define the domain or main URL of the website or
   * organization.
	 */
	website?: string;

	/**
	 * Optional: The name of the author of the content on the page.
	 * Useful for articles, blog posts, and other authored content.
	 */
	authorName?: string;

	/**
	 * Optional: The type of the author (Person or Organization).
	 * Helps in defining the structured data for the author entity.
	 */
	authorType?: AuthorType;

	/**
	 * Optional: The URL of the author's webpage.
	 * Can be used to link to a bio, profile, or further information
   * about the author.
	 */
	authorUrl?: string;

	/**
	 * Optional: URL of an image representing the entity (page or 
   * author). This image is typically used in the structured data to
   * visually represent the subject of the page.
	 */
	image?: string;

	/**
	 * Optional: Name of the publisher of the content.
	 * Particularly relevant for articles, academic papers, or other
   * published works.
	 */
	publisherName?: string;

	/**
	 * Optional: URL of the publisher.
	 * Links to the publisher's main website or profile page.
	 */
	publisherUrl?: string;

	/**
	 * Optional: Logo of the publisher.
	 * Used in the structured data to represent the publisher visually.
	 */
	publisherLogo?: string;

	/**
	 * Optional: The date when the entity was first published, in ISO 
   * 8601 format. * Important for providing temporal context to the
   * content.
	 */
	datePublished?: string;

	/**
	 * Optional: The date when the entity was last modified, in ISO
   * 8601 format. Helps to indicate the most recent update or 
   * revision of the content.
	 */
	dateModified?: string;

	/**
	 * Optional: The language of the content on the page.
	 * Used to specify the language in which the content is written.
	 */
	language?: string;

	/**
	 * The main entity of the page, including details for structured
   * data and SEO. This can be a person, product, article, etc., and
   * is central to the page's content.
	 */
	mainEntity: MainEntity;

	/**
	 * Optional: An array of breadcrumb items.
	 * Breadcrumbs provide a navigation trail for the user and are 
   * useful for SEO.
	 */
	breadcrumbs?: BreadcrumbItem[];

	/**
	 * Optional: Detailed information about the author.
	 * Can include additional details beyond the basic author name.
	 */
	author?: string;

	/**
	 * Optional: Additional metadata about the entity (author or 
   * organization). Includes details like images, dimensions, and 
   * other visual identifiers.
	 */
	entityMeta?: EntityMeta | null;

	/**
	 * Optional: Featured image of the page.
	 * A primary visual representation, often used for articles, blog
   * posts, or products.
	 */
	featuredImage?: FeaturedImage;

	/**
	 * Optional: A meta description of the page's content.
	 * This brief summary is used for SEO purposes and displayed in 
   * search engine results.
	 */
	metadescription?: string;

	/**
	 * Optional: The primary language of the website or organization.
	 * Helps define the linguistic context of the entity.
	 */
	siteLanguage?: string;

	/**
	 * Optional: The official title of the website.
	 * Used to identify the website in structured data.
	 */
	siteTitle?: string;

	/**
	 * Optional: An alternative title for the website.
	 * Can provide additional context or information about the site.
	 */
	siteTitleAlt?: string;

	/**
	 * Optional: The URL of the website.
	 * Acts as a reference to the main website or organization's 
   * homepage.
	 */
	siteUrl?: string;

	/**
	 * Optional: Social media and other external profiles associated 
   * with the entity. These links provide additional context and 
   * connections to social media or other platforms.
	 */
	facebookPage?: string;
	githubPage?: string;
	linkedinProfile?: string;
	telegramUsername?: string;
	tiktokUsername?: string;
	twitterUsername?: string;
}
