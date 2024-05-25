import type { MainEntityType } from './main-entity-types.js';

interface Identifiable {
	'@id': string;
	'@type'?: string | string[];
}

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

export interface SchemaOrgEntity {
	'@type': MainEntityType[];
	'@id': string;
	name: string;
	image: SchemaOrgImageObject;
	logo: Identifiable;
	sameAs: string[];
}

interface PropertyValueSpecification {
	'@type': 'PropertyValueSpecification';
	valueRequired: boolean;
	valueName: string;
}

interface SearchAction {
	'@type': 'SearchAction';
	target: string;
	'query-input': PropertyValueSpecification;
}

export interface SchemaOrgWebsite extends Identifiable {
	'@type': 'WebSite';
	url: string;
	name: string;
	description: string;
	publisher: Identifiable;
	potentialAction: SearchAction[];
	inLanguage: string;
}

export interface SchemaOrgBreadcrumbList extends Identifiable {
	'@type': 'BreadcrumbList';
	itemListElement: ListItem[];
}

export interface ListItem {
	'@type': 'ListItem';
	position: number;
	item: Identifiable & {
		name: string;
		url: string;
	};
}

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

interface ReadAction {
	'@type': 'ReadAction';
	target: string[];
}

export interface SchemaOrgArticle extends Identifiable {
	'@type': 'Article';
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

export interface SchemaOrgPublisher extends Identifiable {
	'@type': MainEntityType[];
	name: string;
	image: SchemaOrgImageObject;
	logo: Identifiable;
	sameAs: string[];
}

export interface AuthorType extends Identifiable {
	'@type': 'Person' | 'Organization';
	name: string;
	url?: string;
	image?: SchemaOrgImageObject;
}
