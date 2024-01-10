/**
 * Represents a featured image, often used in web content such as
 * articles, blog posts, or product pages.
 * This interface provides key details about the image to be used
 * for web display and SEO purposes.
 */
export interface FeaturedImage {
	/**
	 * The URL of the featured image.
	 * This should point to the location where the image is hosted
	 * and is typically used in an <img> tag or similar.
	 */
	url: string;

	/**
	 * The width of the featured image in pixels.
	 * Specifying the width helps in optimizing the layout and is
	 * important for responsive design considerations.
	 */
	width: number;

	/**
	 * The height of the featured image in pixels.
	 * Along with width, the height helps in defining the aspect ratio
	 * and display size of the image.
	 */
	height: number;

	/**
	 * A brief caption or description for the featured image.
	 * This is often used for accessibility (as alt text) and SEO
	 * purposes to provide context about the image.
	 */
	caption: string;
}
