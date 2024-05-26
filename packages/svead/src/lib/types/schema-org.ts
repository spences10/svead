import type { MainEntityType } from './main-entity-types.js';

/**
 * Represents an object that can be identified by an '@id' property.
 * Use this interface when you need to define an object that has a unique identifier.
 *
 * @property {string} @id - The unique identifier of the object.
 * @property {string | string[]} [type] - The type or types of the object.
 */
interface Identifiable {
	'@id': string;
	'@type'?: string | string[];
}

/**
 * Represents a Schema.org ImageObject.
 * Use this interface to define an image object with properties such as URL, dimensions, and caption.
 * This is useful for structured data markup related to images.
 *
 * @property {string} @type - The type of the object (should be 'ImageObject').
 * @property {string} @id - The unique identifier of the image object.
 * @property {string} inLanguage - The language of the image content.
 * @property {string} url - The URL of the image file.
 * @property {string} [contentUrl] - The actual content URL of the image, if different from the 'url' property.
 * @property {number} width - The width of the image in pixels.
 * @property {number} height - The height of the image in pixels.
 * @property {string} caption - A caption or description of the image.
 */
export interface SchemaOrgImageObject {
	'@type': 'ImageObject';
	'@id': string;
	inLanguage: string;
	url: string;
	contentUrl?: string;
	width: number;
	height: number;
	caption: string;
}

/**
 * Represents a Schema.org Entity.
 * Use this interface to define a generic entity with properties like name, image, logo, and sameAs.
 * This is a base interface that can be extended by more specific entity types.
 *
 * @property {MainEntityType[]} @type - An array of entity types.
 * @property {string} @id - The unique identifier of the entity.
 * @property {string} name - The name of the entity.
 * @property {SchemaOrgImageObject} image - An image representing the entity.
 * @property {Identifiable} logo - The logo of the entity.
 * @property {string[]} sameAs - An array of URLs pointing to other web pages or profiles of the same entity.
 */
export interface SchemaOrgEntity {
	'@type': MainEntityType[];
	'@id': string;
	name: string;
	image: SchemaOrgImageObject;
	logo: Identifiable;
	sameAs: string[];
}

/**
 * Represents a PropertyValueSpecification.
 * Use this interface to specify the requirements for a property value in a Schema.org context.
 *
 * @property {string} @type - The type of the specification (should be 'PropertyValueSpecification').
 * @property {boolean} valueRequired - Indicates whether the property value is required.
 * @property {string} valueName - The name of the property value.
 */
interface PropertyValueSpecification {
	'@type': 'PropertyValueSpecification';
	valueRequired: boolean;
	valueName: string;
}

/**
 * Represents a SearchAction.
 * Use this interface to define a search action for a website, including the target URL and query input.
 * This is useful for providing structured data about the search functionality of a website.
 *
 * @property {string} @type - The type of the action (should be 'SearchAction').
 * @property {string} target - The URL template for the search action, including placeholders for the query input.
 * @property {PropertyValueSpecification} query-input - Specifies the requirements for the query input of the search action.
 */
interface SearchAction {
	'@type': 'SearchAction';
	target: string;
	'query-input': PropertyValueSpecification;
}

/**
 * Represents a Schema.org WebSite.
 * Use this interface to define a website with properties like URL, name, description, publisher, and potential actions.
 * This is useful for providing structured data about a website as a whole.
 *
 * @property {string} @type - The type of the object (should be 'WebSite').
 * @property {string} url - The URL of the website.
 * @property {string} name - The name of the website.
 * @property {string} description - A description of the website.
 * @property {Identifiable} publisher - The publisher of the website.
 * @property {SearchAction[]} potentialAction - An array of potential actions associated with the website, such as search actions.
 * @property {string} inLanguage - The primary language of the website.
 */
export interface SchemaOrgWebsite extends Identifiable {
	'@type': 'WebSite';
	url: string;
	name: string;
	description: string;
	publisher: Identifiable;
	potentialAction: SearchAction[];
	inLanguage: string;
}

/**
 * Represents a Schema.org BreadcrumbList.
 * Use this interface to define a breadcrumb list with a list of items.
 * This is useful for providing structured data about the breadcrumb navigation on a webpage.
 *
 * @property {string} @type - The type of the object (should be 'BreadcrumbList').
 * @property {ListItem[]} itemListElement - An array of list items representing the breadcrumb trail.
 */
export interface SchemaOrgBreadcrumbList extends Identifiable {
	'@type': 'BreadcrumbList';
	itemListElement: ListItem[];
}

/**
 * Represents a ListItem in a BreadcrumbList.
 * Use this interface to define a single item in a breadcrumb list, including its position and URL.
 *
 * @property {string} @type - The type of the object (should be 'ListItem').
 * @property {number} position - The position of the list item within the breadcrumb list.
 * @property {Object} item - The actual item in the breadcrumb list.
 * @property {string} item.name - The name of the breadcrumb item.
 * @property {string} item.url - The URL of the breadcrumb item.
 */
