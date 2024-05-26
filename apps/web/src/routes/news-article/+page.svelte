<script lang="ts">
	import { Head, type SeoConfig } from 'svead';

	const seo_config: SeoConfig = {
		url: 'https://example.com/news/breaking-news',
		website: 'https://example.com',
		title: 'Breaking News: Major Event Unfolds',
		description:
			'A significant event has taken place, impacting the lives of many. Read our latest news article for detailed coverage and analysis.',
		open_graph_image:
			'https://example.com/images/breaking-news-image.jpg',
		date_published: '2023-06-02T09:30:00Z',
		date_modified: '2023-06-02T11:45:00Z',
		author_name: 'Jane Smith',
		author_url: 'https://example.com/author/jane-smith',
		publisher_name: 'Example News',
		publisher_url: 'https://example.com',
		language: 'en',
		same_as: [
			'https://twitter.com/examplenews',
			'https://www.facebook.com/examplenews',
		],
		schema_org_article: {
			'@type': 'NewsArticle',
			'@id': 'https://example.com/news/breaking-news',
			isPartOf: {
				'@id': 'https://example.com',
			},
			author: {
				'@id': 'https://example.com/author/jane-smith',
			},
			headline: 'Breaking News: Major Event Unfolds',
			datePublished: '2023-06-02T09:30:00Z',
			dateModified: '2023-06-02T11:45:00Z',
			mainEntityOfPage: {
				'@id': 'https://example.com/news/breaking-news',
			},
			publisher: {
				'@id': 'https://example.com',
			},
			image: {
				'@id': 'https://example.com/images/breaking-news-image.jpg',
			},
			articleSection: ['News', 'Breaking News'],
			inLanguage: 'en',
		},
		schema_org_webpage: {
			'@type': 'WebPage',
			'@id': 'https://example.com/news/breaking-news',
			url: 'https://example.com/news/breaking-news',
			name: 'Breaking News: Major Event Unfolds',
			description:
				'A significant event has taken place, impacting the lives of many. Read our latest news article for detailed coverage and analysis.',
			inLanguage: 'en',
			isPartOf: {
				'@id': 'https://example.com',
			},
			breadcrumb: {
				'@id': 'https://example.com/news/breaking-news',
			},
			primaryImageOfPage: {
				'@id': 'https://example.com/images/breaking-news-image.jpg',
			},
			datePublished: '2023-06-02T09:30:00Z',
			dateModified: '2023-06-02T11:45:00Z',
			author: {
				'@id': 'https://example.com/author/jane-smith',
			},
			potentialAction: [
				{
					'@type': 'ReadAction',
					target: ['https://example.com/news/breaking-news'],
				},
			],
		},
	};
</script>

<Head {seo_config} />

<article>
	<h1>Breaking News: Major Event Unfolds</h1>
	<p>
		A significant event has taken place, impacting the lives of many.
		Our reporters are on the ground, gathering the latest information
		and providing in-depth analysis.
	</p>
</article>
