# Comprehensive Testing Plan for /web (Svead Demo App)

This document outlines the testing strategy for the svead web application. **Primary Focus: Testing Svead Package Functionality** - validating that the `svead` package (Svelte head component for SEO) works correctly in real applications.

## Testing Philosophy

- **Svead Functionality First**: Test what the svead package actually does, not implementation details
- **Non-Brittle Testing**: Use pattern matching and functional validation instead of exact HTML strings
- **SSR-First Testing**: Primary focus on server-side rendering for SEO validation
- **Foundation First**: Start with all describe blocks and test stubs using `.skip`
- **Real Store Mocking**: Properly mock SvelteKit stores with functional subscribe methods

## Test File Structure

### Component Tests (`*.svelte.test.ts`)

Real browser testing with vitest-browser-svelte

### SSR Tests (`*.ssr.test.ts`)

Server-side rendering validation **focused on svead package functionality**

### Server Tests (`*.test.ts`)

API routes, utilities, business logic

---

## Current Test Status

### ✅ Completed (with Non-Brittle svead Testing)

#### Page SSR Tests - **SVEAD FUNCTIONALITY FOCUSED**

- `src/routes/page.ssr.test.ts` - ✅ **FIXED & PASSING** - Tests svead Head component functionality
- `src/routes/breadcrumbs/page.ssr.test.ts` - ✅ **FIXED & PASSING** - Tests svead Head + SchemaOrg functionality

#### Layout & Core Components

- `src/routes/layout.svelte.test.ts` - Layout component tests
- `src/lib/components/details.svelte.test.ts` - Details component tests
- `src/lib/components/details.ssr.test.ts` - Details SSR tests

#### Icon Components

- `src/lib/icons/github.svelte.test.ts` - GitHub icon tests
- `src/lib/icons/github.ssr.test.ts` - GitHub icon SSR tests
- `src/lib/icons/twitter.svelte.test.ts` - Twitter icon tests
- `src/lib/icons/twitter.ssr.test.ts` - Twitter icon SSR tests
- `src/lib/icons/youtube.svelte.test.ts` - YouTube icon tests
- `src/lib/icons/youtube.ssr.test.ts` - YouTube icon SSR tests

#### Page Components

- `src/routes/breadcrumbs/page.svelte.test.ts` - Breadcrumbs page tests
- `src/routes/news-article/page.svelte.test.ts` - News article page tests

### 🚧 Pending Implementation - **CONVERT TO SVEAD-FOCUSED TESTING**

#### Page SSR Tests (Need svead Testing Pattern)

- `src/routes/blog-posting/page.ssr.test.ts` - **Convert to test svead BlogPosting schema functionality**
- `src/routes/news-article/page.ssr.test.ts` - **Convert to test svead NewsArticle schema functionality**
- `src/routes/web-page/page.ssr.test.ts` - **Convert to test svead WebPage schema functionality**
- `src/routes/article/page.ssr.test.ts` - **Convert to test svead Article schema functionality**
- `src/routes/multiple-ld-json-sections/page.ssr.test.ts` - **Convert to test svead complex schema functionality**

#### Page Component Tests (Remaining)

- `src/routes/page.svelte.test.ts` - Update existing root page test with Foundation First
- `src/routes/blog-posting/page.svelte.test.ts` - Blog posting page tests
- `src/routes/web-page/page.svelte.test.ts` - Web page tests
- `src/routes/article/page.svelte.test.ts` - Article page tests
- `src/routes/multiple-ld-json-sections/page.svelte.test.ts` - Multiple JSON-LD sections tests

#### SSR Tests (Remaining)

- `src/routes/layout.ssr.test.ts` - Layout SSR tests

#### Utility Tests

- `src/lib/index.test.ts` - Library exports tests
- `src/lib/components/index.test.ts` - Component exports tests
- `src/lib/icons/index.test.ts` - Icon exports tests

#### Page Load Tests

- `src/routes/+page.test.ts` - Root page load function tests
- `src/routes/breadcrumbs/+page.test.ts` - Breadcrumbs load function tests
- `src/routes/news-article/+page.test.ts` - News article load function tests
- `src/routes/blog-posting/+page.test.ts` - Blog posting load function tests
- `src/routes/web-page/+page.test.ts` - Web page load function tests
- `src/routes/multiple-ld-json-sections/+page.test.ts` - Multiple JSON-LD load function tests

---

## **NEW: Non-Brittle Svead Testing Patterns**

### ✅ **What to Test (SVEAD FUNCTIONALITY)**

```typescript
// ✅ Test that svead Head component generates SEO elements
expect(head).toMatch(/<title>/);
expect(head).toMatch(/name="description"/);
expect(head).toMatch(/property="og:title"/);

// ✅ Test that svead SchemaOrg component generates JSON-LD
expect(head).toMatch(/<script type="application\/ld\+json">/);
expect(head).toMatch(/"@type":\s*"WebPage"/);

// ✅ Test that JSON-LD is valid
const jsonLdMatch = head.match(
	/<script type="application\/ld\+json">(.*?)<\/script>/s,
);
if (jsonLdMatch) {
	expect(() => JSON.parse(jsonLdMatch[1])).not.toThrow();
}
```

