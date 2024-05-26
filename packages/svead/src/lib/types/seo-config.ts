import type {
	AuthorType,
	SchemaOrgArticle,
	SchemaOrgBreadcrumbList,
	SchemaOrgEntity,
	SchemaOrgImageObject,
	SchemaOrgPublisher,
	SchemaOrgWebPage,
	SchemaOrgWebsite,
} from './schema-org.js';

/**
 * SEO configuration options for a web page.
 * Covers basic SEO, Open Graph, Schema.org, and JSON-LD requirements.
 * Use this interface to define the SEO configuration for a webpage, including meta tags, structured data, and more.
 * The properties in this interface can be used to generate the necessary HTML meta tags and JSON-LD script tags.
 */
export interface SeoConfig {
	/**
	 * The title of the web page.
	 * Used in the <title> tag and as the og:title property.
	 *
	 * @type {string}
	 */
	title: string;

	/**
	 * The description of the web page.
	 * Used in the description meta tag and as the og:description property.
	 *
	 * @type {string}
	 */
	description: string;

	/**
	 * The URL of the web page.
	 * Used as the og:url property and in Schema.org structured data.
	 *
	 * @type {string}
	 */
	url: string;

	/**
	 * The website to which the web page belongs.
	 * Used in Schema.org structured data.
	 *
	 * @type {string}
	 */
	website?: string;

	/**
	 * The language of the web page.
	 * Used in the lang attribute of the <html> tag and as the og:locale property.
	 * Defaults to 'en'.
	 *
	 * @type {string}
	 * @default 'en'
	 */
	language?: string | 'en';

	/**
	 * The URL of the Open Graph image for the web page.
	 * Used as the og:image property.
	 *
	 * @type {string}
	 */
	open_graph_image?: string;

	/**
	 * The payment pointer for Web Monetization.
	 * Used in the monetization meta tag.
	 *
	 * @type {string}
	 */
	payment_pointer?: string;

	/**
	 * The name of the author of the web page.
	 * Used in Schema.org structured data.
	 *
	 * @type {string}
	 */
	author_name?: string;

	/**
	 * The type of the author of the web page (Person or Organization).
	 * Used in Schema.org structured data.
	 *
	 * @type {AuthorType}
	 */
	author_type?: AuthorType;

	/**
	 * The URL of the author of the web page.
	 * Used in Schema.org structured data.
	 *
	 * @type {string}
	 */
	author_url?: string;

	/**
	 * The publication date of the web page.
	 * Used in Schema.org structured data.
	 *
	 * @type {string}
	 */
	date_published?: string;

	/**
	 * The last modification date of the web page.
	 * Used in Schema.org structured data.
	 *
	 * @type {string}
	 */
	date_modified?: string;

	/**
	 * The name of the publisher of the web page.
	 * Used in Schema.org structured data.
	 *
	 * @type {string}
	 */
	publisher_name?: string;

	/**
	 * The URL of the publisher of the web page.
	 * Used in Schema.org structured data.
	 *
	 * @type {string}
	 */
	publisher_url?: string;

	/**
	 * The URL of the publisher's logo.
	 * Used in Schema.org structured data.
	 *
	 * @type {string}
	 */
	publisher_logo?: string;

	/**
	 * An array of URLs related to the web page or the website.
	 * Used as the sameAs property in Schema.org structured data.
	 *
	 * @type {string[]}
	 */
	same_as?: string[];

	/**
	 * The URL template for the website's search functionality.
	 * Used in Schema.org structured data to specify the search action for the website.
	 * The URL template should include a placeholder for the search query, e.g., "https://example.com/search?q={search_term_string}".
	 *
	 * @type {string}
	 *
	 * @example
	 * schema_org_search_url_template: "https://example.com/search?q={search_term_string}"
	 */
	schema_org_search_url_template?: string;

