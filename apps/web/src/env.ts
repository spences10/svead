import { defineEnvVars } from '@sveltejs/kit/env';

// Both are read when the app starts and may be unset, in which case
// analytics stays off
const optional = (value: string | undefined) => value;

export const variables = defineEnvVars({
	PUBLIC_FATHOM_ID: { public: true, schema: optional },
	PUBLIC_FATHOM_URL: { public: true, schema: optional },
});
