interface MainEntityBase {
	WebPage: string
	Article: string
	Blog: string
	NewsArticle: string
	ScholarlyArticle: string
	TechArticle: string
	QAPage: string
	ItemPage: string
	CollectionPage: string
	AboutPage: string
	ContactPage: string
	ProfilePage: string
	SearchResultsPage: string
	Event: string
	Recipe: string
	Review: string
	JobPosting: string
	Product: string
	LocalBusiness: string
	Organization: string
	Person: string
	CreativeWork: string
}

interface MainEntityAdditional {
	VideoObject: string
	Movie: string
	MusicRecording: string
	AudioObject: string
	SoftwareApplication: string
	MobileApplication: string
	WebApplication: string
	Book: string
	Course: string
	HowTo: string
	FAQPage: string
	Service: string
	Dataset: string
}

/**
 * The type for specifying the main entity type of the content.
 * Possible values include 'Article', 'Blog', 'NewsArticle', 'Recipe', etc.
 */
export type MainEntityType = keyof (MainEntityBase &
	MainEntityAdditional)

/**
 * The type for specifying the content type for JSON-LD.
 * Possible values include 'WebPage', 'Article', 'Blog', 'NewsArticle', etc.
 */
export type ContentType = keyof (MainEntityBase &
	MainEntityAdditional)

interface OrganizationBase {
	Organization: string
	Corporation: string
	EducationalOrganization: string
	GovernmentOrganization: string
	LocalBusiness: string
	NonprofitOrganization: string
	SportsOrganization: string
}

interface OrganizationAdditional {
	NGO: string
	PerformingGroup: string
	SportsTeam: string
	MusicalGroup: string
	BroadcastService: string
	RadioStation: string
	TelevisionStation: string
}

interface PersonType {
	Person: string
}

/**
 * The type for specifying the author of the content.
 * Possible values include 'Person', 'Organization', 'Corporation', etc.
 */
export type AuthorType = keyof (PersonType &
	OrganizationBase &
	OrganizationAdditional)

/**
 * The type for specifying the publisher of the content.
 * Possible values include 'Organization', 'Corporation', 'EducationalOrganization', etc.
 */
export type PublisherType = keyof (OrganizationBase &
	OrganizationAdditional)