	/**
	 * Schema.org Article structured data for the web page.
	 * Provides detailed information about an article or blog post.
	 * Use this property to specify the attributes of an article, such as the headline, author, publication date, and content.
	 *
	 * @type {SchemaOrgArticle}
	 *
	 * @example
	 * schema_org_article: {
	 *   "@type": "Article",
	 *   "headline": "Article Title",
	 *   "description": "Article description",
	 *   "author": {
	 *     "@type": "Person",
	 *     "name": "John Doe"
	 *   },
	 *   "datePublished": "2023-06-04",
	 *   "dateModified": "2023-06-05",
	 *   "image": {
	 *     "@type": "ImageObject",
	 *     "url": "https://example.com/article-image.jpg",
	 *     "width": 800,
	 *     "height": 600
	 *   },
	 *   "publisher": {
	 *     "@type": "Organization",
	 *     "name": "Example Publisher",
	 *     "logo": {
	 *       "@type": "ImageObject",
	 *       "url": "https://example.com/publisher-logo.jpg",
	 *       "width": 200,
	 *       "height": 100
	 *     }
	 *   },
	 *   "mainEntityOfPage": {
	 *     "@type": "WebPage",
	 *     "@id": "https://example.com/article"
	 *   }
	 * }
	 */
	schema_org_article?: SchemaOrgArticle;

	/**
	 * Schema.org WebSite structured data for the website.
	 * Provides information about the website as a whole.
	 * Use this property to specify the attributes of the website, such as the name, URL, and description.
	 *
	 * @type {SchemaOrgWebsite}
	 *
	 * @example
	 * schema_org_website: {
	 *   "@type": "WebSite",
	 *   "@id": "https://example.com/#website",
	 *   "url": "https://example.com/",
	 *   "name": "Example Website",
	 *   "description": "A website about examples",
	 *   "publisher": {
	 *     "@type": "Organization",
	 *     "name": "Example Company",
	 *     "logo": {
	 *       "@type": "ImageObject",
	 *       "url": "https://example.com/logo.jpg",
	 *       "width": 200,
	 *       "height": 100
	 *     }
	 *   }
	 * }
	 */
	schema_org_website?: SchemaOrgWebsite;

	/**
	 * Schema.org WebPage structured data for the web page.
	 * Provides detailed information about the web page.
	 *
	 * @type {SchemaOrgWebPage}
	 *
	 * @property {string} '@type' - The type of the web page (e.g., 'WebPage').
	 * @property {string} '@id' - The unique identifier of the web page.
	 * @property {string} url - The URL of the web page.
	 * @property {string} name - The name or title of the web page.
	 * @property {Identifiable} isPartOf - The parent or containing entity of the web page.
	 * @property {Identifiable} primaryImageOfPage - The primary image associated with the web page.
	 * @property {Date | string} datePublished - The publication date of the web page.
	 * @property {Date | string} dateModified - The last modification date of the web page.
	 * @property {Identifiable} author - The author of the web page.
	 * @property {string} description - A description of the web page.
	 * @property {Identifiable} breadcrumb - The breadcrumb navigation for the web page.
	 * @property {string} inLanguage - The language of the web page.
	 * @property {ReadAction[]} potentialAction - Potential actions related to the web page.
	 *
	 * @example
	 * schema_org_webpage: {
	 *   '@type': 'WebPage',
	 *   '@id': 'https://example.com/web-page',
	 *   url: 'https://example.com/web-page',
	 *   name: 'Example Web Page',
	 *   isPartOf: {
	 *     '@id': 'https://example.com/#website'
	 *   },
	 *   primaryImageOfPage: {
	 *     '@id': 'https://example.com/image.jpg'
	 *   },
	 *   datePublished: '2023-06-04',
	 *   dateModified: '2023-06-05',
	 *   author: {
	 *     '@id': 'https://example.com/author'
	 *   },
	 *   description: 'An example web page demonstrating Schema.org structured data.',
	 *   breadcrumb: {
	 *     '@id': 'https://example.com/web-page#breadcrumb'
	 *   },
	 *   inLanguage: 'en',
	 *   potentialAction: [
	 *     {
	 *       '@type': 'ReadAction',
	 *       target: ['https://example.com/web-page']
	 *     }
	 *   ]
	 * }
	 */
	schema_org_webpage?: SchemaOrgWebPage;

