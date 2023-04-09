import type { MainEntityType } from './main-entity-types'

export type AuthorType = 'Person' | 'Organization'

interface CommonEntity {
	name: string
	url: string
	headline: string
	description: string
	image: string
	datePublished: string
	dateModified: string
}

export interface AuthorEntity {
	type: AuthorType
	name: string
	url: string
}

export interface PublisherEntity {
	type: 'Organization'
	name: string
	logo: string
}

export interface MainEntity extends CommonEntity {
	type: MainEntityType
	author: AuthorEntity
	publisher: PublisherEntity
}
