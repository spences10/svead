import type { AuthorType, MainEntity } from '$lib/types';

export interface BreadcrumbItem {
	name: string;
	url: string;
}

export interface SchemaOrgProps {
	url: string;
	title: string;
	description: string;
	website?: string;
	authorName?: string;
	authorType?: AuthorType;
	authorUrl?: string;
	image?: string;
	datePublished?: string;
	dateModified?: string;
	language?: string;
	mainEntity: MainEntity;
	breadcrumbs?: BreadcrumbItem[];
}