	/**
	 * Schema.org Entity structured data for the main entity of the web page.
	 * Represents the main entity or topic of the web page.
	 * Use this property to specify the attributes of the main entity, such as the name, description, and image.
	 *
	 * @type {SchemaOrgEntity}
	 *
	 * @example
	 * schema_org_entity: {
	 *   "@type": "Corporation",
	 *   "@id": "https://example.com/#organization",
	 *   "name": "Example Company",
	 *   "url": "https://example.com",
	 *   "logo": {
	 *     "@type": "ImageObject",
	 *     "url": "https://example.com/logo.jpg",
	 *     "width": 200,
	 *     "height": 100
	 *   },
	 *   "description": "A company that provides examples",
	 *   "address": {
	 *     "@type": "PostalAddress",
	 *     "streetAddress": "123 Example Street",
	 *     "addressLocality": "Example City",
	 *     "postalCode": "12345",
	 *     "addressCountry": "US"
	 *   },
	 *   "contactPoint": {
	 *     "@type": "ContactPoint",
	 *     "telephone": "+1-123-456-7890",
	 *     "contactType": "Customer Service"
	 *   }
	 * }
	 */
	schema_org_entity?: SchemaOrgEntity;

	/**
	 * Schema.org Publisher structured data for the publisher of the web page.
	 * Provides information about the publisher.
	 * Use this property to specify the attributes of the publisher, such as the name, logo, and contact information.
	 *
	 * @type {SchemaOrgPublisher}
	 *
	 * @example
	 * schema_org_publisher: {
	 *   "@type": "Organization",
	 *   "@id": "https://example.com/#publisher",
	 *   "name": "Example Publisher",
	 *   "url": "https://example.com",
	 *   "logo": {
	 *     "@type": "ImageObject",
	 *     "url": "https://example.com/publisher-logo.jpg",
	 *     "width": 200,
	 *     "height": 100
	 *   },
	 *   "sameAs": [
	 *     "https://www.facebook.com/examplepublisher",
	 *     "https://www.twitter.com/examplepublisher",
	 *     "https://www.linkedin.com/company/examplepublisher"
	 *   ]
	 * }
	 */
	schema_org_publisher?: SchemaOrgPublisher;

	/**
	 * Schema.org ImageObject structured data for the main image of the web page.
	 * Represents the primary image associated with the web page.
	 * Use this property to specify the attributes of the main image, such as the URL, dimensions, and caption.
	 *
	 * @type {SchemaOrgImageObject}
	 *
	 * @example
	 * schema_org_image_object: {
	 *   "@type": "ImageObject",
	 *   "@id": "https://example.com/main-image.jpg",
	 *   "url": "https://example.com/main-image.jpg",
	 *   "width": 800,
	 *   "height": 600,
	 *   "caption": "A description of the main image"
	 * }
	 */
	schema_org_image_object?: SchemaOrgImageObject;

	/**
	 * Schema.org BreadcrumbList structured data for the web page.
	 * Represents the breadcrumb navigation for the web page.
	 * Use this property to specify the list of breadcrumb items, including their names and URLs.
	 *
	 * @type {SchemaOrgBreadcrumbList}
	 *
	 * @example
	 * schema_org_breadcrumb_list: {
	 *   "@type": "BreadcrumbList",
	 *   "@id": "https://example.com/some-page#breadcrumb",
	 *   "itemListElement": [
	 *     {
	 *       "@type": "ListItem",
	 *       "position": 1,
	 *       "item": {
	 *         "@type": "WebPage",
	 *         "@id": "https://example.com/",
	 *         "name": "Home",
	 *         "url": "https://example.com/"
	 *       }
	 *     },
	 *     {
	 *       "@type": "ListItem",
	 *       "position": 2,
	 *       "item": {
	 *         "@type": "WebPage",
	 *         "@id": "https://example.com/category",
	 *         "name": "Category",
	 *         "url": "https://example.com/category"
	 *       }
	 *     },
	 *     {
	 *       "@type": "ListItem",
	 *       "position": 3,
	 *       "item": {
	 *         "@type": "WebPage",
	 *         "@id": "https://example.com/some-page",
	 *         "name": "Some Page",
	 *         "url": "https://example.com/some-page"
	 *       }
	 *     }
	 *   ]
	 * }
	 */
	schema_org_breadcrumb_list?: SchemaOrgBreadcrumbList;
}
