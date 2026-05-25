import type { Graph, Thing, WithContext } from 'schema-dts';

export type SchemaOrgType = Graph | Thing | WithContext<Thing>;

export interface SchemaOrgProps {
	schema: SchemaOrgType | SchemaOrgType[];
}
