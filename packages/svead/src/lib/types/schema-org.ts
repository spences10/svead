import type { Thing, WithContext } from 'schema-dts';

export type SchemaOrgType =
	| Thing
	| WithContext<Thing>
	| Thing[]
	| WithContext<Thing>[];

export interface SchemaOrgProps {
	output?: 'head' | 'body';
	schema: SchemaOrgType;
}
