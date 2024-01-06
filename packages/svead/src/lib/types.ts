import type { MainEntityType } from './main-entity-types.js';

export type AuthorType = 'Person' | 'Organization';

interface CommonEntity {
	name: string;
	url: string;
	headline: string;
	description: string;
	image: string;
	datePublished: string;
	dateModified: string;
}

export interface AuthorEntity {
	'@type': AuthorType;
	type?: AuthorType;
	name: string;
	url: string;
}

export interface PublisherEntity {
	'@type': 'Organization';
	name: string;
	logo: string;
	url?: string;
}

export interface BreadcrumbItem {
	name: string;
	url: string;
}

export interface MainEntity extends CommonEntity {
	type: MainEntityType;
	author: AuthorEntity;
	publisher: PublisherEntity;
	breadcrumb?: {
		'@type': 'BreadcrumbList';
		itemListElement: {
			'@type': 'ListItem';
			position: number;
			item: BreadcrumbItem;
		}[];
	};
}

export interface JsonLdMainEntity extends MainEntity {
	'@context': string;
	'@type': MainEntityType;
	inLanguage?: string;
	breadcrumb?: {
		'@type': 'BreadcrumbList';
		itemListElement: {
			'@type': 'ListItem';
			position: number;
			item: BreadcrumbItem;
		}[];
	};
	mainEntityOfPage?: {
		'@type': string;
		'@id': string;
	};
}
