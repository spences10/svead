import type { Thing, WithContext } from 'schema-dts';

export interface SchemaOrgProps {
  output?: 'head' | 'body';
  schema?: Thing | WithContext<Thing> | Thing[] | WithContext<Thing>[];
}