export interface ListItem {
	'@type': 'ListItem';
	position: number;
	item: Identifiable & {
		name: string;
		url: string;
	};
}

/**
 * Represents a Schema.org WebPage.
 * Use this interface to define a webpage with properties like URL, name, author, publication dates, and more.
 * This is useful for providing structured data about a specific webpage.
 *
 * @property {string} @type - The type of the object (should be 'WebPage').
 * @property {string} url - The URL of the webpage.
 * @property {string} name - The name or title of the webpage.
 * @property {Identifiable} isPartOf - The website or larger entity that the webpage is part of.
 * @property {Identifiable} primaryImageOfPage - The primary image associated with the webpage.
 * @property {Date | string} datePublished - The publication date of the webpage.
 * @property {Date | string} dateModified - The last modification date of the webpage.
 * @property {Identifiable} author - The author of the webpage.
 * @property {string} description - A description of the webpage.
 * @property {Identifiable} breadcrumb - The breadcrumb trail for the webpage.
 * @property {string} inLanguage - The primary language of the webpage.
 * @property {ReadAction[]} potentialAction - An array of potential actions associated with the webpage, such as reading actions.
 */
export interface SchemaOrgWebPage extends Identifiable {
	'@type': 'WebPage';
	url: string;
	name: string;
	isPartOf: Identifiable;
	primaryImageOfPage: Identifiable;
	datePublished: Date | string;
	dateModified: Date | string;
	author: Identifiable;
	description: string;
	breadcrumb: Identifiable;
	inLanguage: string;
	potentialAction: ReadAction[];
}

/**
 * Represents a ReadAction.
 * Use this interface to define a read action for a webpage, including the target URLs.
 * This is useful for providing structured data about the content of a webpage.
 *
 * @property {string} @type - The type of the action (should be 'ReadAction').
 * @property {string[]} target - An array of target URLs associated with the read action.
 */
interface ReadAction {
	'@type': 'ReadAction';
	target: string[];
}

/**
 * Represents a Schema.org Article.
 * Use this interface to define an article with properties like headline, author, publication dates, and more.
 * This is useful for providing structured data about an article or blog post.
 *
 * @property {MainEntityType} @type - The type of the article (e.g., 'Article', 'BlogPosting', 'NewsArticle', etc.).
 * @property {Identifiable} isPartOf - The larger entity or publication that the article is part of.
 * @property {Identifiable} author - The author of the article.
 * @property {string} headline - The headline or title of the article.
 * @property {Date | string} datePublished - The publication date of the article.
 * @property {Date | string} dateModified - The last modification date of the article.
 * @property {Identifiable} mainEntityOfPage - The main entity or webpage associated with the article.
 * @property {Identifiable} publisher - The publisher of the article.
 * @property {Identifiable} image - The primary image associated with the article.
 * @property {string[]} articleSection - An array of sections or categories the article belongs to.
 * @property {string} inLanguage - The primary language of the article.
 */
export interface SchemaOrgArticle extends Identifiable {
	'@type': Extract<
		MainEntityType,
		| 'Article'
		| 'BlogPosting'
		| 'NewsArticle'
		| 'ScholarlyArticle'
		| 'TechArticle'
	>;
	isPartOf: Identifiable;
	author: Identifiable;
	headline: string;
	datePublished: Date | string;
	dateModified: Date | string;
	mainEntityOfPage: Identifiable;
	publisher: Identifiable;
	image: Identifiable;
	articleSection: string[];
	inLanguage: string;
}

/**
 * Represents a Schema.org Publisher.
 * Use this interface to define a publisher with properties like name, logo, and sameAs.
 * This is useful for providing structured data about the publisher of a website or article.
 *
 * @property {MainEntityType[]} @type - An array of entity types representing the publisher.
 * @property {string} name - The name of the publisher.
 * @property {SchemaOrgImageObject} image - An image representing the publisher.
 * @property {Identifiable} logo - The logo of the publisher.
 * @property {string[]} sameAs - An array of URLs pointing to other web pages or profiles of the same publisher.
 */
export interface SchemaOrgPublisher extends Identifiable {
	'@type': MainEntityType[];
	name: string;
	image: SchemaOrgImageObject;
	logo: Identifiable;
	sameAs: string[];
}

/**
 * Represents an author type, which can be a Person or Organization.
 * Use this interface to define an author with properties like name, URL, and image.
 * This is useful for providing structured data about the author of an article or webpage.
 *
 * @property {string} @type - The type of the author (should be 'Person' or 'Organization').
 * @property {string} name - The name of the author.
 * @property {string} [url] - The URL associated with the author, such as a website or profile page.
 * @property {SchemaOrgImageObject} [image] - An image representing the author.
 */
export interface AuthorType extends Identifiable {
	'@type': 'Person' | 'Organization';
	name: string;
	url?: string;
	image?: SchemaOrgImageObject;
}
