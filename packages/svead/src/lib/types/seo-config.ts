/**
 * SEO configuration options for a web page.
 * Covers basic SEO, Open Graph, and Twitter Cards requirements.
 * Use this interface to define the SEO configuration for a webpage, 
 * including meta tags and social media properties. 
 * The properties in this interface can be used to generate the 
 * necessary HTML meta tags.
 */
export interface SeoConfig {
	/**
	 * The title of the web page.
	 * Used in the <title> tag, og:title, and twitter:title properties.
	 *
	 * @type {string}
	 */
	title: string;

	/**
	 * The description of the web page.
	 * Used in the description meta tag, og:description, and 
	 * twitter:description properties.
	 *
	 * @type {string}
	 */
	description: string;

	/**
	 * The URL of the web page.
	 * Used as the og:url property and twitter:url.
	 *
	 * @type {string}
	 */
	url: string;

	/**
	 * The website to which the web page belongs.
	 * Used as twitter:domain.
	 *
	 * @type {string}
	 */
	website?: string;

	/**
	 * The language of the web page.
	 * Used as the og:locale property.
	 * Defaults to 'en'.
	 *
	 * @type {string}
	 * @default 'en'
	 */
	language?: string;

	/**
	 * The URL of the Open Graph image for the web page.
	 * Used as the og:image and twitter:image properties.
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
	 * Used in the author meta tag.
	 *
	 * @type {string}
	 */
	author_name?: string;

	/**
	 * The name of the site.
	 * Used as the og:site_name property.
	 *
	 * @type {string}
	 */
	site_name?: string;

	/**
	 * The Twitter handle of the content creator or site.
	 * Used as the twitter:creator property.
	 * Should include the @ symbol.
	 *
	 * @type {string}
	 */
	twitter_handle?: string;

	/**
	 * The type of Twitter card to use.
	 * Used as the twitter:card property.
	 * Defaults to 'summary_large_image'.
	 *
	 * @type {'summary' | 'summary_large_image' | 'app' | 'player'}
	 * @default 'summary_large_image'
	 */
	twitter_card_type?:
		| 'summary'
		| 'summary_large_image'
		| 'app'
		| 'player';

	/**
	 * Alternative text for the Open Graph image.
	 * Used as the og:image:alt property.
	 *
	 * @type {string}
	 */
	open_graph_image_alt?: string;
}
