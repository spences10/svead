import type { Thing, WithContext } from 'schema-dts';

export type SchemaOrgType = Thing | WithContext<Thing>;

export interface SchemaOrgProps {
	schema: SchemaOrgType | SchemaOrgType[];
}