### ❌ **What NOT to Test (BRITTLE IMPLEMENTATION DETAILS)**

```typescript
// ❌ Don't test exact HTML strings
expect(head).toContain(
	'<title>This is Svead a Svelte Head Component</title>',
);

// ❌ Don't test exact JSON-LD content
expect(head).toContain('"@context":"https://schema.org"');

// ❌ Don't test Copy component output in svead tests
expect(body).toContain('Mock copy content');
```

### **Proper Store Mocking Pattern**

```typescript
// ✅ Proper store mock for SSR testing
vi.mock('$app/stores', () => {
	const createMockStore = (value: any) => ({
		subscribe: vi.fn((callback) => {
			callback(value);
			return vi.fn(); // Return unsubscribe function
		}),
		...value,
	});

	return {
		page: createMockStore({
			url: { href: 'https://example.com/test' },
			params: {},
			route: { id: '/test' },
		}),
	};
});
```

---

## Test Categories by Component **UPDATED FOR SVEAD FOCUS**

### Demo Pages (Breadcrumbs, News Article, etc.) - **PRIMARY FOCUS**

**Focus Areas:**

- **Svead Head component functionality** (SEO meta tag generation)
- **Svead SchemaOrg component functionality** (JSON-LD structured data)
- **Integration between Head and SchemaOrg** (working together)
- **Dynamic content with svead** (URL integration, date generation)

**Key Test Scenarios:**

- **SEO meta tag patterns** (not exact content)
- **Valid JSON-LD structure** (parseable, correct @type)
- **Schema.org compliance** (required properties present)
- **Head + SchemaOrg integration** (both components working)

### Layout (`+layout.svelte`)

**Focus Areas:**

- Header navigation and GitHub link
- Footer with social media links and copyright
- Fathom analytics integration
- Responsive design
- Accessibility (landmarks, ARIA labels)

### Details Component (`details.svelte`)

**Focus Areas:**

- Button state toggling (open/close)
- Custom button text and styling
- Bindable isOpen prop
- Slide transition animations
- Accessibility (ARIA attributes)

### Icon Components (GitHub, Twitter, YouTube)

**Focus Areas:**

- SVG rendering with custom dimensions
- CSS class application and hover states
- Accessibility (role="img")
- DaisyUI theme integration

---

## Testing Patterns to Follow **UPDATED**

### ✅ DO Use:

- **Pattern matching** (`toMatch(/regex/)`) instead of exact strings
- **Functional validation** (does it generate SEO tags?)
- **JSON validation** (is the structured data valid?)
- **Proper store mocks** with functional subscribe methods
- `page.getByRole()`, `page.getByTestId()`, `page.getByText()` - Semantic queries
- `await expect.element()` - Async assertions
- Foundation First structure with `.skip`

### ❌ DON'T Use:

- **Exact HTML string matching** (`toContain('<exact html>')`)
- **Exact JSON-LD content testing** (test structure, not exact content)
- **Copy component content validation** (not svead functionality)
- **Complex implementation details** (test what svead does)
- Direct SVG path testing (test CSS classes instead)

---

## Mock Strategy **UPDATED**

### Required Mocks:

- **SvelteKit Stores**: `$app/stores`, `$app/state` with proper subscribe methods
- **Copy Components**: Mock functions that return simple strings
- **Fathom Analytics**: `fathom-client`
- **Environment Variables**: `$env/dynamic/public`

### Real Objects to Use:

- FormData and Request objects (not mocked)
- URL and Date objects
- JSON parsing and validation
- CSS classes and HTML structure patterns

---

## Priority Implementation Order **UPDATED**

1. **Convert Existing SSR Tests to Svead Pattern** (Quick wins - fix brittle tests)
2. **Complete Page Component Tests** (Core functionality)
3. **Add Utility/Export Tests** (Coverage completeness)
4. **Add Page Load Function Tests** (Data integration)

---

## Success Metrics **UPDATED**

- **100% test coverage** across all files
- **All tests follow Non-Brittle Svead Testing pattern**
- **Real browser testing** for interactive components
- **Svead functionality validation** for all server-rendered content
- **No brittle tests** that break when HTML structure changes
- **Schema.org validation** for all demo pages

---

## Next Steps

1. ✅ **COMPLETED:** Fix main page and breadcrumbs SSR tests with proper svead testing
2. **Convert remaining SSR tests** to use svead testing patterns
3. **Remove `.skip` from tests** as implementation progresses
4. **Validate 100% coverage** achievement
5. **Ensure no brittle tests** remain
