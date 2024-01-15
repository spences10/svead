import type {
	AuthorType,
	MainEntity,
	SchemaOrgArticle,
	SchemaOrgBreadcrumbList,
	SchemaOrgEntity,
	SchemaOrgImageObject,
	SchemaOrgPublisher,
	SchemaOrgWebPage,
	SchemaOrgWebsite,
} from './schema-org.js';

/**
 * SEO configuration options for a web page, covering basic SEO, Open Graph,
 * Schema.org, and JSON-LD requirements.
 */
export interface SeoConfig {
	// Basic SEO properties
	title: string;
	description: string;
	url: string;
	website?: string;
	language?: string | 'en';
	open_graph_image?: string;

	// Web Monetisation
	payment_pointer?: string;

	// Author information for Schema.org
	author_name?: string;
	author_type?: AuthorType;
	author_url?: string;

	// Publication dates for Schema.org
	date_published?: string;
	date_modified?: string;

	// Publisher information for Schema.org
	publisher_name?: string;
	publisher_url?: string;
	publisher_logo?: string;

	// Main Entity for Schema.org
	main_entity?: MainEntity;

	// Array of URLs for Schema.org's sameAs property
	same_as?: string[];

	// Schema.org structured data
	schema_org_article?: SchemaOrgArticle;
	schema_org_website?: SchemaOrgWebsite;
	schema_org_webpage?: SchemaOrgWebPage;
	schema_org_entity?: SchemaOrgEntity;
	schema_org_publisher?: SchemaOrgPublisher;
	schema_org_image_object?: SchemaOrgImageObject;
	schema_org_breadcrumb_list?: SchemaOrgBreadcrumbList;
}
