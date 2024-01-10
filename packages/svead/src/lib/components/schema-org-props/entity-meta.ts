/**
 * Represents metadata for an entity, typically used for defining
 * structured data about a person or an organization.
 */
export interface EntityMeta {
	/**
	 * URL of the entity's image.
	 * This could be a logo, a personal photo, or any relevant visual
	 * representation of the entity.
	 */
	url: string;

	/**
	 * Width of the favicon or image representing the entity.
	 * This is usually specified in pixels and helps in defining the
	 * dimensions of the image for structured data.
	 */
	faviconWidth: number;

	/**
	 * Height of the favicon or image representing the entity.
	 * Like the width, this is also typically specified in pixels and
	 * is used to define the image's dimensions.
	 */
	faviconHeight: number;
}
